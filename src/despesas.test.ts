import { describe, expect, it } from "vitest";
import { Despesa } from "./tipos";
import { adicionarDespesa } from "./despesas";

describe("adicionarDespesa", () => {
    const despesasIniciais: Despesa[] = [
    { id: "1", descricao: "Mercado", valor: 100, categoria: "alimentacao", mes: 1 }
  ];

  it("deve adicionar uma nova despesa ao array", () => {
    const novaDespesa: Despesa = {
      id: "2",
      descricao: "Gasolina",
      valor: 50,
      categoria: "transporte",
      mes: 1
    }
    expect(adicionarDespesa(despesasIniciais, novaDespesa)).toHaveLength(2)
    expect(adicionarDespesa(despesasIniciais, novaDespesa)).toContainEqual(novaDespesa)
    });


  it("deve lançar erro se o valor for menor ou igual a zero", () => {
    const despesaInvalida: Despesa = {
      id: "3",
      descricao: "Teste",
      valor: 0,
      categoria: "lazer",
      mes: 1
    };

    expect(() => adicionarDespesa(despesasIniciais, despesaInvalida)).toThrow();
  });


describe("removerDespesa", () => {
    const despesasIniciais: Despesa[] = [
    { id: "1", descricao: "Mercado", valor: 100, categoria: "alimentacao", mes: 1 },
    { id: "2", descricao: "Conta luz", valor: 150, categoria: "outros", mes: 2 }
  ];

  it("deve remover o segundo item da lista", () => {
    expect(() => despesasIniciais.length).toBe(1);
  })
})


    


//describe("calcularMedia", () => {
//  it("retorna a média aritmética de um array de notas", () => {
//    expect(calcularMedia([8, 6, 10])).toBe(8);
//  });

//  it("retorna 0 para array vazio", () => {
//    expect(calcularMedia([])).toBe(0);
//  });
//});