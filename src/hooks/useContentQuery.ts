import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ContentItem {
  id: string;
  type: string;
  title: string;
  slug: string;
  body: {
    content?: string;
    imageId?: string;
    description?: string;
  };
  status: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  original_filename: string;
  storage_path: string;
  mime_type: string;
  size_bytes: number;
  alt_text?: string;
  caption?: string;
}

export const useContentByType = (contentType: string) => {
  return useQuery({
    queryKey: ["content", contentType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .eq("type", contentType as any)
        .eq("status", "published")
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data as ContentItem[];
    },
  });
};

export const useMediaById = (mediaId: string | undefined) => {
  return useQuery({
    queryKey: ["media", mediaId],
    queryFn: async () => {
      if (!mediaId) return null;
      
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .eq("id", mediaId)
        .single();

      if (error) throw error;
      return data as MediaItem;
    },
    enabled: !!mediaId,
  });
};

export const getMediaPublicUrl = (storagePath: string) => {
  const { data } = supabase.storage
    .from("content-images")
    .getPublicUrl(storagePath);
  return data.publicUrl;
};