import { Despesa } from './tipos.js';
import { adicionarDespesa, totalGasto, maiorDespesa } from './despesas.js';
import { formatarRelatorio } from './relatorio.js';

// Array com 8 despesas de exemplo cobrindo as 4 categorias e 3 meses diferentes
const despesasExemplo: Despesa[] = [
  { id: '1', descricao: 'Feira Semanal', valor: 120.5, categoria: 'alimentacao', mes: 1 },
  { id: '2', descricao: 'Passe de Ônibus', valor: 60.0, categoria: 'transporte', mes: 1 },
  { id: '3', descricao: 'Aluguel', valor: 1200.0, categoria: 'moradia', mes: 1 },
  { id: '4', descricao: 'Cinema com Pipoca', valor: 45.0, categoria: 'lazer', mes: 2 },
  { id: '5', descricao: 'Supermercado', valor: 350.0, categoria: 'alimentacao', mes: 2 },
  { id: '6', descricao: 'Uber / Táxi', valor: 35.0, categoria: 'transporte', mes: 2 },
  { id: '7', descricao: 'Conta de Luz', valor: 180.0, categoria: 'moradia', mes: 3 },
  { id: '8', descricao: 'Show ao Vivo', valor: 150.0, categoria: 'lazer', mes: 3 },
];

console.log('=== DEMONSTRAÇÃO DAS FUNÇÕES ===\n');

// 1. Adicionando uma nova despesa
const novaDespesa: Despesa = {
  id: '9',
  descricao: 'Restaurante',
  valor: 90.0,
  categoria: 'alimentacao',
  mes: 3,
};

const listaFinal = adicionarDespesa(despesasExemplo, novaDespesa);

// 2. Exibindo estatísticas individuais no console
const total = totalGasto(listaFinal);
const maior = maiorDespesa(listaFinal);

console.log(`Total de despesas cadastradas: ${listaFinal.length}`);
console.log(`Total geral calculado: R$ ${total.toFixed(2)}`);
if (maior) {
  console.log(`Maior despesa encontrada: ${maior.descricao} (R$ ${maior.valor.toFixed(2)})\n`);
}

// 3. Imprimindo o relatório formatado
console.log(formatarRelatorio(listaFinal));