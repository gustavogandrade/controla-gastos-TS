import { Categoria, Despesa } from './tipos.js';

export function adicionarDespesa(despesas: Despesa[], nova: Despesa): Despesa[] {
  if (nova.valor <= 0) {
    throw new Error("O valor da despesa deve ser maior que zero.");
  }
  return [...despesas, nova];
}

export function removerDespesa(despesas: Despesa[], id: string): Despesa[] {
  return despesas.filter((d) => d.id !== id);
}

export function despesasDaCategoria(despesas: Despesa[], categoria: Categoria): Despesa[] {
  return despesas.filter((d) => d.categoria === categoria);
}

export function totalGasto(despesas: Despesa[]): number {
  return despesas.reduce((acc, d) => acc + d.valor, 0);
}

export function maiorDespesa(despesas: Despesa[]): Despesa | undefined {
  const primeira = despesas[0];
  if (!primeira) return undefined;

  let maior = primeira;
  for (let i = 1; i < despesas.length; i++) {
    const d = despesas[i];
    if (d && d.valor > maior.valor) {
      maior = d;
    }
  }

  return maior;
}