
import React from 'react';
import * as LucideIcons from 'lucide-react';

interface CategoryIconProps {
  iconName: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const CategoryIcon = ({ iconName, size = 16, className = "", style }: CategoryIconProps) => {
  // Mapear o nome do ícone para o componente correspondente
  const IconComponent = (LucideIcons as any)[iconName];
  
  // Fallback para ícone padrão se não encontrar
  if (!IconComponent) {
    const TagIcon = LucideIcons.Tag;
    return <TagIcon size={size} className={className} style={style} />;
  }
  
  return <IconComponent size={size} className={className} style={style} />;
};

export default CategoryIcon;
