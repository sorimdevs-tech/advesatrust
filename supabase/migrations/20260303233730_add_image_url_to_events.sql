/*
  # Add Image Support to Events

  1. Changes
    - Add `image_url` column to `events` table to store event images
    - Column is nullable to support events without images
  
  2. Notes
    - Images are stored in the `event-images` storage bucket
    - The URL will be a public URL from Supabase Storage
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'events' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE events ADD COLUMN image_url text;
  END IF;
END $$;
