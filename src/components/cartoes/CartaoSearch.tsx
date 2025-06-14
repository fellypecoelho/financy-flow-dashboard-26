
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Investidor } from '@/types';
import CartaoFilters from './CartaoFilters';

interface CartaoSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: {
    investidor: string;
    bandeira: string;
  };
  onFiltersChange: (filters: { investidor: string; bandeira: string }) => void;
  investidores: Investidor[];
}

const CartaoSearch = ({ 
  searchTerm, 
  onSearchChange, 
  filters, 
  onFiltersChange, 
  investidores 
}: CartaoSearchProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nome do cartão ou bandeira..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <CartaoFilters 
            filters={filters}
            onFiltersChange={onFiltersChange}
            investidores={investidores}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CartaoSearch;
