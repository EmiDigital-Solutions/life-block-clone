-- Add more content types for all website sections
ALTER TYPE content_type ADD VALUE IF NOT EXISTS 'hero_content';
ALTER TYPE content_type ADD VALUE IF NOT EXISTS 'auditor_card';
ALTER TYPE content_type ADD VALUE IF NOT EXISTS 'full_screen_section';
ALTER TYPE content_type ADD VALUE IF NOT EXISTS 'feature_photo';