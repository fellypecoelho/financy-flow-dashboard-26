# Configuração do Supabase

Este guia detalha como configurar o Supabase para o sistema de controle financeiro.

## 🚀 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Escolha sua organização
5. Digite um nome para o projeto (ex: "financy-flow")
6. Escolha uma senha forte para o banco de dados
7. Escolha uma região próxima
8. Clique em "Create new project"

### 2. Configurar Variáveis de Ambiente

Após criar o projeto, você receberá as credenciais. Configure no arquivo `.env.local`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

### 3. Executar Migrações

1. No painel do Supabase, vá para **SQL Editor**
2. Clique em **New query**
3. Cole o conteúdo do arquivo `supabase/migrations/20250615172500-fba9b11e-125a-48eb-9eff-250f80d79187.sql`
4. Clique em **Run** para executar

### 4. Criar Usuário Administrador

Após executar as migrações, execute este SQL para criar o primeiro admin:

```sql
SELECT public.create_admin_user(
  'admin@financas.com',  -- Altere para seu email
  'admin123',            -- Altere para uma senha segura
  'Administrador'        -- Altere para seu nome
);
```

**⚠️ IMPORTANTE**: 
- Use um email válido
- Use uma senha forte (mínimo 6 caracteres)
- Guarde essas credenciais com segurança

### 5. Verificar Configuração

Execute este SQL para verificar se tudo foi criado corretamente:

```sql
-- Verificar se o admin foi criado
SELECT * FROM public.profiles WHERE tipo_usuario = 'admin';

-- Verificar se as categorias padrão foram criadas
SELECT * FROM public.categorias;

-- Verificar as políticas RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';
```

## 🗄️ Estrutura do Banco

### Tabelas Criadas

1. **profiles** - Perfis dos usuários
   - `id` (UUID, PK) - ID do usuário
   - `nome` (TEXT) - Nome completo
   - `email` (TEXT) - Email do usuário
   - `tipo_usuario` (ENUM) - 'admin' ou 'investidor'
   - `ativo` (BOOLEAN) - Status do usuário
   - `created_at` (TIMESTAMP) - Data de criação
   - `updated_at` (TIMESTAMP) - Data de atualização

2. **categorias** - Categorias de lançamentos
   - `id` (UUID, PK) - ID da categoria
   - `user_id` (UUID, FK) - ID do usuário
   - `nome` (TEXT) - Nome da categoria
   - `cor` (TEXT) - Cor da categoria
   - `icone` (TEXT) - Ícone da categoria
   - `tipo` (ENUM) - 'receita' ou 'despesa'

3. **lancamentos** - Lançamentos financeiros
   - `id` (UUID, PK) - ID do lançamento
   - `user_id` (UUID, FK) - ID do usuário
   - `categoria_id` (UUID, FK) - ID da categoria
   - `titulo` (TEXT) - Título do lançamento
   - `valor` (DECIMAL) - Valor do lançamento
   - `data` (DATE) - Data do lançamento
   - `tipo` (ENUM) - 'receita' ou 'despesa'
   - `descricao` (TEXT) - Descrição opcional

4. **metas** - Metas financeiras
   - `id` (UUID, PK) - ID da meta
   - `user_id` (UUID, FK) - ID do usuário
   - `categoria_id` (UUID, FK) - ID da categoria (opcional)
   - `titulo` (TEXT) - Título da meta
   - `valor` (DECIMAL) - Valor da meta
   - `tipo` (ENUM) - 'economia' ou 'limite'
   - `mes` (TEXT) - Mês da meta (YYYY-MM)
   - `valor_atual` (DECIMAL) - Valor atual

### Políticas de Segurança (RLS)

O sistema implementa Row Level Security com as seguintes políticas:

#### Para Administradores
- **Visualização**: Podem ver todos os dados de todos os usuários
- **Inserção**: Podem criar categorias, lançamentos e metas
- **Atualização**: Podem editar qualquer registro
- **Exclusão**: Podem excluir qualquer registro

#### Para Investidores
- **Visualização**: Podem ver apenas seus próprios dados
- **Inserção**: Não permitido
- **Atualização**: Não permitido
- **Exclusão**: Não permitido

## 🔧 Funções SQL Criadas

### 1. `handle_new_user()`
- **Propósito**: Criar perfil automaticamente quando usuário se registra
- **Trigger**: Executada após inserção em `auth.users`
- **Ação**: Cria perfil com tipo 'investidor' por padrão

### 2. `create_default_categories()`
- **Propósito**: Criar categorias padrão para novos usuários
- **Trigger**: Executada após inserção em `profiles`
- **Ação**: Cria 13 categorias padrão (4 receitas + 9 despesas)

### 3. `create_admin_user()`
- **Propósito**: Criar usuário administrador
- **Parâmetros**: email, senha, nome
- **Retorno**: ID do usuário criado
- **Uso**: Executar manualmente para criar o primeiro admin

## 🛡️ Segurança

### Autenticação
- Supabase Auth com email/senha
- Confirmação de email automática
- Senhas criptografadas com bcrypt

### Autorização
- Row Level Security (RLS) ativo em todas as tabelas
- Políticas baseadas no tipo de usuário
- Verificação de permissões em cada operação

### Dados
- UUIDs como chaves primárias
- Timestamps automáticos
- Relacionamentos com foreign keys
- Índices para performance

## 🔍 Troubleshooting

### Problema: "Error: function create_admin_user does not exist"
**Solução**: Execute as migrações primeiro

### Problema: "Error: permission denied"
**Solução**: Verifique se as políticas RLS estão ativas

### Problema: "Error: invalid input syntax for type uuid"
**Solução**: Verifique se os UUIDs estão no formato correto

### Problema: Usuário não consegue fazer login
**Solução**: 
1. Verifique se o email foi confirmado
2. Verifique se o usuário está ativo na tabela profiles
3. Verifique se as credenciais estão corretas

## 📊 Monitoramento

### Logs
- Acesse **Logs** no painel do Supabase
- Monitore erros de autenticação
- Verifique queries lentas

### Métricas
- **Database**: Monitore uso de CPU e memória
- **Auth**: Acompanhe logins e registros
- **Storage**: Verifique uso de armazenamento

## 🔄 Backup

### Backup Automático
- Supabase faz backup automático diário
- Retenção de 7 dias para projetos gratuitos
- Retenção de 30 dias para projetos pagos

### Backup Manual
```sql
-- Exportar dados (via pg_dump)
pg_dump "postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres" > backup.sql
```

## 🚀 Próximos Passos

Após configurar o Supabase:

1. **Teste o Login**: Use as credenciais do admin
2. **Crie Usuários**: Use o painel de usuários para criar investidores
3. **Configure Categorias**: Personalize as categorias se necessário
4. **Monitore**: Acompanhe logs e métricas
5. **Backup**: Configure backup regular se necessário

---

**Configuração concluída! 🎉** 