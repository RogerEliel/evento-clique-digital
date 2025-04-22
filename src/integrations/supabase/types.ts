export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      confirmation_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          photographer_id: string
          token: string
          used: boolean
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          photographer_id: string
          token: string
          used?: boolean
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          photographer_id?: string
          token?: string
          used?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "confirmation_tokens_photographer_id_fkey"
            columns: ["photographer_id"]
            isOneToOne: false
            referencedRelation: "photographers"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          date: string
          description: string | null
          id: string
          location: string | null
          name: string
          photographer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          id?: string
          location?: string | null
          name: string
          photographer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          location?: string | null
          name?: string
          photographer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      guests: {
        Row: {
          access_token: string | null
          created_at: string
          email: string
          event_id: string
          id: string
          invited_at: string | null
          name: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          email: string
          event_id: string
          id?: string
          invited_at?: string | null
          name: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          email?: string
          event_id?: string
          id?: string
          invited_at?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "guests_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string | null
          photo_id: string | null
          quantity: number | null
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id?: string | null
          photo_id?: string | null
          quantity?: number | null
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string | null
          photo_id?: string | null
          quantity?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          currency: string | null
          guest_id: string | null
          id: string
          photographer_id: string | null
          status: string | null
          stripe_session_id: string | null
          total_amount: number
        }
        Insert: {
          created_at?: string
          currency?: string | null
          guest_id?: string | null
          id?: string
          photographer_id?: string | null
          status?: string | null
          stripe_session_id?: string | null
          total_amount: number
        }
        Update: {
          created_at?: string
          currency?: string | null
          guest_id?: string | null
          id?: string
          photographer_id?: string | null
          status?: string | null
          stripe_session_id?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
        ]
      }
      photographers: {
        Row: {
          consentimento_lgpd: boolean
          created_at: string
          email: string
          empresa: string | null
          id: string
          ip_consentimento: string | null
          is_active: boolean
          nome: string
          timestamp_consentimento: string | null
          updated_at: string
        }
        Insert: {
          consentimento_lgpd?: boolean
          created_at?: string
          email: string
          empresa?: string | null
          id?: string
          ip_consentimento?: string | null
          is_active?: boolean
          nome: string
          timestamp_consentimento?: string | null
          updated_at?: string
        }
        Update: {
          consentimento_lgpd?: boolean
          created_at?: string
          email?: string
          empresa?: string | null
          id?: string
          ip_consentimento?: string | null
          is_active?: boolean
          nome?: string
          timestamp_consentimento?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      photos: {
        Row: {
          created_at: string
          event_id: string
          id: string
          metadata: Json | null
          storage_path: string
          url: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          metadata?: Json | null
          storage_path: string
          url: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          metadata?: Json | null
          storage_path?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "photos_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      refresh_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          is_revoked: boolean
          photographer_id: string
          token: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          is_revoked?: boolean
          photographer_id: string
          token: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          is_revoked?: boolean
          photographer_id?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "refresh_tokens_photographer_id_fkey"
            columns: ["photographer_id"]
            isOneToOne: false
            referencedRelation: "photographers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_event_by_guest_token: {
        Args: { token: string }
        Returns: {
          event_id: string
          event_name: string
          event_date: string
          event_location: string
          event_description: string
          guest_name: string
        }[]
      }
      get_photos_by_guest_token: {
        Args: { token: string }
        Returns: {
          photo_id: string
          photo_url: string
          photo_created_at: string
        }[]
      }
      set_guest_token: {
        Args: { token: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
