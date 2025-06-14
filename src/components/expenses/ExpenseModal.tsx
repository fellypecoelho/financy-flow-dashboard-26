import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Despesa, Categoria, Cartao, Investidor, TipoDespesa, FormaPagamento, FrequenciaRecorrente, StatusDespesa } from '@/types';
import CategoryIcon from '@/components/ui/CategoryIcon';

interface ExpenseModalProps {
  expense: Despesa | null;
  categorias: Categoria[];
  cartoes: Cartao[];
  investidores: Investidor[];
  onSave: (expense: Despesa) => void;
  onClose: () => void;
}

const ExpenseModal = ({ expense, categorias, cartoes, investidores, onSave, onClose }: ExpenseModalProps) => {
  const [formData, setFormData] = useState({
    descricao: '',
    origem: '',
    categoriaId: '',
    valor: '',
    dataCompra: '',
    dataVencimento: '',
    formaPagamento: 'dinheiro' as FormaPagamento,
    status: 'pendente' as StatusDespesa,
    tipo: 'unica' as TipoDespesa,
    cartaoId: '',
    frequencia: 'mensal' as FrequenciaRecorrente,
    totalParcelas: '',
    parcelaAtual: '1'
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        descricao: expense.descricao,
        origem: expense.origem,
        categoriaId: expense.categoriaId,
        valor: expense.valor.toString(),
        dataCompra: expense.dataCompra,
        dataVencimento: expense.dataVencimento,
        formaPagamento: expense.formaPagamento,
        status: expense.status,
        tipo: expense.tipo,
        cartaoId: expense.cartaoId || '',
        frequencia: expense.frequencia || 'mensal',
        totalParcelas: expense.totalParcelas?.toString() || '',
        parcelaAtual: expense.parcelaAtual?.toString() || '1'
      });
    }
  }, [expense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calcular divisão automática entre investidores ativos
    const investidoresAtivos = investidores.filter(inv => inv.ativo);
    const valorPorInvestidor = parseFloat(formData.valor) / investidoresAtivos.length;
    
    const divisaoInvestidores = investidoresAtivos.map(inv => ({
      investidorId: inv.id,
      valor: valorPorInvestidor
    }));

    const despesaData: Despesa = {
      id: expense?.id || '',
      descricao: formData.descricao,
      origem: formData.origem,
      categoriaId: formData.categoriaId,
      valor: parseFloat(formData.valor),
      dataCompra: formData.dataCompra,
      dataVencimento: formData.dataVencimento,
      formaPagamento: formData.formaPagamento,
      status: formData.status,
      tipo: formData.tipo,
      cartaoId: formData.formaPagamento === 'cartao' ? formData.cartaoId : undefined,
      frequencia: formData.tipo === 'recorrente' ? formData.frequencia : undefined,
      totalParcelas: formData.tipo === 'parcelada' ? parseInt(formData.totalParcelas) : undefined,
      parcelaAtual: formData.tipo === 'parcelada' ? parseInt(formData.parcelaAtual) : undefined,
      divisaoInvestidores
    };

    onSave(despesaData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {expense ? 'Editar Despesa' : 'Nova Despesa'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <input
                type="text"
                required
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origem</label>
              <input
                type="text"
                required
                value={formData.origem}
                onChange={(e) => setFormData({...formData, origem: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select
                required
                value={formData.categoriaId}
                onChange={(e) => setFormData({...formData, categoriaId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
              {formData.categoriaId && (
                <div className="mt-2 flex items-center space-x-2">
                  <CategoryIcon 
                    iconName={categorias.find(c => c.id === formData.categoriaId)?.icone || 'Tag'} 
                    size={16} 
                    style={{ color: categorias.find(c => c.id === formData.categoriaId)?.cor }} 
                  />
                  <span className="text-sm text-gray-600">
                    {categorias.find(c => c.id === formData.categoriaId)?.nome}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.valor}
                onChange={(e) => setFormData({...formData, valor: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data da Compra</label>
              <input
                type="date"
                required
                value={formData.dataCompra}
                onChange={(e) => setFormData({...formData, dataCompra: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Vencimento</label>
              <input
                type="date"
                required
                value={formData.dataVencimento}
                onChange={(e) => setFormData({...formData, dataVencimento: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Forma de Pagamento</label>
              <select
                value={formData.formaPagamento}
                onChange={(e) => setFormData({...formData, formaPagamento: e.target.value as FormaPagamento})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="dinheiro">Dinheiro</option>
                <option value="transferencia">Transferência</option>
                <option value="cartao">Cartão</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as StatusDespesa})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pendente">Pendente</option>
                <option value="pago">Pago</option>
              </select>
            </div>

            {formData.formaPagamento === 'cartao' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cartão</label>
                <select
                  required
                  value={formData.cartaoId}
                  onChange={(e) => setFormData({...formData, cartaoId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione um cartão</option>
                  {cartoes.map(cartao => (
                    <option key={cartao.id} value={cartao.id}>{cartao.nome}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Despesa</label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({...formData, tipo: e.target.value as TipoDespesa})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="unica">Única</option>
                <option value="recorrente">Recorrente</option>
                <option value="parcelada">Parcelada</option>
              </select>
            </div>

            {formData.tipo === 'recorrente' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequência</label>
                <select
                  value={formData.frequencia}
                  onChange={(e) => setFormData({...formData, frequencia: e.target.value as FrequenciaRecorrente})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="mensal">Mensal</option>
                  <option value="trimestral">Trimestral</option>
                  <option value="semestral">Semestral</option>
                  <option value="anual">Anual</option>
                </select>
              </div>
            )}

            {formData.tipo === 'parcelada' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total de Parcelas</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.totalParcelas}
                    onChange={(e) => setFormData({...formData, totalParcelas: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parcela Atual</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.parcelaAtual}
                    onChange={(e) => setFormData({...formData, parcelaAtual: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {expense ? 'Atualizar' : 'Criar'} Despesa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
