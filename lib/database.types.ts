export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string | null
          bio: string | null
          avatar_url: string | null
          phone_number: string | null
          is_organizer: boolean
          is_judge: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          phone_number?: string | null
          is_organizer?: boolean
          is_judge?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          phone_number?: string | null
          is_organizer?: boolean
          is_judge?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      dogs: {
        Row: {
          id: string
          owner_id: string
          name: string
          breed: string
          date_of_birth: string | null
          registration_number: string | null
          pedigree_url: string | null
          health_records: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          breed: string
          date_of_birth?: string | null
          registration_number?: string | null
          pedigree_url?: string | null
          health_records?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          breed?: string
          date_of_birth?: string | null
          registration_number?: string | null
          pedigree_url?: string | null
          health_records?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      competitions: {
        Row: {
          id: string
          organizer_id: string
          title: string
          description: string | null
          location: Json
          start_date: string
          end_date: string
          registration_deadline: string
          max_participants: number | null
          current_participants: number
          entry_fee: number | null
          categories: Json
          rules: string | null
          status: string
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organizer_id: string
          title: string
          description?: string | null
          location: Json
          start_date: string
          end_date: string
          registration_deadline: string
          max_participants?: number | null
          current_participants?: number
          entry_fee?: number | null
          categories?: Json
          rules?: string | null
          status?: string
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organizer_id?: string
          title?: string
          description?: string | null
          location?: Json
          start_date?: string
          end_date?: string
          registration_deadline?: string
          max_participants?: number | null
          current_participants?: number
          entry_fee?: number | null
          categories?: Json
          rules?: string | null
          status?: string
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}