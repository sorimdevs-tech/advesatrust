/*
  # Store website contact enquiries and newsletter subscriptions

  1. New Tables
    - `contact_enquiries`
      - Stores public contact form submissions.
      - Includes email delivery status fields for admin/user notifications.
    - `newsletter_subscribers`
      - Stores newsletter subscribers by unique email.
      - Includes email delivery status fields for admin/user notifications.

  2. Security
    - Enable RLS.
    - Authenticated admins can read/update/delete records.
    - Public inserts are handled by the Supabase Edge Function with the service role key.
*/

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;

CREATE TABLE IF NOT EXISTS contact_enquiries (
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

ALTER TABLE contact_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view contact enquiries"
  ON contact_enquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact enquiries"
  ON contact_enquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact enquiries"
  ON contact_enquiries FOR DELETE
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
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

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view newsletter subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update newsletter subscribers"
  ON newsletter_subscribers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete newsletter subscribers"
  ON newsletter_subscribers FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_contact_enquiries_created_at ON contact_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_email ON contact_enquiries(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status, subscribed_at DESC);
