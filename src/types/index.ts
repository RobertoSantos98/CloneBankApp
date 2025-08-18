export type User = {
    id: string;
    nome: string;
    email: string;
    token: string;
}

export type Transferencia = {
    idPagador: string | undefined;
    tipoContaPagador: string,
    idRecebedor: string,
    tipoContaRecebedor: string,
    valor: number | undefined;
}