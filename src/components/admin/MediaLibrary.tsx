import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, Trash2, Search } from "lucide-react";
import { z } from "zod";

const mediaUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, "File must be less than 10MB")
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'].includes(file.type),
      "Only JPEG, PNG, WebP, GIF, and SVG images are allowed"
    ),
});

interface MediaLibraryProps {
  isAdmin: boolean;
}

const MediaLibrary = ({ isAdmin }: MediaLibraryProps) => {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: media = [], isLoading } = useQuery({
    queryKey: ["media"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .order("uploaded_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      try {
        mediaUploadSchema.parse({ file });
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error(error.errors[0].message);
        }
        throw error;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const filename = `${Date.now()}-${file.name}`;
      const storagePath = `uploads/${filename}`;

      const { error: uploadError } = await supabase.storage
        .from("content-images")
        .upload(storagePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("content-images")
        .getPublicUrl(storagePath);

      const { data, error: dbError } = await supabase
        .from("media")
        .insert([{
          filename: filename,
          original_filename: file.name,
          storage_path: storagePath,
          mime_type: file.type,
          size_bytes: file.size,
          uploaded_by: user.id,
        }])
        .select()
        .single();

      if (dbError) throw dbError;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      toast.success("Image uploaded successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Upload failed");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (mediaId: string) => {
      const mediaItem = media.find(m => m.id === mediaId);
      if (!mediaItem) throw new Error("Media not found");

      const { error: storageError } = await supabase.storage
        .from("content-images")
        .remove([mediaItem.storage_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("media")
        .delete()
        .eq("id", mediaId);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      toast.success("Image deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Delete failed");
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadMutation.mutateAsync(file);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const filteredMedia = media.filter(item =>
    item.original_filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.alt_text?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPublicUrl = (storagePath: string) => {
    const { data } = supabase.storage
      .from("content-images")
      .getPublicUrl(storagePath);
    return data.publicUrl;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id="file-upload"
          />
          <Button asChild disabled={uploading}>
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? "Uploading..." : "Upload Image"}
            </label>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading media...</div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {searchQuery ? "No images found" : "No images uploaded yet"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="aspect-square relative bg-muted">
                  <img
                    src={getPublicUrl(item.storage_path)}
                    alt={item.alt_text || item.original_filename}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {isAdmin && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteMutation.mutate(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-sm font-medium truncate">{item.original_filename}</p>
                  <p className="text-xs text-muted-foreground">
                    {(item.size_bytes / 1024).toFixed(1)} KB
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;