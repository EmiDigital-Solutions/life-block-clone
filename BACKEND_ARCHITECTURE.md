# Backend Architecture Specification
## Dynamic Content & Image Management System

### Overview
This document provides a complete technical blueprint for building a robust content management system with dynamic content and image management capabilities using Lovable Cloud (Supabase-powered backend).

---

## 1. Technology Stack

### Backend Infrastructure
- **Database**: PostgreSQL (via Lovable Cloud)
- **Authentication**: Lovable Cloud Auth (JWT-based)
- **File Storage**: Lovable Cloud Storage (S3-compatible)
- **API Layer**: Lovable Cloud Edge Functions (Deno runtime)
- **Real-time**: Lovable Cloud Realtime (WebSocket-based)

### Frontend Integration
- **Framework**: React 18+ with TypeScript
- **State Management**: TanStack Query for server state
- **HTTP Client**: Supabase Client (pre-configured)
- **File Upload**: Native HTML5 with progress tracking

---

## 2. Database Schema Design

### 2.1 Content Tables

```sql
-- Content types enum
CREATE TYPE content_type AS ENUM (
  'hero_section',
  'feature_card',
  'testimonial',
  'blog_post',
  'page_section',
  'faq_item'
);

-- Content status enum
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- Main content table
CREATE TABLE public.content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type content_type NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  body JSONB NOT NULL, -- Flexible structure for different content types
  status content_status DEFAULT 'draft',
  meta_data JSONB, -- SEO metadata, tags, etc.
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  updated_by UUID REFERENCES auth.users(id)
);

-- Content versions for history tracking
CREATE TABLE public.content_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES public.content(id) ON DELETE CASCADE NOT NULL,
  version_number INTEGER NOT NULL,
  body JSONB NOT NULL,
  meta_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  UNIQUE(content_id, version_number)
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
  tags TEXT[],
  metadata JSONB, -- EXIF data, etc.
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID REFERENCES auth.users(id) NOT NULL
);

-- Content-Media relationship (many-to-many)
CREATE TABLE public.content_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES public.content(id) ON DELETE CASCADE NOT NULL,
  media_id UUID REFERENCES public.media(id) ON DELETE CASCADE NOT NULL,
  position INTEGER DEFAULT 0,
  role TEXT, -- 'hero', 'thumbnail', 'gallery', etc.
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
```

### 2.2 User Roles System

```sql
-- User roles enum
CREATE TYPE app_role AS ENUM ('admin', 'editor', 'viewer');

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
```

### 2.3 Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Content policies
CREATE POLICY "Anyone can view published content"
  ON public.content FOR SELECT
  USING (status = 'published');

CREATE POLICY "Editors can view all content"
  ON public.content FOR SELECT
  USING (public.can_manage_content(auth.uid()));

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

-- Content versions policies
CREATE POLICY "Editors can view all versions"
  ON public.content_versions FOR SELECT
  USING (public.can_manage_content(auth.uid()));

CREATE POLICY "Editors can create versions"
  ON public.content_versions FOR INSERT
  WITH CHECK (public.can_manage_content(auth.uid()));

-- User roles policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));
```

### 2.4 Database Triggers

```sql
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

-- Auto-create content version on update
CREATE OR REPLACE FUNCTION create_content_version()
RETURNS TRIGGER AS $$
DECLARE
  next_version INTEGER;
BEGIN
  IF OLD.body IS DISTINCT FROM NEW.body OR OLD.meta_data IS DISTINCT FROM NEW.meta_data THEN
    SELECT COALESCE(MAX(version_number), 0) + 1 INTO next_version
    FROM public.content_versions
    WHERE content_id = NEW.id;
    
    INSERT INTO public.content_versions (
      content_id, version_number, body, meta_data, created_by
    ) VALUES (
      NEW.id, next_version, OLD.body, OLD.meta_data, auth.uid()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER content_versioning_trigger
  AFTER UPDATE ON public.content
  FOR EACH ROW EXECUTE FUNCTION create_content_version();
```

---

## 3. Storage Configuration

### 3.1 Storage Buckets

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('content-images', 'content-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('documents', 'documents', false, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
```

### 3.2 Storage RLS Policies

```sql
-- Content images bucket policies
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
```

---

## 4. API Endpoints Structure

### 4.1 Content Management API

#### GET /api/content
**Purpose**: List all content with filtering and pagination  
**Authentication**: Public for published, authenticated for drafts  
**Query Parameters**:
- `type`: content_type (optional)
- `status`: content_status (optional)
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `search`: string (optional)

**Response**:
```typescript
{
  data: Array<{
    id: string;
    type: string;
    title: string;
    slug: string;
    body: object;
    status: string;
    meta_data: object;
    order_index: number;
    created_at: string;
    updated_at: string;
    media: Array<{
      id: string;
      storage_path: string;
      alt_text: string;
      role: string;
    }>;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
```

#### GET /api/content/:slug
**Purpose**: Get single content item by slug  
**Authentication**: Public for published, authenticated for drafts  
**Response**: Single content object with full details

#### POST /api/content
**Purpose**: Create new content  
**Authentication**: Required (editor/admin)  
**Request Body**:
```typescript
{
  type: string;
  title: string;
  slug: string;
  body: object;
  status?: string;
  meta_data?: object;
  order_index?: number;
  media_ids?: string[];
}
```

#### PUT /api/content/:id
**Purpose**: Update existing content  
**Authentication**: Required (editor/admin)  
**Request Body**: Same as POST

#### DELETE /api/content/:id
**Purpose**: Delete content (soft delete to archived)  
**Authentication**: Required (admin only)

#### GET /api/content/:id/versions
**Purpose**: Get version history for content  
**Authentication**: Required (editor/admin)

#### POST /api/content/:id/revert/:version
**Purpose**: Revert content to specific version  
**Authentication**: Required (editor/admin)

### 4.2 Media Management API

#### GET /api/media
**Purpose**: List all media files with filtering  
**Authentication**: Public  
**Query Parameters**:
- `page`, `limit`: pagination
- `tags`: string[] (optional)
- `mime_type`: string (optional)
- `search`: string (optional)

**Response**:
```typescript
{
  data: Array<{
    id: string;
    filename: string;
    storage_path: string;
    public_url: string;
    mime_type: string;
    size_bytes: number;
    width?: number;
    height?: number;
    alt_text?: string;
    caption?: string;
    tags: string[];
    uploaded_at: string;
  }>;
  pagination: object;
}
```

#### POST /api/media/upload
**Purpose**: Upload new media file  
**Authentication**: Required (editor/admin)  
**Request**: multipart/form-data
```typescript
{
  file: File;
  alt_text?: string;
  caption?: string;
  tags?: string[];
}
```

**Response**:
```typescript
{
  media: {
    id: string;
    storage_path: string;
    public_url: string;
    // ... other fields
  }
}
```

#### PUT /api/media/:id
**Purpose**: Update media metadata  
**Authentication**: Required (editor/admin)  
**Request Body**:
```typescript
{
  alt_text?: string;
  caption?: string;
  tags?: string[];
}
```

#### DELETE /api/media/:id
**Purpose**: Delete media file  
**Authentication**: Required (admin only)  
**Note**: Should check if media is used in content before deletion

#### POST /api/media/bulk-upload
**Purpose**: Upload multiple files at once  
**Authentication**: Required (editor/admin)  
**Request**: multipart/form-data with multiple files

---

## 5. Edge Functions Implementation

### 5.1 File Upload Handler

**Function**: `content-image-upload`

```typescript
// supabase/functions/content-image-upload/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check permissions
    const { data: canManage } = await supabase.rpc('can_manage_content', { _user_id: user.id });
    if (!canManage) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const altText = formData.get('alt_text') as string;
    const caption = formData.get('caption') as string;
    const tags = JSON.parse(formData.get('tags') as string || '[]');

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return new Response(JSON.stringify({ error: 'Invalid file type' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return new Response(JSON.stringify({ error: 'File too large' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = crypto.randomUUID().substring(0, 8);
    const ext = file.name.split('.').pop();
    const filename = `${timestamp}-${randomStr}.${ext}`;
    const storagePath = `uploads/${filename}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from('content-images')
      .upload(storagePath, file, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('content-images')
      .getPublicUrl(storagePath);

    // Get image dimensions (if available)
    let width, height;
    if (file.type.startsWith('image/')) {
      // Image dimensions would be extracted here
      // Implementation depends on image processing library
    }

    // Create media record
    const { data: media, error: dbError } = await supabase
      .from('media')
      .insert({
        filename,
        original_filename: file.name,
        storage_path: storagePath,
        mime_type: file.type,
        size_bytes: file.size,
        width,
        height,
        alt_text: altText,
        caption,
        tags,
        uploaded_by: user.id
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return new Response(JSON.stringify({
      media: {
        ...media,
        public_url: publicUrl
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
```

### 5.2 Content Management Handler

**Function**: `content-manager`

```typescript
// supabase/functions/content-manager/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.split('/').filter(Boolean);
    const action = path[0] || 'list';

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // Route handlers
    switch (action) {
      case 'list':
        return await listContent(req, supabase);
      case 'get':
        return await getContent(req, supabase, path[1]);
      case 'create':
        return await createContent(req, supabase);
      case 'update':
        return await updateContent(req, supabase, path[1]);
      case 'delete':
        return await deleteContent(req, supabase, path[1]);
      case 'versions':
        return await getVersions(req, supabase, path[1]);
      case 'revert':
        return await revertVersion(req, supabase, path[1], path[2]);
      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    console.error('Content manager error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

async function listContent(req, supabase) {
  const url = new URL(req.url);
  const type = url.searchParams.get('type');
  const status = url.searchParams.get('status') || 'published';
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const search = url.searchParams.get('search');

  let query = supabase
    .from('content')
    .select(`
      *,
      media:content_media(
        media:media_id(*)
      )
    `, { count: 'exact' });

  if (type) query = query.eq('type', type);
  if (status) query = query.eq('status', status);
  if (search) query = query.or(`title.ilike.%${search}%,slug.ilike.%${search}%`);

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;

  return new Response(JSON.stringify({
    data,
    pagination: {
      page,
      limit,
      total: count,
      pages: Math.ceil(count / limit)
    }
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

async function createContent(req, supabase) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const body = await req.json();
  const { media_ids, ...contentData } = body;

  // Create content
  const { data: content, error } = await supabase
    .from('content')
    .insert({
      ...contentData,
      created_by: user.id
    })
    .select()
    .single();

  if (error) throw error;

  // Associate media if provided
  if (media_ids && media_ids.length > 0) {
    const mediaRelations = media_ids.map((mediaId, index) => ({
      content_id: content.id,
      media_id: mediaId,
      position: index
    }));

    await supabase.from('content_media').insert(mediaRelations);
  }

  return new Response(JSON.stringify({ data: content }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

// Additional handler functions...
```

---

## 6. Frontend Integration Guide

### 6.1 TanStack Query Setup

```typescript
// src/lib/queries/content.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useContent = (filters?: {
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['content', filters],
    queryFn: async () => {
      let query = supabase
        .from('content')
        .select(`
          *,
          media:content_media(
            media:media_id(*)
          )
        `);

      if (filters?.type) query = query.eq('type', filters.type);
      if (filters?.status) query = query.eq('status', filters.status);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });
};

export const useCreateContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (content: any) => {
      const { data, error } = await supabase
        .from('content')
        .insert(content)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
    }
  });
};
```

### 6.2 File Upload Component

```typescript
// src/components/MediaUploader.tsx
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const MediaUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (file: File) => {
    setUploading(true);
    
    try {
      // Upload to storage
      const filename = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('content-images')
        .upload(`uploads/${filename}`, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Create media record
      const { data: media, error: dbError } = await supabase
        .from('media')
        .insert({
          filename,
          original_filename: file.name,
          storage_path: `uploads/${filename}`,
          mime_type: file.type,
          size_bytes: file.size
        })
        .select()
        .single();

      if (dbError) throw dbError;

      toast.success('File uploaded successfully');
      return media;
    } catch (error) {
      toast.error('Upload failed');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        disabled={uploading}
      />
      {uploading && <progress value={progress} max="100" />}
    </div>
  );
};
```

### 6.3 Real-time Updates

```typescript
// src/hooks/useRealtimeContent.ts
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

export const useRealtimeContent = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('content-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'content'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['content'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
};
```

---

## 7. Security Considerations

### 7.1 Input Validation

```typescript
import { z } from 'zod';

export const contentSchema = z.object({
  type: z.enum(['hero_section', 'feature_card', 'testimonial', 'blog_post', 'page_section', 'faq_item']),
  title: z.string().min(1).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  body: z.record(z.any()),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  meta_data: z.record(z.any()).optional(),
  order_index: z.number().int().min(0).optional()
});

export const mediaUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File must be less than 10MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type),
      'Only JPEG, PNG, WebP, and GIF images are allowed'
    ),
  alt_text: z.string().max(200).optional(),
  caption: z.string().max(500).optional(),
  tags: z.array(z.string()).max(10).optional()
});
```

### 7.2 Rate Limiting

Implement rate limiting on edge functions:

```typescript
// Simple rate limiter using in-memory store
const rateLimitStore = new Map();

function checkRateLimit(userId: string, limit: number = 100, window: number = 60000) {
  const now = Date.now();
  const userRequests = rateLimitStore.get(userId) || [];
  const recentRequests = userRequests.filter(time => now - time < window);
  
  if (recentRequests.length >= limit) {
    throw new Error('Rate limit exceeded');
  }
  
  recentRequests.push(now);
  rateLimitStore.set(userId, recentRequests);
}
```

### 7.3 Content Sanitization

For user-generated HTML content:

```typescript
import DOMPurify from 'dompurify';

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target']
  });
}
```

---

## 8. Performance Optimization

### 8.1 Database Indexes

Already included in schema (see Section 2.1)

### 8.2 Image Optimization

```typescript
// Edge function for image transformation
export async function optimizeImage(
  storagePath: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  }
) {
  // Implementation using image transformation service
  // Could use Supabase Image Transformation or external service
}
```

### 8.3 Caching Strategy

```typescript
// Frontend caching with TanStack Query
export const useContent = () => {
  return useQuery({
    queryKey: ['content'],
    queryFn: fetchContent,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false
  });
};
```

---

## 9. Admin Dashboard Requirements

### 9.1 Content Editor Interface
- Rich text editor (TipTap or similar)
- Media library browser with search/filter
- Drag-and-drop image upload
- Preview mode before publishing
- Version history viewer with diff display

### 9.2 Media Management
- Grid view with thumbnails
- Bulk upload capability
- Tag management
- Search and filter by type, date, tags
- Image metadata editor

### 9.3 User Management
- Role assignment interface
- Activity logs
- Permission matrix display

---

## 10. Deployment Checklist

- [ ] Enable Lovable Cloud
- [ ] Run all database migrations
- [ ] Create storage buckets
- [ ] Configure RLS policies
- [ ] Deploy edge functions
- [ ] Set up environment secrets
- [ ] Create initial admin user
- [ ] Test file upload flow
- [ ] Test content CRUD operations
- [ ] Verify role-based access control
- [ ] Enable real-time subscriptions
- [ ] Set up monitoring and logging
- [ ] Configure backups
- [ ] Test image optimization
- [ ] Verify SEO metadata handling

---

## 11. Error Handling

### 11.1 Standard Error Responses

```typescript
interface ApiError {
  error: string;
  code: string;
  details?: any;
  timestamp: string;
}

// Error codes
const ERROR_CODES = {
  UNAUTHORIZED: 'ERR_UNAUTHORIZED',
  FORBIDDEN: 'ERR_FORBIDDEN',
  NOT_FOUND: 'ERR_NOT_FOUND',
  VALIDATION: 'ERR_VALIDATION',
  UPLOAD_FAILED: 'ERR_UPLOAD_FAILED',
  DATABASE: 'ERR_DATABASE',
  INTERNAL: 'ERR_INTERNAL'
};
```

### 11.2 Frontend Error Handling

```typescript
import { toast } from 'sonner';

export function handleApiError(error: any) {
  const message = error?.message || 'An error occurred';
  const code = error?.code || 'UNKNOWN';
  
  console.error(`[${code}]`, error);
  
  switch (code) {
    case 'ERR_UNAUTHORIZED':
      toast.error('Please log in to continue');
      // Redirect to login
      break;
    case 'ERR_FORBIDDEN':
      toast.error('You do not have permission to perform this action');
      break;
    case 'ERR_VALIDATION':
      toast.error(`Validation error: ${message}`);
      break;
    default:
      toast.error(message);
  }
}
```

---

## 12. Testing Strategy

### 12.1 Database Tests
- RLS policy verification
- Trigger functionality
- Foreign key constraints
- Index performance

### 12.2 API Tests
- Authentication flows
- CRUD operations
- File upload/download
- Error handling
- Rate limiting

### 12.3 Integration Tests
- End-to-end content creation flow
- Media upload and association
- Version control
- Permission checks

---

## Implementation Priority

1. **Phase 1**: Core Infrastructure
   - Enable Lovable Cloud
   - Create database schema
   - Set up RLS policies
   - Configure storage buckets

2. **Phase 2**: Basic CRUD
   - Implement content queries
   - Create basic upload functionality
   - Build simple admin interface

3. **Phase 3**: Advanced Features
   - Version control
   - Real-time updates
   - Image optimization
   - Advanced filtering

4. **Phase 4**: Polish
   - Performance optimization
   - Enhanced error handling
   - Comprehensive testing
   - Documentation

---

This specification provides a complete blueprint for implementing a robust content management system with dynamic content and image management capabilities using Lovable Cloud infrastructure.
