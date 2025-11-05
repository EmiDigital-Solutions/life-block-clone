import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Save } from "lucide-react";
import { z } from "zod";

const contentSchema = z.object({
  type: z.enum(['hero_section', 'feature_card', 'testimonial', 'page_section', 'project']),
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  body: z.string().min(1, "Content is required"),
  status: z.enum(['draft', 'published', 'archived']).optional(),
});

interface ContentEditorProps {
  isAdmin: boolean;
}

const ContentEditor = ({ isAdmin }: ContentEditorProps) => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: "page_section" as const,
    title: "",
    slug: "",
    body: "",
    status: "draft" as const,
    imageId: "",
  });

  const { data: mediaList = [] } = useQuery({
    queryKey: ["media-select"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .order("uploaded_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: content = [], isLoading } = useQuery({
    queryKey: ["content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      try {
        contentSchema.parse(data);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error(error.errors[0].message);
        }
        throw error;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      if (editingId) {
        const { error } = await supabase
          .from("content")
          .update({
            type: data.type,
            title: data.title,
            slug: data.slug,
            body: { content: data.body, imageId: data.imageId },
            status: data.status,
          })
          .eq("id", editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("content")
          .insert([{
            type: data.type,
            title: data.title,
            slug: data.slug,
            body: { content: data.body, imageId: data.imageId },
            status: data.status,
            created_by: user.id,
          }]);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      toast.success(editingId ? "Content updated" : "Content created");
      resetForm();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Save failed");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("content")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      toast.success("Content deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Delete failed");
    },
  });

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      type: "page_section",
      title: "",
      slug: "",
      body: "",
      status: "draft",
      imageId: "",
    });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      type: item.type,
      title: item.title,
      slug: item.slug,
      body: item.body?.content || "",
      status: item.status,
      imageId: item.body?.imageId || "",
    });
  };

  const getPublicUrl = (storagePath: string) => {
    const { data } = supabase.storage
      .from("content-images")
      .getPublicUrl(storagePath);
    return data.publicUrl;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Content" : "Create New Content"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Content Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: any) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero_section">Hero Section</SelectItem>
                  <SelectItem value="feature_card">Feature Card</SelectItem>
                  <SelectItem value="testimonial">Testimonial</SelectItem>
                  <SelectItem value="page_section">Page Section</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="my-content-slug"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Content</Label>
              <Textarea
                id="body"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Featured Image</Label>
              <Select
                value={formData.imageId}
                onValueChange={(value) => setFormData({ ...formData, imageId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an image (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No image</SelectItem>
                  {mediaList.map((media) => (
                    <SelectItem key={media.id} value={media.id}>
                      {media.original_filename}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.imageId && (
                <div className="mt-2">
                  {(() => {
                    const selectedMedia = mediaList.find(m => m.id === formData.imageId);
                    return selectedMedia ? (
                      <img 
                        src={getPublicUrl(selectedMedia.storage_path)} 
                        alt="Preview" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ) : null;
                  })()}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={saveMutation.isPending}>
                <Save className="mr-2 h-4 w-4" />
                {saveMutation.isPending ? "Saving..." : editingId ? "Update" : "Create"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Existing Content</h3>
        {isLoading ? (
          <div className="text-center py-12">Loading content...</div>
        ) : content.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No content created yet
          </div>
        ) : (
          <div className="space-y-3">
            {content.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.type} • {item.status}</p>
                      <p className="text-xs text-muted-foreground mt-1">/{item.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {isAdmin && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteMutation.mutate(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentEditor;