
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Profile {
  id: string;
  nome: string;
  email: string;
  tipo_usuario: 'admin' | 'investidor';
  senha_temporaria: boolean;
  primeiro_login: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useProfiles = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Buscar perfil do usuário atual
  const { data: currentProfile, isLoading: currentProfileLoading } = useQuery({
    queryKey: ['current-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  // Buscar todos os perfis (apenas para admin)
  const { data: profiles = [], isLoading: profilesLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Profile[];
    },
    enabled: currentProfile?.tipo_usuario === 'admin',
  });

  // Criar usuário investidor
  const createInvestor = useMutation({
    mutationFn: async ({ nome, email, senhaTemporaria }: { 
      nome: string; 
      email: string; 
      senhaTemporaria: string; 
    }) => {
      // Criar usuário no Supabase Auth
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password: senhaTemporaria,
        email_confirm: true,
        user_metadata: {
          nome,
          tipo_usuario: 'investidor',
          senha_temporaria: true
        }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Investidor criado!",
        description: "O investidor foi cadastrado com sucesso."
      });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar investidor",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Atualizar senha (primeiro login)
  const updatePassword = useMutation({
    mutationFn: async (newPassword: string) => {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      // Atualizar perfil para marcar que não é mais primeiro login
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            primeiro_login: false,
            senha_temporaria: false 
          })
          .eq('id', user.id);

        if (profileError) throw profileError;
      }
    },
    onSuccess: () => {
      toast({
        title: "Senha atualizada!",
        description: "Sua senha foi alterada com sucesso."
      });
      queryClient.invalidateQueries({ queryKey: ['current-profile'] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar senha",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Deletar usuário (apenas admin)
  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Usuário deletado!",
        description: "O usuário foi removido com sucesso."
      });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao deletar usuário",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return {
    currentProfile,
    currentProfileLoading,
    profiles,
    profilesLoading,
    createInvestor,
    updatePassword,
    deleteUser,
    isAdmin: currentProfile?.tipo_usuario === 'admin',
    isFirstLogin: currentProfile?.primeiro_login && currentProfile?.senha_temporaria
  };
};
