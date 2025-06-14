import React, { useState } from 'react';
import { Plus, Calendar, DollarSign, Tag, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFeedback } from '@/hooks/useFeedback';
import CategoryIcon from '@/components/ui/CategoryIcon';
import ResponsiveValue from '@/components/ui/ResponsiveValue';

const TransactionForm = () => {
  const { showSuccess, showError } = useFeedback();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.amount || !formData.type || !formData.category) {
      showError(
        "Campos obrigatórios", 
        "Por favor, preencha todos os campos obrigatórios."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular processo de salvamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Transaction data:', formData);
      
      showSuccess(
        "Transação salva com sucesso!",
        `${formData.type === 'income' ? 'Receita' : 'Despesa'} de R$ ${formData.amount} foi adicionada.`
      );

      // Reset form
      setFormData({
        title: '',
        amount: '',
        type: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
    } catch (error) {
      showError(
        "Erro ao salvar",
        "Ocorreu um erro inesperado. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Novo Lançamento</h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">Registre suas receitas e despesas</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg sm:text-xl">
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
                disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  Tipo *
                </Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleInputChange('type', value)}
                  disabled={isSubmitting}
                >
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

            {/* Preview com ResponsiveValue */}
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
                  <ResponsiveValue
                    value={parseFloat(formData.amount) || 0}
                    variant={formData.type === 'income' ? 'success' : formData.type === 'expense' ? 'danger' : 'default'}
                    prefix={formData.type === 'income' ? '+' : formData.type === 'expense' ? '-' : ''}
                    size="lg"
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Salvar Transação
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                disabled={isSubmitting}
                onClick={() => {
                  setFormData({
                    title: '',
                    amount: '',
                    type: '',
                    category: '',
                    date: new Date().toISOString().split('T')[0],
                    description: ''
                  });
                }}
              >
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
