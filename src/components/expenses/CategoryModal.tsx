
import React, { useState, useEffect } from 'react';
import { X, Plus, Edit, Trash2, Palette } from 'lucide-react';
import { Categoria } from '@/types';
import CategoryIcon from '@/components/ui/CategoryIcon';

interface CategoryModalProps {
  categorias: Categoria[];
  onSave: (categorias: Categoria[]) => void;
  onClose: () => void;
}

const CategoryModal = ({ categorias, onSave, onClose }: CategoryModalProps) => {
  const [localCategorias, setLocalCategorias] = useState<Categoria[]>(categorias);
  const [editingCategory, setEditingCategory] = useState<Categoria | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    cor: '#3b82f6',
    icone: 'Tag'
  });

  const cores = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', 
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f59e0b'
  ];

  const icones = [
    'Tag', 'Home', 'Car', 'UtensilsCrossed', 'Gamepad2', 'Heart', 
    'GraduationCap', 'ShoppingCart', 'Plane', 'Coffee', 'Shirt', 'Phone'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      setLocalCategorias(prev => prev.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, nome: formData.nome, cor: formData.cor, icone: formData.icone }
          : cat
      ));
    } else {
      const newCategory: Categoria = {
        id: Date.now().toString(),
        nome: formData.nome,
        cor: formData.cor,
        icone: formData.icone
      };
      setLocalCategorias(prev => [...prev, newCategory]);
    }

    setFormData({ nome: '', cor: '#3b82f6', icone: 'Tag' });
    setEditingCategory(null);
  };

  const handleEdit = (categoria: Categoria) => {
    setEditingCategory(categoria);
    setFormData({
      nome: categoria.nome,
      cor: categoria.cor,
      icone: categoria.icone
    });
  };

  const handleDelete = (id: string) => {
    setLocalCategorias(prev => prev.filter(cat => cat.id !== id));
  };

  const handleSave = () => {
    onSave(localCategorias);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Gerenciar Categorias</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formulário */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nome da categoria"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cor</label>
                  <div className="grid grid-cols-5 gap-2">
                    {cores.map(cor => (
                      <button
                        key={cor}
                        type="button"
                        onClick={() => setFormData({...formData, cor})}
                        className={`w-8 h-8 rounded-full border-2 ${
                          formData.cor === cor ? 'border-gray-900' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: cor }}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={formData.cor}
                    onChange={(e) => setFormData({...formData, cor: e.target.value})}
                    className="mt-2 w-full h-8 rounded border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ícone</label>
                  <div className="flex items-center space-x-3 mb-2">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: formData.cor }}
                    >
                      <CategoryIcon iconName={formData.icone} size={16} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-600">Prévia do ícone</span>
                  </div>
                  <select
                    value={formData.icone}
                    onChange={(e) => setFormData({...formData, icone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {icones.map(icone => (
                      <option key={icone} value={icone}>{icone}</option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2 inline" />
                    {editingCategory ? 'Atualizar' : 'Adicionar'}
                  </button>
                  {editingCategory && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCategory(null);
                        setFormData({ nome: '', cor: '#3b82f6', icone: 'Tag' });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Lista de Categorias */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Categorias Existentes ({localCategorias.length})
              </h3>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {localCategorias.map(categoria => (
                  <div key={categoria.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: categoria.cor }}
                      >
                        <CategoryIcon 
                          iconName={categoria.icone} 
                          size={16} 
                          className="text-white" 
                        />
                      </div>
                      <span className="font-medium text-gray-900">{categoria.nome}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(categoria)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(categoria.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
