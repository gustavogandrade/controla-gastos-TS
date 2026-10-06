import { describe, expect, it } from "vitest";
import { Despesa } from "./tipos.js";
import {
  adicionarDespesa,
  despesasDaCategoria,
  removerDespesa,
  totalGasto,
  maiorDespesa,
} from "./despesas.js";

const despesasIniciais: Despesa[] = [
  { id: "1", descricao: "Mercado", valor: 100, categoria: "alimentacao", mes: 1 },
  { id: "2", descricao: "Conta luz", valor: 150, categoria: "outros", mes: 2 },
  { id: "3", descricao: "Cinema", valor: 40, categoria: "lazer", mes: 4 },
];

describe("adicionarDespesa", () => {
  it("deve adicionar uma nova despesa ao array", () => {
    const novaDespesa: Despesa = {
      id: "4",
      descricao: "Gasolina",
      valor: 50,
      categoria: "transporte",
      mes: 1,
    };
    expect(adicionarDespesa(despesasIniciais, novaDespesa)).toHaveLength(4);
    expect(adicionarDespesa(despesasIniciais, novaDespesa)).toContainEqual(novaDespesa);
  });

  it("deve lançar erro se o valor for menor ou igual a zero", () => {
    const despesaInvalida: Despesa = {
      id: "5",
      descricao: "Teste",
      valor: 0,
      categoria: "lazer",
      mes: 1,
    };

    expect(() => adicionarDespesa(despesasIniciais, despesaInvalida)).toThrow();
  });
});

describe("removerDespesa", () => {
  it("deve remover o primeiro item da lista", () => {
    const resultado = removerDespesa(despesasIniciais, "1");
    expect(resultado).toHaveLength(2);
    expect(resultado.find((d) => d.id === "1")).toBeUndefined();
  });

  it("deve retornar uma cópia com os mesmos itens se o id não existir", () => {
    const resultado = removerDespesa(despesasIniciais, "abobrinha");
    expect(resultado).toHaveLength(3);
    expect(resultado).toEqual(despesasIniciais);
    expect(resultado).not.toBe(despesasIniciais);
  });
});

describe("despesasDaCategoria", () => {
  it("deve retornar APENAS a categoria selecionada", () => {
    const resultado: Despesa[] = despesasDaCategoria(despesasIniciais, "alimentacao");
    expect(resultado).toHaveLength(1);
    expect(resultado[0]?.categoria).toBe("alimentacao");
  });

  it("deve retornar um array vazio se a categoria não tiver despesas", () => {
    const resultado = despesasDaCategoria(despesasIniciais, "moradia");
    expect(resultado).toEqual([]);
  });
});

describe("totalGasto", () => {
  it("Deve retornar a soma de todos os gastos", () => {
    expect(totalGasto(despesasIniciais)).toBe(290);
  });

  it("deve retornar 0 se a lista de despesas estiver vazia", () => {
    expect(totalGasto([])).toBe(0);
  });
});

describe("maiorDespesa", () => {
  it("deve retornar a despesa de maior valor", () => {
    const maior = maiorDespesa(despesasIniciais);
    expect(maior?.id).toBe("2");
    expect(maior?.valor).toBe(150);
  });

  it("deve retornar undefined se a lista estiver vazia", () => {
    expect(maiorDespesa([])).toBeUndefined();
  });
});