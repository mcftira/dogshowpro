/*
  # Initial Schema Setup for Dog Competition Platform

  1. New Tables
    - users
      - Extended user profile information
      - Linked to Supabase auth.users
    - competitions
      - Core competition information
      - Organizer details and settings
    - registrations
      - Competition registrations
      - Payment status tracking
    - dogs
      - Dog profiles with breed information
      - Health records and certifications
    - favorites
      - User's favorited competitions
    
  2. Security
    - RLS policies for all tables
    - Organizer-specific permissions
    - Public/private data separation

  3. Indexes
    - Optimized queries for common operations
    - Full-text search capabilities
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  bio text,
  avatar_url text,
  phone_number text,
  is_organizer boolean DEFAULT false,
  is_judge boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own profile"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  USING (auth.uid() = id);

-- Dogs table
CREATE TABLE IF NOT EXISTS dogs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id uuid REFERENCES users(id) NOT NULL,
  name text NOT NULL,
  breed text NOT NULL,
  date_of_birth date,
  registration_number text,
  pedigree_url text,
  health_records jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE dogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Dogs are viewable by everyone"
  ON dogs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own dogs"
  ON dogs
  USING (auth.uid() = owner_id);

-- Competitions table
CREATE TABLE IF NOT EXISTS competitions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_id uuid REFERENCES users(id) NOT NULL,
  title text NOT NULL,
  description text,
  location jsonb NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  registration_deadline timestamptz NOT NULL,
  max_participants integer,
  current_participants integer DEFAULT 0,
  entry_fee decimal(10,2),
  categories jsonb DEFAULT '[]',
  rules text,
  status text DEFAULT 'draft',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Competitions are viewable by everyone"
  ON competitions
  FOR SELECT
  USING (status = 'published' OR auth.uid() = organizer_id);

CREATE POLICY "Organizers can manage their competitions"
  ON competitions
  USING (auth.uid() = organizer_id);

-- Registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  competition_id uuid REFERENCES competitions(id) NOT NULL,
  user_id uuid REFERENCES users(id) NOT NULL,
  dog_id uuid REFERENCES dogs(id) NOT NULL,
  status text DEFAULT 'pending',
  payment_status text DEFAULT 'pending',
  payment_intent_id text,
  category text,
  notes text,
  check_in_time timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their registrations"
  ON registrations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create registrations"
  ON registrations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) NOT NULL,
  competition_id uuid REFERENCES competitions(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, competition_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their favorites"
  ON favorites
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_competitions_start_date ON competitions(start_date);
CREATE INDEX IF NOT EXISTS idx_competitions_location ON competitions USING GIN (location jsonb_path_ops);
CREATE INDEX IF NOT EXISTS idx_competitions_status ON competitions(status);
CREATE INDEX IF NOT EXISTS idx_registrations_competition ON registrations(competition_id);
CREATE INDEX IF NOT EXISTS idx_registrations_user ON registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_dogs_owner ON dogs(owner_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dogs_updated_at
    BEFORE UPDATE ON dogs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_competitions_updated_at
    BEFORE UPDATE ON competitions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at
    BEFORE UPDATE ON registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();