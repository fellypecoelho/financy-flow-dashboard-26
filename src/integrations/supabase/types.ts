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
      aportes: {
        Row: {
          created_at: string | null
          data: string
          descricao: string
          id: string
          investidor_id: string
          updated_at: string | null
          user_id: string
          valor: number
        }
        Insert: {
          created_at?: string | null
          data: string
          descricao: string
          id?: string
          investidor_id: string
          updated_at?: string | null
          user_id: string
          valor: number
        }
        Update: {
          created_at?: string | null
          data?: string
          descricao?: string
          id?: string
          investidor_id?: string
          updated_at?: string | null
          user_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "aportes_investidor_id_fkey"
            columns: ["investidor_id"]
            isOneToOne: false
            referencedRelation: "investidores"
            referencedColumns: ["id"]
          },
        ]
      }
      cartoes: {
        Row: {
          bandeira: string
          created_at: string | null
          dia_fechamento: number
          dia_vencimento: number
          id: string
          investidor_id: string
          limite: number
          nome: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bandeira: string
          created_at?: string | null
          dia_fechamento: number
          dia_vencimento: number
          id?: string
          investidor_id: string
          limite: number
          nome: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bandeira?: string
          created_at?: string | null
          dia_fechamento?: number
          dia_vencimento?: number
          id?: string
          investidor_id?: string
          limite?: number
          nome?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cartoes_investidor_id_fkey"
            columns: ["investidor_id"]
            isOneToOne: false
            referencedRelation: "investidores"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias: {
        Row: {
          cor: string
          created_at: string | null
          icone: string
          id: string
          nome: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cor: string
          created_at?: string | null
          icone: string
          id?: string
          nome: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cor?: string
          created_at?: string | null
          icone?: string
          id?: string
          nome?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      despesas: {
        Row: {
          cartao_id: string | null
          categoria_id: string
          created_at: string | null
          data_compra: string
          data_vencimento: string
          descricao: string
          forma_pagamento: Database["public"]["Enums"]["forma_pagamento"]
          frequencia:
            | Database["public"]["Enums"]["frequencia_recorrente"]
            | null
          id: string
          origem: string
          parcela_atual: number | null
          status: Database["public"]["Enums"]["status_despesa"] | null
          tipo: Database["public"]["Enums"]["tipo_despesa"]
          total_parcelas: number | null
          updated_at: string | null
          user_id: string
          valor: number
        }
        Insert: {
          cartao_id?: string | null
          categoria_id: string
          created_at?: string | null
          data_compra: string
          data_vencimento: string
          descricao: string
          forma_pagamento: Database["public"]["Enums"]["forma_pagamento"]
          frequencia?:
            | Database["public"]["Enums"]["frequencia_recorrente"]
            | null
          id?: string
          origem: string
          parcela_atual?: number | null
          status?: Database["public"]["Enums"]["status_despesa"] | null
          tipo: Database["public"]["Enums"]["tipo_despesa"]
          total_parcelas?: number | null
          updated_at?: string | null
          user_id: string
          valor: number
        }
        Update: {
          cartao_id?: string | null
          categoria_id?: string
          created_at?: string | null
          data_compra?: string
          data_vencimento?: string
          descricao?: string
          forma_pagamento?: Database["public"]["Enums"]["forma_pagamento"]
          frequencia?:
            | Database["public"]["Enums"]["frequencia_recorrente"]
            | null
          id?: string
          origem?: string
          parcela_atual?: number | null
          status?: Database["public"]["Enums"]["status_despesa"] | null
          tipo?: Database["public"]["Enums"]["tipo_despesa"]
          total_parcelas?: number | null
          updated_at?: string | null
          user_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "despesas_cartao_id_fkey"
            columns: ["cartao_id"]
            isOneToOne: false
            referencedRelation: "cartoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "despesas_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      divisao_despesas: {
        Row: {
          created_at: string | null
          despesa_id: string
          id: string
          investidor_id: string
          valor: number
        }
        Insert: {
          created_at?: string | null
          despesa_id: string
          id?: string
          investidor_id: string
          valor: number
        }
        Update: {
          created_at?: string | null
          despesa_id?: string
          id?: string
          investidor_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "divisao_despesas_despesa_id_fkey"
            columns: ["despesa_id"]
            isOneToOne: false
            referencedRelation: "despesas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "divisao_despesas_investidor_id_fkey"
            columns: ["investidor_id"]
            isOneToOne: false
            referencedRelation: "investidores"
            referencedColumns: ["id"]
          },
        ]
      }
      investidores: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          email: string
          id: string
          nome: string
          saldo_atual: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          email: string
          id?: string
          nome: string
          saldo_atual?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          email?: string
          id?: string
          nome?: string
          saldo_atual?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          nome: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          nome: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          nome?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      forma_pagamento: "dinheiro" | "transferencia" | "cartao"
      frequencia_recorrente: "mensal" | "trimestral" | "semestral" | "anual"
      status_despesa: "pendente" | "pago"
      tipo_despesa: "unica" | "recorrente" | "parcelada"
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
    Enums: {
      forma_pagamento: ["dinheiro", "transferencia", "cartao"],
      frequencia_recorrente: ["mensal", "trimestral", "semestral", "anual"],
      status_despesa: ["pendente", "pago"],
      tipo_despesa: ["unica", "recorrente", "parcelada"],
    },
  },
} as const
