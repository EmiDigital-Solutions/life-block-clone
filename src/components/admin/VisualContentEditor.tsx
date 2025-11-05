import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Save, Eye, GripVertical, Trash2, Upload, X } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDropzone } from "react-dropzone";
import { z } from "zod";

interface VisualContentEditorProps {
  isAdmin: boolean;
}

interface ContentItem {
  id: string;
  type: string;
  title: string;
  slug: string;
  body: any;
  status: string;
  order_index: number;
  imageUrl?: string;
}

const contentTypes = [
  { value: "hero_content", label: "Hero Content" },
  { value: "auditor_card", label: "Auditor Card" },
  { value: "feature_card", label: "Feature Card" },
  { value: "full_screen_section", label: "Full Screen Section" },
  { value: "feature_photo", label: "Feature Photo" },
  { value: "page_section", label: "Page Section" },
  { value: "project", label: "Project" },
  { value: "testimonial", label: "Testimonial" },
];

function SortableContentItem({ item, onEdit, onDelete, onImageUpload }: {
  item: ContentItem;
  onEdit: (item: ContentItem) => void;
  onDelete: (id: string) => void;
  onImageUpload: (id: string, file: File) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(item.id, acceptedFiles[0]);
    }
  }, [item.id, onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'] },
    maxFiles: 1,
    noClick: true,
  });

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card className="mb-3 hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {/* Drag Handle */}
            <button
              {...listeners}
              className="cursor-grab active:cursor-grabbing mt-2 hover:text-primary transition-colors"
            >
              <GripVertical className="h-5 w-5" />
            </button>

            {/* Image Upload Area */}
            <div
              {...getRootProps()}
              className={`relative w-24 h-24 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden transition-all ${
                isDragActive ? 'border-primary bg-primary/10' : 'border-muted hover:border-primary/50'
              }`}
            >
              <input {...getInputProps()} />
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload className="h-8 w-8 text-muted-foreground" />
              )}
              {isDragActive && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
              )}
            </div>

            {/* Content Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.type} • Order: {item.order_index} • {item.status}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {typeof item.body === 'object' ? item.body?.content : item.body}
                  </p>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const VisualContentEditor = ({ isAdmin }: VisualContentEditorProps) => {
  const queryClient = useQueryClient();
  const [selectedType, setSelectedType] = useState<string>("feature_card");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch content by type
  const { data: contentData, isLoading } = useQuery({
    queryKey: ["visual-content", selectedType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .eq("type", selectedType as any)
        .order("order_index", { ascending: true });

      if (error) throw error;

      // Fetch images for each content item
      const itemsWithImages = await Promise.all(
        (data || []).map(async (item) => {
          let imageUrl = undefined;
          const body = item.body as any;
          if (body?.imageId) {
            try {
              const { data: media } = await supabase
                .from("media")
                .select("storage_path")
                .eq("id", body.imageId)
                .single();

              if (media) {
                const { data: urlData } = supabase.storage
                  .from("content-images")
                  .getPublicUrl(media.storage_path);
                imageUrl = urlData.publicUrl;
              }
            } catch (error) {
              console.error("Error fetching image:", error);
            }
          }

          return { ...item, imageUrl };
        })
      );

      return itemsWithImages;
    },
  });

  // Update local state when data changes
  useState(() => {
    if (contentData) {
      setItems(contentData);
    }
  });

  // Image upload mutation
  const uploadImageMutation = useMutation({
    mutationFn: async ({ contentId, file }: { contentId: string; file: File }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Upload to storage
      const filename = `${Date.now()}-${file.name}`;
      const storagePath = `uploads/${filename}`;

      const { error: uploadError } = await supabase.storage
        .from("content-images")
        .upload(storagePath, file);

      if (uploadError) throw uploadError;

      // Create media record
      const { data: media, error: dbError } = await supabase
        .from("media")
        .insert([{
          filename,
          original_filename: file.name,
          storage_path: storagePath,
          mime_type: file.type,
          size_bytes: file.size,
          uploaded_by: user.id,
        }])
        .select()
        .single();

      if (dbError) throw dbError;

      // Update content with new imageId
      const item = items.find(i => i.id === contentId);
      if (!item) throw new Error("Content not found");

      const updatedBody = typeof item.body === 'object' 
        ? { ...item.body, imageId: media.id }
        : { content: item.body, imageId: media.id };

      const { error: updateError } = await supabase
        .from("content")
        .update({ body: updatedBody })
        .eq("id", contentId);

      if (updateError) throw updateError;

      return media;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visual-content", selectedType] });
      toast.success("Image uploaded successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Upload failed");
    },
  });

  // Reorder mutation
  const reorderMutation = useMutation({
    mutationFn: async (reorderedItems: ContentItem[]) => {
      const updates = reorderedItems.map((item, index) => ({
        id: item.id,
        order_index: index,
      }));

      for (const update of updates) {
        await supabase
          .from("content")
          .update({ order_index: update.order_index })
          .eq("id", update.id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visual-content", selectedType] });
      toast.success("Order updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Reorder failed");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("content")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visual-content", selectedType] });
      toast.success("Content deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Delete failed");
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const reordered = arrayMove(items, oldIndex, newIndex);
      setItems(reordered);
      reorderMutation.mutate(reordered);
    }
  };

  const handleImageUpload = useCallback((contentId: string, file: File) => {
    uploadImageMutation.mutate({ contentId, file });
  }, [uploadImageMutation]);

  const handleDelete = useCallback((id: string) => {
    if (confirm("Are you sure you want to delete this content?")) {
      deleteMutation.mutate(id);
    }
  }, [deleteMutation]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Visual Content Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Content Type Selector */}
            <div className="flex items-center gap-4">
              <Label className="min-w-[120px]">Content Type:</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="max-w-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                <Eye className="mr-2 h-4 w-4" />
                {showPreview ? "Hide" : "Show"} Preview
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>💡 Tips:</strong> Drag items to reorder • Drop images on cards to upload • Click eye icon to edit
              </p>
            </div>

            {/* Content List with Drag & Drop */}
            {isLoading ? (
              <div className="text-center py-12">Loading content...</div>
            ) : items.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No {selectedType} content found. Create some content in the Content tab first.
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-0">
                    {items.map((item) => (
                      <SortableContentItem
                        key={item.id}
                        item={item}
                        onEdit={setEditingItem}
                        onDelete={handleDelete}
                        onImageUpload={handleImageUpload}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Live Preview Panel */}
      {showPreview && items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative aspect-[3/4] rounded-lg overflow-hidden border-2 border-muted hover:border-primary transition-colors"
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800" />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-bold text-sm">{item.title}</p>
                    <p className="text-white/80 text-xs line-clamp-2">
                      {typeof item.body === 'object' ? item.body?.content : item.body}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    #{item.order_index}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VisualContentEditor;