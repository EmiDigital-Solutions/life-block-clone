
-- Migration: 20251105115821
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User roles enum
CREATE TYPE app_role AS ENUM ('admin', 'editor', 'viewer');

-- Content types enum
CREATE TYPE content_type AS ENUM (
  'hero_section',
  'feature_card',
  'testimonial',
  'page_section',
  'project'
);

-- Content status enum
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Helper function to check if user is admin or editor
CREATE OR REPLACE FUNCTION public.can_manage_content(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id 
    AND role IN ('admin', 'editor')
  )
$$;

-- Main content table
CREATE TABLE public.content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type content_type NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  body JSONB NOT NULL DEFAULT '{}',
  status content_status DEFAULT 'draft',
  meta_data JSONB DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  updated_by UUID REFERENCES auth.users(id)
);

-- Media library table
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  storage_path TEXT NOT NULL UNIQUE,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  caption TEXT,
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES auth.users(id) NOT NULL
);

-- Content-Media relationship (many-to-many)
CREATE TABLE public.content_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES public.content(id) ON DELETE CASCADE NOT NULL,
  media_id UUID REFERENCES public.media(id) ON DELETE CASCADE NOT NULL,
  position INTEGER DEFAULT 0,
  role TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(content_id, media_id, role)
);

-- Indexes for performance
CREATE INDEX idx_content_type ON public.content(type);
CREATE INDEX idx_content_status ON public.content(status);
CREATE INDEX idx_content_slug ON public.content(slug);
CREATE INDEX idx_content_created ON public.content(created_at DESC);
CREATE INDEX idx_media_uploaded ON public.media(uploaded_at DESC);
CREATE INDEX idx_media_tags ON public.media USING GIN(tags);
CREATE INDEX idx_content_body ON public.content USING GIN(body);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_media ENABLE ROW LEVEL SECURITY;

-- User roles policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Content policies
CREATE POLICY "Anyone can view published content"
  ON public.content FOR SELECT
  USING (status = 'published' OR public.can_manage_content(auth.uid()));

CREATE POLICY "Editors can insert content"
  ON public.content FOR INSERT
  WITH CHECK (public.can_manage_content(auth.uid()));

CREATE POLICY "Editors can update content"
  ON public.content FOR UPDATE
  USING (public.can_manage_content(auth.uid()));

CREATE POLICY "Admins can delete content"
  ON public.content FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Media policies
CREATE POLICY "Anyone can view media"
  ON public.media FOR SELECT
  USING (true);

CREATE POLICY "Editors can insert media"
  ON public.media FOR INSERT
  WITH CHECK (public.can_manage_content(auth.uid()));

CREATE POLICY "Editors can update media"
  ON public.media FOR UPDATE
  USING (public.can_manage_content(auth.uid()));

CREATE POLICY "Admins can delete media"
  ON public.media FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Content-Media policies
CREATE POLICY "Anyone can view content-media relationships"
  ON public.content_media FOR SELECT
  USING (true);

CREATE POLICY "Editors can manage content-media relationships"
  ON public.content_media FOR ALL
  USING (public.can_manage_content(auth.uid()));

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_content_updated_at 
  BEFORE UPDATE ON public.content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('content-images', 'content-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies for content-images bucket
CREATE POLICY "Anyone can view content images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'content-images');

CREATE POLICY "Editors can upload content images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'content-images' 
    AND public.can_manage_content(auth.uid())
  );

CREATE POLICY "Editors can update content images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'content-images' 
    AND public.can_manage_content(auth.uid())
  );

CREATE POLICY "Admins can delete content images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'content-images' 
    AND public.has_role(auth.uid(), 'admin')
  );

-- Migration: 20251105121433
-- Add more content types for all website sections
ALTER TYPE content_type ADD VALUE IF NOT EXISTS 'hero_content';
ALTER TYPE content_type ADD VALUE IF NOT EXISTS 'auditor_card';
ALTER TYPE content_type ADD VALUE IF NOT EXISTS 'full_screen_section';
ALTER TYPE content_type ADD VALUE IF NOT EXISTS 'feature_photo';
