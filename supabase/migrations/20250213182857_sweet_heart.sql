/*
  # Add email field to users table

  1. Changes
    - Add email column to users table
    - Make email column unique and not null
    - Add index on email column for faster lookups

  2. Security
    - Maintain existing RLS policies
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'email'
  ) THEN
    ALTER TABLE users ADD COLUMN email text NOT NULL;
    ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  END IF;
END $$;