var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TipoTransacao } from "./tipo-transacao.js";
import { Armazenador } from "./Armazenador.js";
import { ValidarDebito, ValidarDeposito } from "./Decorators.js";
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
        console.log(typeof listaTransacoes);
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
        Armazenador.salvar("transacoes", this.transacoes);
    }
    debitar(valor) {
        this.saldo -= valor;
        Armazenador.salvar("saldo", this.saldo);
    }
    depositar(valor) {
        this.saldo += valor;
        Armazenador.salvar("saldo", this.saldo);
    }
}
__decorate([
    ValidarDebito
], Conta.prototype, "debitar", null);
__decorate([
    ValidarDeposito
], Conta.prototype, "depositar", null);
export class ContaPremium extends Conta {
    registrarTransacao(transacao) {
        if (transacao.tipoTransacao == TipoTransacao.Deposito) {
            console.log("Ganhou um bônus de 5%");
            {
                transacao.valor *= 1.05;
            }
            super.registrarTransacao(transacao);
        }
    }
}
const conta = new Conta("Joana da Silva Oliveira");
const contaPremium = new ContaPremium("João da Silva Oliveira");
export default conta;
