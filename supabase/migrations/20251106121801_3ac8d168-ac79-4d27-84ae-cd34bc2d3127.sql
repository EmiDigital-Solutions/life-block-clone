-- Create media table for file storage
CREATE TABLE IF NOT EXISTS public.media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create content table for CMS
CREATE TABLE IF NOT EXISTS public.content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  body JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create content_media junction table
CREATE TABLE IF NOT EXISTS public.content_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_id UUID NOT NULL REFERENCES public.content(id) ON DELETE CASCADE,
  media_id UUID NOT NULL REFERENCES public.media(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for content images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('content-images', 'content-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on all tables
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_media ENABLE ROW LEVEL SECURITY;

-- Media table policies
CREATE POLICY "Public media is viewable by everyone"
  ON public.media FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can upload media"
  ON public.media FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own media"
  ON public.media FOR UPDATE
  USING (uploaded_by = auth.uid());

CREATE POLICY "Users can delete their own media"
  ON public.media FOR DELETE
  USING (uploaded_by = auth.uid());

-- Content table policies
CREATE POLICY "Published content is viewable by everyone"
  ON public.content FOR SELECT
  USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create content"
  ON public.content FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update content"
  ON public.content FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can delete content"
  ON public.content FOR DELETE
  USING (auth.role() = 'authenticated');

-- User roles policies
CREATE POLICY "Users can view their own role"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert user roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (true);

-- Content media policies
CREATE POLICY "Anyone can view content media relationships"
  ON public.content_media FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create content media relationships"
  ON public.content_media FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete content media relationships"
  ON public.content_media FOR DELETE
  USING (auth.role() = 'authenticated');

-- Storage policies for content-images bucket
CREATE POLICY "Public images are accessible to everyone"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'content-images');

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'content-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'content-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'content-images' AND auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_content_type ON public.content(type);
CREATE INDEX IF NOT EXISTS idx_content_status ON public.content(status);
CREATE INDEX IF NOT EXISTS idx_content_slug ON public.content(slug);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add updated_at triggers
CREATE TRIGGER set_updated_at_media
  BEFORE UPDATE ON public.media
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_content
  BEFORE UPDATE ON public.content
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_user_roles
  BEFORE UPDATE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();