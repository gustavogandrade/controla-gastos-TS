# Controla Gastos TS

Sistema de gerenciamento e controle de despesas mensais desenvolvido em TypeScript estritamente tipado, utilizando TDD (*Test-Driven Development*) com Vitest.

---

## Como instalar, testar e rodar o projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes)

### 1. Instalação de Dependências
No terminal, execute o comando na raiz do projeto:
```bash
npm install

```

### 2. Executar os Testes Automatizados

Para rodar a suíte de testes com Vitest em modo *run*:

```bash
npm test

```

Para verificar a compilação estrita do TypeScript sem emitir arquivos:

```bash
npx tsc --noEmit

```

### 3. Rodar o Programa Principal

Para executar o arquivo principal (`src/index.ts`) e visualizar a execução e geração do relatório no terminal:

```bash
npx tsx src/index.ts

```

---

## Arquivos de Configuração

* **`package.json`**: Define os scripts de execução/teste do projeto e gerencia as dependências (`typescript`, `vitest`, `tsx`).
* **`tsconfig.json`**: Configura o compilador do TypeScript em modo estrito (`"strict": true`, `"noUncheckedIndexedAccess": true`, `"moduleResolution": "NodeNext"`).
* **`.gitignore`**: Especifica os diretórios e arquivos ignorados pelo versionamento do Git (ex: `node_modules/`, `dist/`).
* **`vitest.config.ts`**: Configura o ambiente e o executor do Vitest para suporte a módulos ESM e resolução de arquivos `.ts`.

---

## Exemplo de Execução (`src/index.ts`)

```typescript
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
console.log(`Total geral calculated: R$ ${total.toFixed(2)}`);
if (maior) {
  console.log(`Maior despesa encontrada: ${maior.descricao} (R$ ${maior.valor.toFixed(2)})\n`);
}

// 3. Imprimindo o relatório formatado
console.log(formatarRelatorio(listaFinal));

```

---

## Registro de Uso de IA

Tabela de rastreabilidade das funções desenvolvidas em parceria com a IA durante o fluxo de pair programming:

| Função | O que a IA fez | O que eu revisei/ajustei |
| --- | --- | --- |
| `adicionarDespesa` | Gerou a lógica inicial com validação de valor `> 0` e retorno de novo array com spread. | Fiz o tratamento e ajustei as respostas do teste. |
| `removerDespesa` | Sugeriu a filtragem por `id` mantendo imutabilidade. | Ajustei o teste para verificar a remoção na cópia retornada e não no array original. |
| `despesasDaCategoria` | Implementou a busca por categoria usando métodos de array/laço. | Ajustei as categorias dos mocks de teste para alinhar com os valores do Union Type. |
| `totalGasto` | Sugeriu o acumulador para soma dos valores das despesas. | Validei a precisão dos cálculos. |
| `maiorDespesa` | Gerou a busca do maior elemento tratando arrays vazios (`undefined`). | Resolvi erros de `noUncheckedIndexedAccess` adicionando verificações de guarda explícitas. |
| `descricaoCategoria` | Escreveu o bloco `switch` mapeando os tipos Union para nomes formatados. | Adicionei caso de borda para retornar o valor padrão caso a categoria não estivesse no `switch`. |
| `matrizCategoriaMes` | Escreveu a lógica de inicialização e preenchimento da matriz 4x12 usando laços `for`. | Tratei os alertas de indexação `undefined` do TS usando *guards* e checagens explícitas. |
| `formatarRelatorio` | Implementou a formatação das colunas e cabeçalhos com `padEnd`, `padStart` e `toFixed`. | Corrigi a tipagem do parâmetro para aceitar `Despesa[]` em vez de um objeto único e alinhei o alinhamento de texto. |

```

```

## Reflexão (autor)

A IA utilizada para esse desenvolvimento foi o Google Gemini 3.6 Flash, que conseguiu cobrir a maioria da implementação necessária, além de auxiliar em dúvidas sobre certos conceitos e debug de certos trechos de código que foram encontrados no projeto. Houveram algumas inconsistências quanto aos códigos entregues pela IA, muito relacionados a erros em referenciar variáveis e nos métodos utilizados dentro das funções, que foram corrigidos manualmente por mim ou até revisados pela própria IA ao solicitá-la de maneira específica. Em minha opinião, consertar os erros cometidos pela alucinação da IA é a parte mais demorada e chata do desenvolvimento com ela, às vezes se tornando empecilho em certos casos.


