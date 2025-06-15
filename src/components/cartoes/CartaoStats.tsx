
import React, { memo } from 'react';
import { Cartao, Despesa } from '@/types';
import { useCartaoCalculations } from '@/hooks/useCartaoCalculations';
import LimiteTotalCard from './stats/LimiteTotalCard';
import LimiteUtilizadoCard from './stats/LimiteUtilizadoCard';
import ProximaFaturaCard from './stats/ProximaFaturaCard';
import CartoesAtivosCard from './stats/CartoesAtivosCard';

interface CartaoStatsProps {
  cartoes: Cartao[];
  despesas: Despesa[];
}

const CartaoStats = memo(({ cartoes, despesas }: CartaoStatsProps) => {
  const { 
    limiteTotal, 
    limiteUtilizado, 
    proximaFatura, 
    cartoesAtivos 
  } = useCartaoCalculations(cartoes, despesas);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <LimiteTotalCard limiteTotal={limiteTotal} cartoesAtivos={cartoesAtivos} />
      <LimiteUtilizadoCard limiteUtilizado={limiteUtilizado} limiteTotal={limiteTotal} />
      <ProximaFaturaCard proximaFatura={proximaFatura} />
      <CartoesAtivosCard cartoesAtivos={cartoesAtivos} />
    </div>
  );
});

CartaoStats.displayName = 'CartaoStats';

export default CartaoStats;
