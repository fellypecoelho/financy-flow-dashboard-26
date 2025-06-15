
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Settings,
  Menu,
  X,
  Wallet,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout = ({ children, currentPage, onPageChange }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'despesas', label: 'Despesas', icon: CreditCard },
    { id: 'aportes', label: 'Aportes', icon: TrendingUp },
    { id: 'investidores', label: 'Investidores', icon: Users },
    { id: 'cartoes', label: 'Cartões', icon: Wallet },
    { id: 'calendario', label: 'Calendário', icon: Calendar },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-card rounded-lg shadow-md border border-border"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card shadow-xl border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-semibold text-foreground">
            FinanceControl
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Sistema Financeiro</p>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center px-6 py-3 text-left hover:bg-accent transition-colors border-r-3 border-transparent",
                  currentPage === item.id
                    ? "border-r-primary bg-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-4 text-primary-foreground">
            <p className="text-sm font-medium">Sistema Multi-investidor</p>
            <p className="text-xs opacity-90">Controle financeiro avançado</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        <main className="p-6 pt-16 lg:pt-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
