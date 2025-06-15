
import { Despesa, Aporte } from '@/types';

// Transform database despesa to frontend Despesa type
export const transformDespesaFromDB = (dbDespesa: any): Despesa => {
  return {
    id: dbDespesa.id,
    descricao: dbDespesa.descricao,
    origem: dbDespesa.origem,
    categoriaId: dbDespesa.categoria_id,
    valor: dbDespesa.valor,
    dataCompra: dbDespesa.data_compra,
    dataVencimento: dbDespesa.data_vencimento,
    formaPagamento: dbDespesa.forma_pagamento,
    status: dbDespesa.status,
    tipo: dbDespesa.tipo,
    cartaoId: dbDespesa.cartao_id,
    frequencia: dbDespesa.frequencia,
    totalParcelas: dbDespesa.total_parcelas,
    parcelaAtual: dbDespesa.parcela_atual,
    divisaoInvestidores: [] // Will be populated when we implement divisao_despesas
  };
};

// Transform database aporte to frontend Aporte type
export const transformAporteFromDB = (dbAporte: any): Aporte => {
  return {
    id: dbAporte.id,
    investidorId: dbAporte.investidor_id,
    valor: dbAporte.valor,
    data: dbAporte.data,
    descricao: dbAporte.descricao
  };
};
