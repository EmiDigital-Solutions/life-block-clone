export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      audit_checkpoints: {
        Row: {
          audit_id: string
          category: string
          created_at: string
          id: string
          notes: string | null
          order_index: number | null
          question: string
          score: number | null
          status: string
        }
        Insert: {
          audit_id: string
          category: string
          created_at?: string
          id?: string
          notes?: string | null
          order_index?: number | null
          question: string
          score?: number | null
          status?: string
        }
        Update: {
          audit_id?: string
          category?: string
          created_at?: string
          id?: string
          notes?: string | null
          order_index?: number | null
          question?: string
          score?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_checkpoints_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_evidence: {
        Row: {
          ai_analysis: string | null
          audit_id: string
          captured_at: string | null
          checkpoint_id: string | null
          created_at: string
          description: string | null
          file_name: string
          file_path: string
          finding_id: string | null
          geo_lat: number | null
          geo_lng: number | null
          id: string
          mime_type: string | null
          uploaded_by: string | null
        }
        Insert: {
          ai_analysis?: string | null
          audit_id: string
          captured_at?: string | null
          checkpoint_id?: string | null
          created_at?: string
          description?: string | null
          file_name: string
          file_path: string
          finding_id?: string | null
          geo_lat?: number | null
          geo_lng?: number | null
          id?: string
          mime_type?: string | null
          uploaded_by?: string | null
        }
        Update: {
          ai_analysis?: string | null
          audit_id?: string
          captured_at?: string | null
          checkpoint_id?: string | null
          created_at?: string
          description?: string | null
          file_name?: string
          file_path?: string
          finding_id?: string | null
          geo_lat?: number | null
          geo_lng?: number | null
          id?: string
          mime_type?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_evidence_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_evidence_checkpoint_id_fkey"
            columns: ["checkpoint_id"]
            isOneToOne: false
            referencedRelation: "audit_checkpoints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_evidence_finding_id_fkey"
            columns: ["finding_id"]
            isOneToOne: false
            referencedRelation: "audit_findings"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_findings: {
        Row: {
          ai_recommendation: string | null
          audit_id: string
          checkpoint_id: string | null
          created_at: string
          description: string | null
          evidence_notes: string | null
          id: string
          severity: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          ai_recommendation?: string | null
          audit_id: string
          checkpoint_id?: string | null
          created_at?: string
          description?: string | null
          evidence_notes?: string | null
          id?: string
          severity?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          ai_recommendation?: string | null
          audit_id?: string
          checkpoint_id?: string | null
          created_at?: string
          description?: string | null
          evidence_notes?: string | null
          id?: string
          severity?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_findings_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_findings_checkpoint_id_fkey"
            columns: ["checkpoint_id"]
            isOneToOne: false
            referencedRelation: "audit_checkpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_reports: {
        Row: {
          audit_date: string | null
          audit_id: string
          auditor_name: string | null
          client_logo_url: string | null
          client_name: string
          cost_exposure_eur: number | null
          created_at: string
          executive_summary: Json
          iatf_score: number | null
          id: string
          meta: Json | null
          mitigation_savings_eur: number | null
          report_version: number
          standard: string
          status: string
          supplier_location: string | null
          supplier_name: string
          updated_at: string
          verdict: string
        }
        Insert: {
          audit_date?: string | null
          audit_id: string
          auditor_name?: string | null
          client_logo_url?: string | null
          client_name?: string
          cost_exposure_eur?: number | null
          created_at?: string
          executive_summary?: Json
          iatf_score?: number | null
          id?: string
          meta?: Json | null
          mitigation_savings_eur?: number | null
          report_version?: number
          standard?: string
          status?: string
          supplier_location?: string | null
          supplier_name?: string
          updated_at?: string
          verdict?: string
        }
        Update: {
          audit_date?: string | null
          audit_id?: string
          auditor_name?: string | null
          client_logo_url?: string | null
          client_name?: string
          cost_exposure_eur?: number | null
          created_at?: string
          executive_summary?: Json
          iatf_score?: number | null
          id?: string
          meta?: Json | null
          mitigation_savings_eur?: number | null
          report_version?: number
          standard?: string
          status?: string
          supplier_location?: string | null
          supplier_name?: string
          updated_at?: string
          verdict?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_reports_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
        ]
      }
      audits: {
        Row: {
          ai_analysis: string | null
          audit_type: string
          auditor_id: string | null
          completed_date: string | null
          created_at: string
          id: string
          overall_score: number | null
          requested_by: string | null
          scheduled_date: string | null
          standard: string | null
          status: string
          summary: string | null
          supplier_id: string
          updated_at: string
        }
        Insert: {
          ai_analysis?: string | null
          audit_type?: string
          auditor_id?: string | null
          completed_date?: string | null
          created_at?: string
          id?: string
          overall_score?: number | null
          requested_by?: string | null
          scheduled_date?: string | null
          standard?: string | null
          status?: string
          summary?: string | null
          supplier_id: string
          updated_at?: string
        }
        Update: {
          ai_analysis?: string | null
          audit_type?: string
          auditor_id?: string | null
          completed_date?: string | null
          created_at?: string
          id?: string
          overall_score?: number | null
          requested_by?: string | null
          scheduled_date?: string | null
          standard?: string | null
          status?: string
          summary?: string | null
          supplier_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audits_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      capa_actions: {
        Row: {
          audit_id: string
          completed_at: string | null
          completion_notes: string | null
          created_at: string
          description: string | null
          due_date: string | null
          finding_id: string
          id: string
          responsible_user_id: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          audit_id: string
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          finding_id: string
          id?: string
          responsible_user_id?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          audit_id?: string
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          finding_id?: string
          id?: string
          responsible_user_id?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "capa_actions_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "capa_actions_finding_id_fkey"
            columns: ["finding_id"]
            isOneToOne: false
            referencedRelation: "audit_findings"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          source: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          source?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          source?: string | null
        }
        Relationships: []
      }
      content: {
        Row: {
          body: Json
          created_at: string | null
          created_by: string
          id: string
          meta_data: Json | null
          order_index: number | null
          slug: string
          status: Database["public"]["Enums"]["content_status"] | null
          title: string
          type: Database["public"]["Enums"]["content_type"]
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          body?: Json
          created_at?: string | null
          created_by: string
          id?: string
          meta_data?: Json | null
          order_index?: number | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"] | null
          title: string
          type: Database["public"]["Enums"]["content_type"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          body?: Json
          created_at?: string | null
          created_by?: string
          id?: string
          meta_data?: Json | null
          order_index?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"] | null
          title?: string
          type?: Database["public"]["Enums"]["content_type"]
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      content_media: {
        Row: {
          content_id: string
          created_at: string | null
          id: string
          media_id: string
          position: number | null
          role: string | null
        }
        Insert: {
          content_id: string
          created_at?: string | null
          id?: string
          media_id: string
          position?: number | null
          role?: string | null
        }
        Update: {
          content_id?: string
          created_at?: string | null
          id?: string
          media_id?: string
          position?: number | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_media_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_media_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          alt_text: string | null
          caption: string | null
          filename: string
          height: number | null
          id: string
          metadata: Json | null
          mime_type: string
          original_filename: string
          size_bytes: number
          storage_path: string
          tags: string[] | null
          uploaded_at: string | null
          uploaded_by: string
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          filename: string
          height?: number | null
          id?: string
          metadata?: Json | null
          mime_type: string
          original_filename: string
          size_bytes: number
          storage_path: string
          tags?: string[] | null
          uploaded_at?: string | null
          uploaded_by: string
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          filename?: string
          height?: number | null
          id?: string
          metadata?: Json | null
          mime_type?: string
          original_filename?: string
          size_bytes?: number
          storage_path?: string
          tags?: string[] | null
          uploaded_at?: string | null
          uploaded_by?: string
          width?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          full_name: string
          id: string
          phone: string | null
          role_type: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          full_name?: string
          id: string
          phone?: string | null
          role_type?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          role_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      report_machines: {
        Row: {
          atlas_insight: string | null
          availability: number | null
          capabilities: string[] | null
          category: string | null
          client_suitability: string | null
          co2_per_year: number | null
          condition: string | null
          condition_score: number | null
          created_at: string
          energy_class: string | null
          energy_kwh: number | null
          id: string
          last_maintenance: string | null
          location: string | null
          machine_code: string
          manufacturer: string
          meta: Json | null
          model: string
          next_maintenance: string | null
          oee: number | null
          origin_country: string | null
          origin_tier: string | null
          performance: number | null
          quality: number | null
          report_id: string
          risks: string[] | null
          serial_number: string | null
          specs: Json
          suitability_reason: string | null
          type_plate_image_url: string | null
          updated_at: string
          year_manufactured: number | null
        }
        Insert: {
          atlas_insight?: string | null
          availability?: number | null
          capabilities?: string[] | null
          category?: string | null
          client_suitability?: string | null
          co2_per_year?: number | null
          condition?: string | null
          condition_score?: number | null
          created_at?: string
          energy_class?: string | null
          energy_kwh?: number | null
          id?: string
          last_maintenance?: string | null
          location?: string | null
          machine_code: string
          manufacturer: string
          meta?: Json | null
          model: string
          next_maintenance?: string | null
          oee?: number | null
          origin_country?: string | null
          origin_tier?: string | null
          performance?: number | null
          quality?: number | null
          report_id: string
          risks?: string[] | null
          serial_number?: string | null
          specs?: Json
          suitability_reason?: string | null
          type_plate_image_url?: string | null
          updated_at?: string
          year_manufactured?: number | null
        }
        Update: {
          atlas_insight?: string | null
          availability?: number | null
          capabilities?: string[] | null
          category?: string | null
          client_suitability?: string | null
          co2_per_year?: number | null
          condition?: string | null
          condition_score?: number | null
          created_at?: string
          energy_class?: string | null
          energy_kwh?: number | null
          id?: string
          last_maintenance?: string | null
          location?: string | null
          machine_code?: string
          manufacturer?: string
          meta?: Json | null
          model?: string
          next_maintenance?: string | null
          oee?: number | null
          origin_country?: string | null
          origin_tier?: string | null
          performance?: number | null
          quality?: number | null
          report_id?: string
          risks?: string[] | null
          serial_number?: string | null
          specs?: Json
          suitability_reason?: string | null
          type_plate_image_url?: string | null
          updated_at?: string
          year_manufactured?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "report_machines_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "audit_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_ncrs: {
        Row: {
          created_at: string
          deadline: string | null
          description: string | null
          evidence_refs: Json | null
          id: string
          iso_clause: string | null
          meta: Json | null
          ncr_code: string
          report_id: string
          severity: string
          station_id: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deadline?: string | null
          description?: string | null
          evidence_refs?: Json | null
          id?: string
          iso_clause?: string | null
          meta?: Json | null
          ncr_code: string
          report_id: string
          severity?: string
          station_id?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deadline?: string | null
          description?: string | null
          evidence_refs?: Json | null
          id?: string
          iso_clause?: string | null
          meta?: Json | null
          ncr_code?: string
          report_id?: string
          severity?: string
          station_id?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_ncrs_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "audit_reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "report_ncrs_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "report_stations"
            referencedColumns: ["id"]
          },
        ]
      }
      report_radar_scores: {
        Row: {
          actual_score: number
          benchmark_score: number | null
          chart_type: string
          created_at: string
          dimension_key: string
          dimension_label: string
          id: string
          max_score: number
          meta: Json | null
          report_id: string
          sort_order: number | null
        }
        Insert: {
          actual_score?: number
          benchmark_score?: number | null
          chart_type: string
          created_at?: string
          dimension_key: string
          dimension_label: string
          id?: string
          max_score?: number
          meta?: Json | null
          report_id: string
          sort_order?: number | null
        }
        Update: {
          actual_score?: number
          benchmark_score?: number | null
          chart_type?: string
          created_at?: string
          dimension_key?: string
          dimension_label?: string
          id?: string
          max_score?: number
          meta?: Json | null
          report_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "report_radar_scores_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "audit_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      report_stations: {
        Row: {
          atlas_insights: Json
          audit_questions: Json
          confidence: number | null
          created_at: string
          evidence_measurements: number | null
          evidence_photos: number | null
          evidence_videos: number | null
          findings: Json
          health: string
          hero_photo_url: string | null
          id: string
          interpretation: string | null
          meta: Json | null
          name: string
          observation: string | null
          report_id: string
          station_index: number
          sub_categories: Json
          updated_at: string
        }
        Insert: {
          atlas_insights?: Json
          audit_questions?: Json
          confidence?: number | null
          created_at?: string
          evidence_measurements?: number | null
          evidence_photos?: number | null
          evidence_videos?: number | null
          findings?: Json
          health?: string
          hero_photo_url?: string | null
          id?: string
          interpretation?: string | null
          meta?: Json | null
          name: string
          observation?: string | null
          report_id: string
          station_index?: number
          sub_categories?: Json
          updated_at?: string
        }
        Update: {
          atlas_insights?: Json
          audit_questions?: Json
          confidence?: number | null
          created_at?: string
          evidence_measurements?: number | null
          evidence_photos?: number | null
          evidence_videos?: number | null
          findings?: Json
          health?: string
          hero_photo_url?: string | null
          id?: string
          interpretation?: string | null
          meta?: Json | null
          name?: string
          observation?: string | null
          report_id?: string
          station_index?: number
          sub_categories?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_stations_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "audit_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          certifications: string[] | null
          city: string | null
          contact_email: string | null
          country: string | null
          created_at: string
          description: string | null
          employee_count: number | null
          id: string
          industry: string | null
          name: string
          oib: string | null
          revenue_eur: number | null
          sub_industry: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          certifications?: string[] | null
          city?: string | null
          contact_email?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          employee_count?: number | null
          id?: string
          industry?: string | null
          name: string
          oib?: string | null
          revenue_eur?: number | null
          sub_industry?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          certifications?: string[] | null
          city?: string | null
          contact_email?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          employee_count?: number | null
          id?: string
          industry?: string | null
          name?: string
          oib?: string | null
          revenue_eur?: number | null
          sub_industry?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_manage_content: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "viewer"
      content_status: "draft" | "published" | "archived"
      content_type:
        | "hero_section"
        | "feature_card"
        | "testimonial"
        | "page_section"
        | "project"
        | "hero_content"
        | "auditor_card"
        | "full_screen_section"
        | "feature_photo"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "viewer"],
      content_status: ["draft", "published", "archived"],
      content_type: [
        "hero_section",
        "feature_card",
        "testimonial",
        "page_section",
        "project",
        "hero_content",
        "auditor_card",
        "full_screen_section",
        "feature_photo",
      ],
    },
  },
} as const
