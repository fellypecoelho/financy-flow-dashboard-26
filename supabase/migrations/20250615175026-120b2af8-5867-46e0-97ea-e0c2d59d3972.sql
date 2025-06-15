
-- Remover políticas existentes se existirem
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Adicionar campos para controle de usuários administrativos vs investidores
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS tipo_usuario text DEFAULT 'investidor' CHECK (tipo_usuario IN ('admin', 'investidor'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS senha_temporaria boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS primeiro_login boolean DEFAULT true;

-- Criar índice para busca por tipo de usuário (se não existir)
CREATE INDEX IF NOT EXISTS idx_profiles_tipo_usuario ON public.profiles(tipo_usuario);

-- Atualizar a função handle_new_user para incluir os novos campos
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, nome, email, tipo_usuario, senha_temporaria, primeiro_login)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', NEW.email),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'tipo_usuario', 'investidor'),
    COALESCE((NEW.raw_user_meta_data->>'senha_temporaria')::boolean, false),
    true
  );
  RETURN NEW;
END;
$function$;

-- Permitir que usuários vejam e atualizem seu próprio perfil
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Permitir que admins vejam e gerenciem todos os perfis
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND tipo_usuario = 'admin'
    )
  );

CREATE POLICY "Admins can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND tipo_usuario = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND tipo_usuario = 'admin'
    )
  );
