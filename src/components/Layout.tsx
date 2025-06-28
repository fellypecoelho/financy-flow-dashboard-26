import React from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  Target,
  BarChart3,
  Settings,
  LogOut,
  Users
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfiles } from '@/hooks/useProfiles';
import { Button } from '@/components/ui/button';
import FirstLoginModal from '@/components/auth/FirstLoginModal';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout = ({ children, currentPage, onPageChange }: LayoutProps) => {
  const { signOut, user, isAdmin } = useAuth();
  const { currentProfile } = useProfiles();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'lancamentos', label: 'Lançamentos', icon: Receipt },
    { id: 'metas', label: 'Metas', icon: Target },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    ...(isAdmin ? [{ id: 'usuarios', label: 'Usuários', icon: Users }] : []),
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <>
      <FirstLoginModal />
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border flex flex-col">
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-foreground">
              Finanças Pessoais
            </h1>
            {user && currentProfile && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">
                  {currentProfile.nome}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isAdmin ? 'Administrador' : 'Investidor'}
                </p>
              </div>
            )}
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onPageChange(item.id)}
                      className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${
                        currentPage === item.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-border">
            <Button
              onClick={signOut}
              variant="outline"
              className="w-full"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
