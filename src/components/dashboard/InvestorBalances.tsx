
import React from 'react';
import { User } from 'lucide-react';
import { Investidor } from '@/types';

interface InvestorBalancesProps {
  investidores: Investidor[];
}

const InvestorBalances = ({ investidores }: InvestorBalancesProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Saldos dos Investidores</h3>
        <User className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {investidores.map((investidor) => (
          <div key={investidor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {investidor.nome.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{investidor.nome}</p>
                <p className="text-sm text-gray-500">{investidor.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                R$ {investidor.saldo_atual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                investidor.ativo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {investidor.ativo ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestorBalances;
