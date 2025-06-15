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
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f59e0b',
    '#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#2563eb',
    '#7c3aed', '#db2777', '#0891b2', '#65a30d', '#d97706'
  ];

  const icones = [
    'Tag', 'Home', 'Car', 'UtensilsCrossed', 'Gamepad2', 'Heart', 
    'GraduationCap', 'ShoppingCart', 'Plane', 'Coffee', 'Shirt', 'Phone',
    'Utensils', 'Fuel', 'Bus', 'Train', 'Building', 'Hospital',
    'Briefcase', 'Music', 'Book', 'Laptop', 'Smartphone', 'Headphones'
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
              
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <label className="block text-sm font-medium text-gray-700 mb-3">Cor</label>
                  
                  {/* Cores predefinidas */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-3">Cores predefinidas</p>
                    <div className="grid grid-cols-10 gap-2">
                      {cores.map(cor => (
                        <button
                          key={cor}
                          type="button"
                          onClick={() => setFormData({...formData, cor})}
                          className={`relative w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 shadow-sm group ${
                            formData.cor === cor 
                              ? 'border-gray-900 ring-2 ring-blue-500 ring-offset-1 shadow-md' 
                              : 'border-gray-200 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: cor }}
                          title={cor}
                        >
                          {formData.cor === cor && (
                            <div className="absolute inset-0 rounded-md flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seletor de cor customizada */}
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500">Cor personalizada</p>
                    <div className="flex items-center space-x-3">
                      <div className="relative group">
                        <input
                          type="color"
                          value={formData.cor}
                          onChange={(e) => setFormData({...formData, cor: e.target.value})}
                          className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer bg-transparent hover:border-gray-400 transition-colors"
                          style={{ backgroundColor: formData.cor }}
                        />
                        <Palette className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none opacity-60" />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={formData.cor}
                          onChange={(e) => setFormData({...formData, cor: e.target.value})}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono bg-gray-50"
                          placeholder="#3b82f6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Ícone</label>
                  
                  {/* Prévia do ícone */}
                  <div className="flex items-center space-x-3 mb-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md transition-all duration-200"
                      style={{ backgroundColor: formData.cor }}
                    >
                      <CategoryIcon iconName={formData.icone} size={20} className="text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Prévia da categoria</span>
                      <p className="text-xs text-gray-500">Como ficará no sistema</p>
                    </div>
                  </div>

                  {/* Seletor visual de ícones */}
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500">Escolha um ícone</p>
                    <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-lg bg-gray-50">
                      {icones.map(icone => (
                        <button
                          key={icone}
                          type="button"
                          onClick={() => setFormData({...formData, icone})}
                          className={`relative w-10 h-10 rounded-lg border-2 transition-all duration-200 hover:scale-105 flex items-center justify-center group ${
                            formData.icone === icone 
                              ? 'border-blue-500 bg-blue-50 shadow-md' 
                              : 'border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50'
                          }`}
                          title={icone}
                        >
                          <CategoryIcon 
                            iconName={icone} 
                            size={16} 
                            className={`transition-colors ${
                              formData.icone === icone ? 'text-blue-600' : 'text-gray-600'
                            }`} 
                          />
                          {formData.icone === icone && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center shadow-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {editingCategory ? 'Atualizar' : 'Adicionar'}
                  </button>
                  {editingCategory && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCategory(null);
                        setFormData({ nome: '', cor: '#3b82f6', icone: 'Tag' });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
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
                  <div key={categoria.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: categoria.cor }}
                      >
                        <CategoryIcon 
                          iconName={categoria.icone} 
                          size={18} 
                          className="text-white" 
                        />
                      </div>
                      <span className="font-medium text-gray-900">{categoria.nome}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(categoria)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(categoria.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded transition-colors duration-200"
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
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
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
