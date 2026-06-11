/*
  Advesa Trust website setup for Supabase SQL Editor.

  Paste this full file into Supabase Dashboard > SQL Editor > New query > Run.
  It creates the public content tables, contact enquiry storage, newsletter subscriber storage,
  indexes, grants, and RLS policies needed by the website.
*/

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;

CREATE TABLE IF NOT EXISTS public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  event_type text DEFAULT 'community_event',
  location text DEFAULT '',
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_published boolean DEFAULT true
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can insert events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can update events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can delete events" ON public.events;

CREATE POLICY "Anyone can view published events"
  ON public.events FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can insert events"
  ON public.events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON public.events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete events"
  ON public.events FOR DELETE
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS public.gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text DEFAULT 'general',
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  is_published boolean DEFAULT true
);

ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published photos" ON public.gallery_photos;
DROP POLICY IF EXISTS "Authenticated users can insert photos" ON public.gallery_photos;
DROP POLICY IF EXISTS "Authenticated users can update own photos" ON public.gallery_photos;
DROP POLICY IF EXISTS "Authenticated users can delete own photos" ON public.gallery_photos;

CREATE POLICY "Anyone can view published photos"
  ON public.gallery_photos FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can insert photos"
  ON public.gallery_photos FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Authenticated users can update own photos"
  ON public.gallery_photos FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploaded_by)
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Authenticated users can delete own photos"
  ON public.gallery_photos FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);

CREATE TABLE IF NOT EXISTS public.magazines (
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

ALTER TABLE public.magazines ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published magazines" ON public.magazines;
DROP POLICY IF EXISTS "Authenticated users can insert magazines" ON public.magazines;
DROP POLICY IF EXISTS "Authenticated users can update own magazines" ON public.magazines;
DROP POLICY IF EXISTS "Authenticated users can delete own magazines" ON public.magazines;

CREATE POLICY "Anyone can view published magazines"
  ON public.magazines FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can insert magazines"
  ON public.magazines FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Authenticated users can update own magazines"
  ON public.magazines FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploaded_by)
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Authenticated users can delete own magazines"
  ON public.magazines FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);

CREATE TABLE IF NOT EXISTS public.blog_posts (
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

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update own blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete own blog posts" ON public.blog_posts;

CREATE POLICY "Anyone can view published blog posts"
  ON public.blog_posts FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can insert blog posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authenticated users can update own blog posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authenticated users can delete own blog posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

CREATE TABLE IF NOT EXISTS public.contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text DEFAULT '',
  email citext NOT NULL,
  message text DEFAULT '',
  source text DEFAULT 'website_contact',
  created_at timestamptz DEFAULT now(),
  admin_notified_at timestamptz,
  user_notified_at timestamptz,
  email_error text
);

ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view contact enquiries" ON public.contact_enquiries;
DROP POLICY IF EXISTS "Authenticated users can update contact enquiries" ON public.contact_enquiries;
DROP POLICY IF EXISTS "Authenticated users can delete contact enquiries" ON public.contact_enquiries;

CREATE POLICY "Authenticated users can view contact enquiries"
  ON public.contact_enquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact enquiries"
  ON public.contact_enquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact enquiries"
  ON public.contact_enquiries FOR DELETE
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email citext NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed')),
  source text DEFAULT 'website_footer',
  subscribed_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  admin_notified_at timestamptz,
  confirmation_sent_at timestamptz,
  email_error text
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view newsletter subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Authenticated users can update newsletter subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Authenticated users can delete newsletter subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Authenticated users can view newsletter subscribers"
  ON public.newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update newsletter subscribers"
  ON public.newsletter_subscribers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete newsletter subscribers"
  ON public.newsletter_subscribers FOR DELETE
  TO authenticated
  USING (true);

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT SELECT ON public.events, public.gallery_photos, public.magazines, public.blog_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.events, public.gallery_photos, public.magazines, public.blog_posts TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_enquiries, public.newsletter_subscribers TO authenticated, service_role;

CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_published ON public.events(is_published, event_date DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_published ON public.gallery_photos(is_published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_magazines_published ON public.magazines(is_published, issue_date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(is_published, publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_created_at ON public.contact_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_email ON public.contact_enquiries(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON public.newsletter_subscribers(status, subscribed_at DESC);
