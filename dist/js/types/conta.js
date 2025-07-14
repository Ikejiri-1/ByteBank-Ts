import { TipoTransacao } from "./tipo-transacao.js";
import { Armazenador } from "./Armazenador.js";
export class Conta {
    nome;
    saldo;
    transacoes;
    constructor(nome) {
        this.nome = nome;
        this.saldo = Armazenador.obter("saldo") ?? 0;
        this.transacoes =
            Armazenador.obter("transacoes", (key, value) => {
                if (key === "data") {
                    return new Date(value);
                }
                return value;
            }) || [];
    }
    getTitular() {
        this.nome;
    }
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(this.transacoes);
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.data.toLocaleDateString("pt-br", {
                month: "long",
                year: "numeric",
            });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: [],
                });
            }
            gruposTransacoes.at(-1)?.transacoes.push(transacao);
        }
        return gruposTransacoes;
    }
    getSaldo() {
        return this.saldo;
    }
    getDataAcesso() {
        return new Date();
    }
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.Deposito) {
            this.depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.Transferencia ||
            novaTransacao.tipoTransacao == TipoTransacao.PagamentoBoleto) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
        this.transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        Armazenador.salvar("transacoes", JSON.stringify(this.transacoes));
    }
    debitar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente!");
        }
        this.saldo -= valor;
        Armazenador.salvar("saldo", JSON.stringify(this.saldo));
    }
    depositar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
        this.saldo += valor;
        Armazenador.salvar("saldo", JSON.stringify(this.saldo));
    }
}
const conta = new Conta("Joana da Silva Oliveira");
export default conta;
