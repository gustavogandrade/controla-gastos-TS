import { Categoria, Categorias, Despesa } from './tipos.js';
import { maiorDespesa, totalGasto } from './despesas.js';

export function descricaoCategoria(categoria: Categoria): string {
  switch (categoria) {
    case 'alimentacao':
      return 'Alimentação';
    case 'transporte':
      return 'Transporte';
    case 'lazer':
      return 'Lazer';
    case 'moradia':
      return 'Moradia';
    default:
      return categoria;
  }
}

export function matrizCategoriaMes(despesas: Despesa[]): number[][] {
  const matriz: number[][] = [];

  // Inicializa matriz 4x12 com zeros
  for (let i = 0; i < Categorias.length; i++) {
    const linha: number[] = [];
    for (let j = 0; j < 12; j++) {
      linha.push(0);
    }
    matriz.push(linha);
  }

  // Preenche valores com laço tradicional
  for (let k = 0; k < despesas.length; k++) {
    const despesa = despesas[k];
    if (!despesa) continue;

    let idxCategoria = -1;
    for (let c = 0; c < Categorias.length; c++) {
      if (Categorias[c] === despesa.categoria) {
        idxCategoria = c;
        break;
      }
    }

    if (idxCategoria !== -1 && despesa.mes >= 1 && despesa.mes <= 12) {
      const idxMes = despesa.mes - 1;
      const linha = matriz[idxCategoria];
      if (linha && linha[idxMes] !== undefined) {
        linha[idxMes] += despesa.valor;
      }
    }
  }

  return matriz;
}

export function formatarRelatorio(despesas: Despesa[]): string {
  const titulo = 'RELATÓRIO DE GASTOS DO MÊS'.toUpperCase();
  let relatorio = `${titulo}\n${'='.repeat(35)}\n`;

  const matriz = matrizCategoriaMes(despesas);

  for (let i = 0; i < Categorias.length; i++) {
    const categoria = Categorias[i];
    if (!categoria) continue;
    const nomeCategoria = descricaoCategoria(categoria);
    
    

    let totalCategoria = 0;
    const linha = matriz[i];
    if (linha) {
      for (let j = 0; j < 12; j++) {
        totalCategoria += linha[j] ?? 0;
      }
    }

    const nomeAlinhado = nomeCategoria.padEnd(15, ' ');
    const valorFormatado = totalCategoria.toFixed(2).padStart(10, ' ');
    relatorio += `${nomeAlinhado}: R$ ${valorFormatado}\n`;
  }

  relatorio += `${'='.repeat(35)}\n`;

  const totalGeral = totalGasto(despesas);
  relatorio += `${'TOTAL GERAL'.padEnd(15, ' ')}: R$ ${totalGeral.toFixed(2).padStart(10, ' ')}\n`;

  const maior = maiorDespesa(despesas);
  if (maior) {
    relatorio += `MAIOR DESPESA   : ${maior.descricao} (R$ ${maior.valor.toFixed(2)})\n`;
  } else {
    relatorio += `MAIOR DESPESA   : Nenhuma despesa registrada\n`;
  }

  return relatorio;
}