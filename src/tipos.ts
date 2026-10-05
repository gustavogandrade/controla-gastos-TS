export type Categoria = 'alimentacao' | 'transporte' | 'moradia' | 'lazer' | 'outros';
//Union types para definir categoria de cada objeto Despesa

export interface Despesa {
    readonly id: string; //readonly pois não pode ser reatribuido
    descricao: string;
    valor: number;
    categoria: Categoria;
    mes: number;
    observacao?: string; //Opcional, já que nem toda despesa precisa de observação
}