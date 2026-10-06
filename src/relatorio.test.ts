import { describe, expect, it } from "vitest";
import { Despesa } from "./tipos.js";
import {
  descricaoCategoria,
  matrizCategoriaMes,
  formatarRelatorio,
} from "./relatorio.js";

const despesasExemplo: Despesa[] = [
    { id: "1", descricao: "Feira", valor: 100, categoria: "alimentacao", mes: 1 },
    { id: "2", descricao: "Uber", valor: 50, categoria: "transporte", mes: 1 },
    { id: "3", descricao: "Restaurante", valor: 150, categoria: "alimentacao", mes: 2 },
];


describe("descricaoCategoria", () => {
  it("deve retornar o nome formatado da categoria usando switch", () => {
    expect(descricaoCategoria("alimentacao")).toBe("Alimentação");
    expect(descricaoCategoria("transporte")).toBe("Transporte");
    expect(descricaoCategoria("lazer")).toBe("Lazer");
    expect(descricaoCategoria("moradia")).toBe("Moradia");
  });
});

describe("matrizCategoriaMes", () => {
  it("deve retornar uma matriz 4x12 com os totais por categoria e mês", () => {
    const matriz = matrizCategoriaMes(despesasExemplo);

    expect(matriz).toHaveLength(4);
    expect(matriz[0]).toHaveLength(12);

    expect(matriz[0]?.[0]).toBe(100);
    expect(matriz[0]?.[1]).toBe(150);


    expect(matriz[1]?.[0]).toBe(50);
  });

  it("deve retornar uma matriz zerada para lista vazia de despesas", () => {
    const matriz = matrizCategoriaMes([]);
    expect(matriz).toHaveLength(4);
    expect(matriz[0]?.[0]).toBe(0);
  });
});

describe("formatarRelatorio", () => {
  it("deve formatar corretamente o relatório com título em maiúsculas e totais", () => {
    const texto = formatarRelatorio(despesasExemplo);

    expect(texto).toContain("RELATÓRIO DE GASTOS DO MÊS");
    expect(texto).toContain("Alimentação    : R$     250.00");
    expect(texto).toContain("TOTAL GERAL    : R$     300.00");
    expect(texto).toContain("MAIOR DESPESA   : Restaurante (R$ 150.00)");
  });

  it("deve exibir mensagem apropriada quando não houver despesas", () => {
    const texto = formatarRelatorio([]);
    expect(texto).toContain("TOTAL GERAL    : R$       0.00");
    expect(texto).toContain("MAIOR DESPESA   : Nenhuma despesa registrada");
  });
});