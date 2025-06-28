-- Criar enum para tipos de lançamento
CREATE TYPE public.tipo_lancamento AS ENUM ('receita', 'despesa');

-- Criar enum para tipos de meta
CREATE TYPE public.tipo_meta AS ENUM ('economia', 'limite');

-- Criar enum para tipos de usuário
CREATE TYPE public.tipo_usuario AS ENUM ('admin', 'investidor');

-- Tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  tipo_usuario tipo_usuario DEFAULT 'investidor',
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de categorias
CREATE TABLE public.categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  cor TEXT NOT NULL,
  icone TEXT NOT NULL,
  tipo tipo_lancamento NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de lançamentos
CREATE TABLE public.lancamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  categoria_id UUID NOT NULL REFERENCES public.categorias(id) ON DELETE RESTRICT,
  titulo TEXT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  data DATE NOT NULL,
  tipo tipo_lancamento NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de metas
CREATE TABLE public.metas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  categoria_id UUID REFERENCES public.categorias(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  tipo tipo_meta NOT NULL,
  mes TEXT NOT NULL, -- formato: YYYY-MM
  valor_atual DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lancamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para categorias (admin pode ver todas, investidor só as próprias)
CREATE POLICY "Admin can view all categorias" ON public.categorias
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.tipo_usuario = 'admin'
    )
  );
CREATE POLICY "Users can view own categorias" ON public.categorias
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin can insert categorias" ON public.categorias
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.tipo_usuario = 'admin'
    )
  );
CREATE POLICY "Admin can update categorias" ON public.categorias
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.tipo_usuario = 'admin'
    )
  );
CREATE POLICY "Admin can delete categorias" ON public.categorias
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.tipo_usuario = 'admin'
    )
  );

-- Políticas RLS para lancamentos (admin pode ver todos, investidor só os próprios)
CREATE POLICY "Admin can view all lancamentos" ON public.lancamentos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.tipo_usuario = 'admin'
    )
  );
CREATE POLICY "Users can view own lancamentos" ON public.lancamentos
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin can insert lancamentos" ON public.lancamentos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.tipo_usuario = 'admin'
    )
  );
CREATE POLICY "Admin can update lancamentos" ON public.lancamentos
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.tipo_usuario = 'admin'
    )
  );
CREATE POLICY "Admin can delete lancamentos" ON public.lancamentos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.tipo_usuario = 'admin'
    )
  );

-- Políticas RLS para metas (admin pode ver todas, investidor só as próprias)
CREATE POLICY "Admin can view all metas" ON public.metas
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.tipo_usuario = 'admin'
    )
  );
CREATE POLICY "Users can view own metas" ON public.metas
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin can insert metas" ON public.metas
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.tipo_usuario = 'admin'
    )
  );
CREATE POLICY "Admin can update metas" ON public.metas
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.tipo_usuario = 'admin'
    )
  );
CREATE POLICY "Admin can delete metas" ON public.metas
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.tipo_usuario = 'admin'
    )
  );

-- Trigger para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, email, tipo_usuario)
  VALUES (new.id, new.raw_user_meta_data->>'nome', new.email, 'investidor');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Índices para performance
CREATE INDEX idx_categorias_user_id ON public.categorias(user_id);
CREATE INDEX idx_lancamentos_user_id ON public.lancamentos(user_id);
CREATE INDEX idx_lancamentos_data ON public.lancamentos(data);
CREATE INDEX idx_lancamentos_tipo ON public.lancamentos(tipo);
CREATE INDEX idx_lancamentos_categoria_id ON public.lancamentos(categoria_id);
CREATE INDEX idx_metas_user_id ON public.metas(user_id);
CREATE INDEX idx_metas_mes ON public.metas(mes);

-- Inserir categorias padrão para novos usuários
CREATE OR REPLACE FUNCTION public.create_default_categories()
RETURNS TRIGGER AS $$
BEGIN
  -- Categorias de receita
  INSERT INTO public.categorias (user_id, nome, cor, icone, tipo) VALUES
    (NEW.id, 'Salário', '#10b981', 'dollar-sign', 'receita'),
    (NEW.id, 'Freelance', '#3b82f6', 'briefcase', 'receita'),
    (NEW.id, 'Investimentos', '#f59e0b', 'trending-up', 'receita'),
    (NEW.id, 'Outros', '#6b7280', 'plus', 'receita');
  
  -- Categorias de despesa
  INSERT INTO public.categorias (user_id, nome, cor, icone, tipo) VALUES
    (NEW.id, 'Alimentação', '#ef4444', 'utensils', 'despesa'),
    (NEW.id, 'Transporte', '#f97316', 'car', 'despesa'),
    (NEW.id, 'Moradia', '#eab308', 'home', 'despesa'),
    (NEW.id, 'Lazer', '#22c55e', 'smile', 'despesa'),
    (NEW.id, 'Saúde', '#3b82f6', 'heart', 'despesa'),
    (NEW.id, 'Educação', '#8b5cf6', 'book-open', 'despesa'),
    (NEW.id, 'Vestuário', '#ec4899', 'shirt', 'despesa'),
    (NEW.id, 'Tecnologia', '#06b6d4', 'smartphone', 'despesa'),
    (NEW.id, 'Outros', '#6b7280', 'minus', 'despesa');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.create_default_categories();

-- Criar usuário admin padrão (você deve alterar o email e senha)
-- INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
-- VALUES (
--   gen_random_uuid(),
--   'admin@financas.com',
--   crypt('admin123', gen_salt('bf')),
--   NOW(),
--   NOW(),
--   NOW(),
--   '{"nome": "Administrador"}'
-- );

-- Função para criar usuário admin via SQL (execute manualmente)
CREATE OR REPLACE FUNCTION public.create_admin_user(
  admin_email TEXT,
  admin_password TEXT,
  admin_nome TEXT
)
RETURNS UUID AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Criar usuário no auth.users
  INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data
  ) VALUES (
    gen_random_uuid(),
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    json_build_object('nome', admin_nome)
  ) RETURNING id INTO user_id;

  -- Criar perfil admin
  INSERT INTO public.profiles (id, nome, email, tipo_usuario)
  VALUES (user_id, admin_nome, admin_email, 'admin');

  RETURN user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
