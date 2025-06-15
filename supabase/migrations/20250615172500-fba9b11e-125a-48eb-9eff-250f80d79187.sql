
-- Criar enum para tipos de despesa
CREATE TYPE public.tipo_despesa AS ENUM ('unica', 'recorrente', 'parcelada');

-- Criar enum para status de despesa
CREATE TYPE public.status_despesa AS ENUM ('pendente', 'pago');

-- Criar enum para forma de pagamento
CREATE TYPE public.forma_pagamento AS ENUM ('dinheiro', 'transferencia', 'cartao');

-- Criar enum para frequência recorrente
CREATE TYPE public.frequencia_recorrente AS ENUM ('mensal', 'trimestral', 'semestral', 'anual');

-- Tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de investidores
CREATE TABLE public.investidores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  ativo BOOLEAN DEFAULT true,
  saldo_atual DECIMAL(10,2) DEFAULT 0,
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de cartões
CREATE TABLE public.cartoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  investidor_id UUID NOT NULL REFERENCES public.investidores(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  bandeira TEXT NOT NULL,
  limite DECIMAL(10,2) NOT NULL,
  dia_fechamento INTEGER NOT NULL CHECK (dia_fechamento >= 1 AND dia_fechamento <= 31),
  dia_vencimento INTEGER NOT NULL CHECK (dia_vencimento >= 1 AND dia_vencimento <= 31),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de despesas
CREATE TABLE public.despesas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  categoria_id UUID NOT NULL REFERENCES public.categorias(id) ON DELETE RESTRICT,
  cartao_id UUID REFERENCES public.cartoes(id) ON DELETE SET NULL,
  descricao TEXT NOT NULL,
  origem TEXT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  data_compra DATE NOT NULL,
  data_vencimento DATE NOT NULL,
  forma_pagamento forma_pagamento NOT NULL,
  status status_despesa DEFAULT 'pendente',
  tipo tipo_despesa NOT NULL,
  frequencia frequencia_recorrente,
  total_parcelas INTEGER,
  parcela_atual INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de divisão de despesas entre investidores
CREATE TABLE public.divisao_despesas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  despesa_id UUID NOT NULL REFERENCES public.despesas(id) ON DELETE CASCADE,
  investidor_id UUID NOT NULL REFERENCES public.investidores(id) ON DELETE CASCADE,
  valor DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(despesa_id, investidor_id)
);

-- Tabela de aportes
CREATE TABLE public.aportes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  investidor_id UUID NOT NULL REFERENCES public.investidores(id) ON DELETE CASCADE,
  valor DECIMAL(10,2) NOT NULL,
  data DATE NOT NULL,
  descricao TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investidores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cartoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.despesas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.divisao_despesas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aportes ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para investidores
CREATE POLICY "Users can view own investidores" ON public.investidores
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own investidores" ON public.investidores
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own investidores" ON public.investidores
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own investidores" ON public.investidores
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para categorias
CREATE POLICY "Users can view own categorias" ON public.categorias
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own categorias" ON public.categorias
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own categorias" ON public.categorias
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own categorias" ON public.categorias
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para cartoes
CREATE POLICY "Users can view own cartoes" ON public.cartoes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cartoes" ON public.cartoes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cartoes" ON public.cartoes
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cartoes" ON public.cartoes
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para despesas
CREATE POLICY "Users can view own despesas" ON public.despesas
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own despesas" ON public.despesas
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own despesas" ON public.despesas
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own despesas" ON public.despesas
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para divisao_despesas (baseada na despesa)
CREATE POLICY "Users can view own divisao_despesas" ON public.divisao_despesas
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.despesas 
    WHERE despesas.id = divisao_despesas.despesa_id 
    AND despesas.user_id = auth.uid()
  ));
CREATE POLICY "Users can insert own divisao_despesas" ON public.divisao_despesas
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.despesas 
    WHERE despesas.id = divisao_despesas.despesa_id 
    AND despesas.user_id = auth.uid()
  ));
CREATE POLICY "Users can update own divisao_despesas" ON public.divisao_despesas
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.despesas 
    WHERE despesas.id = divisao_despesas.despesa_id 
    AND despesas.user_id = auth.uid()
  ));
CREATE POLICY "Users can delete own divisao_despesas" ON public.divisao_despesas
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM public.despesas 
    WHERE despesas.id = divisao_despesas.despesa_id 
    AND despesas.user_id = auth.uid()
  ));

-- Políticas RLS para aportes
CREATE POLICY "Users can view own aportes" ON public.aportes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own aportes" ON public.aportes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own aportes" ON public.aportes
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own aportes" ON public.aportes
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Índices para performance
CREATE INDEX idx_investidores_user_id ON public.investidores(user_id);
CREATE INDEX idx_categorias_user_id ON public.categorias(user_id);
CREATE INDEX idx_cartoes_user_id ON public.cartoes(user_id);
CREATE INDEX idx_cartoes_investidor_id ON public.cartoes(investidor_id);
CREATE INDEX idx_despesas_user_id ON public.despesas(user_id);
CREATE INDEX idx_despesas_categoria_id ON public.despesas(categoria_id);
CREATE INDEX idx_despesas_cartao_id ON public.despesas(cartao_id);
CREATE INDEX idx_divisao_despesas_despesa_id ON public.divisao_despesas(despesa_id);
CREATE INDEX idx_divisao_despesas_investidor_id ON public.divisao_despesas(investidor_id);
CREATE INDEX idx_aportes_user_id ON public.aportes(user_id);
CREATE INDEX idx_aportes_investidor_id ON public.aportes(investidor_id);
