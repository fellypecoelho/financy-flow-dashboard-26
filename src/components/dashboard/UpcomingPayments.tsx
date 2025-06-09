
import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { Despesa, Categoria } from '@/types';

interface UpcomingPaymentsProps {
  despesas: Despesa[];
  categorias: Categoria[];
}

const UpcomingPayments = ({ despesas, categorias }: UpcomingPaymentsProps) => {
  const getCategoriaById = (id: string) => categorias.find(cat => cat.id === id);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getDaysUntilDue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Próximos Vencimentos</h3>
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>
      
      {despesas.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum vencimento próximo</p>
        </div>
      ) : (
        <div className="space-y-3">
          {despesas.map((despesa) => {
            const categoria = getCategoriaById(despesa.categoriaId);
            const daysUntilDue = getDaysUntilDue(despesa.dataVencimento);
            
            return (
              <div key={despesa.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: categoria?.cor || '#gray' }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{despesa.descricao}</p>
                    <p className="text-sm text-gray-500">
                      {categoria?.nome} • {formatDate(despesa.dataVencimento)}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    R$ {despesa.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  {daysUntilDue <= 3 && (
                    <div className="flex items-center text-red-600 text-xs mt-1">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {daysUntilDue === 0 ? 'Vence hoje' : 
                       daysUntilDue === 1 ? 'Vence amanhã' : 
                       `${daysUntilDue} dias`}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UpcomingPayments;
