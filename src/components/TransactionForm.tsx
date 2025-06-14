import React, { useState } from 'react';
import { Plus, Calendar, DollarSign, Tag, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import CategoryIcon from '@/components/ui/CategoryIcon';

const TransactionForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const categories = {
    income: [
      { name: 'Salário', icon: 'Briefcase', color: '#22c55e' },
      { name: 'Freelance', icon: 'Laptop', color: '#3b82f6' },
      { name: 'Investimentos', icon: 'TrendingUp', color: '#8b5cf6' },
      { name: 'Outros', icon: 'Plus', color: '#6b7280' }
    ],
    expense: [
      { name: 'Alimentação', icon: 'UtensilsCrossed', color: '#ef4444' },
      { name: 'Transporte', icon: 'Car', color: '#f97316' },
      { name: 'Moradia', icon: 'Home', color: '#eab308' },
      { name: 'Lazer', icon: 'Gamepad2', color: '#ec4899' },
      { name: 'Saúde', icon: 'Heart', color: '#06b6d4' },
      { name: 'Educação', icon: 'GraduationCap', color: '#84cc16' },
      { name: 'Outros', icon: 'Tag', color: '#6b7280' }
    ]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.amount || !formData.type || !formData.category) {
      toast({
        title: "Erro ao salvar",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    console.log('Transaction data:', formData);
    
    toast({
      title: "Transação salva!",
      description: `${formData.type === 'income' ? 'Receita' : 'Despesa'} de R$ ${formData.amount} adicionada com sucesso.`,
    });

    // Reset form
    setFormData({
      title: '',
      amount: '',
      type: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Reset category when type changes
      ...(field === 'type' && { category: '' })
    }));
  };

  const selectedCategoryData = formData.type && formData.category 
    ? categories[formData.type as keyof typeof categories].find(cat => cat.name === formData.category)
    : null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Novo Lançamento</h1>
        <p className="text-gray-500 mt-1">Registre suas receitas e despesas</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            Adicionar Transação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Título *
              </Label>
              <Input
                id="title"
                placeholder="Ex: Supermercado, Salário, etc."
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Valor e Tipo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Valor *
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  Tipo *
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Receita
                      </span>
                    </SelectItem>
                    <SelectItem value="expense">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        Despesa
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Categoria e Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  Categoria *
                </Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleInputChange('category', value)}
                  disabled={!formData.type}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.type && categories[formData.type as keyof typeof categories].map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        <span className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded flex items-center justify-center mr-2"
                            style={{ backgroundColor: category.color }}
                          >
                            <CategoryIcon iconName={category.icon} size={12} className="text-white" />
                          </div>
                          {category.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedCategoryData && (
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: selectedCategoryData.color }}
                    >
                      <CategoryIcon 
                        iconName={selectedCategoryData.icon} 
                        size={14} 
                        className="text-white" 
                      />
                    </div>
                    <span className="text-sm text-gray-600">{selectedCategoryData.name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Data *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="description">Descrição (opcional)</Label>
              <Textarea
                id="description"
                placeholder="Adicione mais detalhes sobre esta transação..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>

            {/* Preview */}
            {(formData.title || formData.amount) && (
              <div className="bg-gray-50 rounded-lg p-4 border">
                <h4 className="font-medium text-gray-900 mb-2">Preview:</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {selectedCategoryData && (
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: selectedCategoryData.color }}
                      >
                        <CategoryIcon 
                          iconName={selectedCategoryData.icon} 
                          size={16} 
                          className="text-white" 
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{formData.title || 'Título'}</p>
                      <p className="text-sm text-gray-500">
                        {formData.category && `${formData.category} • `}
                        {formData.date && new Date(formData.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <span className={`font-semibold ${
                    formData.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formData.type === 'income' ? '+' : formData.type === 'expense' ? '-' : ''}
                    R$ {formData.amount || '0,00'}
                  </span>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                <Plus className="mr-2 h-4 w-4" />
                Salvar Transação
              </Button>
              <Button type="button" variant="outline" onClick={() => {
                setFormData({
                  title: '',
                  amount: '',
                  type: '',
                  category: '',
                  date: new Date().toISOString().split('T')[0],
                  description: ''
                });
              }}>
                Limpar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionForm;
