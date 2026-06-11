/*
  # Create Events/Blog Table

  1. New Tables
    - `events`
      - `id` (uuid, primary key) - Unique identifier for each event
      - `title` (text) - Event title
      - `description` (text) - Event description/details
      - `event_date` (timestamptz) - When the event will occur
      - `event_type` (text) - Type of event (e.g., 'workshop', 'library_session', 'community_event')
      - `location` (text) - Event location
      - `created_at` (timestamptz) - When the record was created
      - `updated_at` (timestamptz) - When the record was last updated
      - `is_published` (boolean) - Whether the event is visible to public
  
  2. Security
    - Enable RLS on `events` table
    - Add policy for public to read published events
    - Add policy for authenticated users to manage all events (admin functionality)
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  event_type text DEFAULT 'community_event',
  location text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_published boolean DEFAULT true
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published events"
  ON events
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can insert events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete events"
  ON events
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_published ON events(is_published, event_date DESC);