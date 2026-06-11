/*
  # Create Content Management Tables

  1. New Tables
    - `gallery_photos`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text, optional)
      - `image_url` (text, URL to uploaded image)
      - `category` (text, e.g., "events", "activities", "education")
      - `uploaded_by` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `is_published` (boolean, default true)
    
    - `magazines`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `cover_image_url` (text)
      - `pdf_url` (text, URL to PDF file)
      - `issue_date` (date)
      - `uploaded_by` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `is_published` (boolean, default true)
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text)
      - `featured_image_url` (text, optional)
      - `author_id` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `is_published` (boolean, default false)
      - `publish_date` (timestamptz, optional)

  2. Security
    - Enable RLS on all tables
    - Public can read published content
    - Only authenticated users can create/update/delete
*/

-- Gallery Photos Table
CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text DEFAULT 'general',
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  is_published boolean DEFAULT true
);

ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published photos"
  ON gallery_photos FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Authenticated users can insert photos"
  ON gallery_photos FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Authenticated users can update own photos"
  ON gallery_photos FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploaded_by)
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Authenticated users can delete own photos"
  ON gallery_photos FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);

-- Magazines Table
CREATE TABLE IF NOT EXISTS magazines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  cover_image_url text,
  pdf_url text NOT NULL,
  issue_date date,
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  is_published boolean DEFAULT true
);

ALTER TABLE magazines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published magazines"
  ON magazines FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Authenticated users can insert magazines"
  ON magazines FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Authenticated users can update own magazines"
  ON magazines FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploaded_by)
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Authenticated users can delete own magazines"
  ON magazines FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  featured_image_url text,
  author_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_published boolean DEFAULT false,
  publish_date timestamptz
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authenticated users can update own blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authenticated users can delete own blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_gallery_photos_published ON gallery_photos(is_published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_magazines_published ON magazines(is_published, issue_date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, publish_date DESC);
