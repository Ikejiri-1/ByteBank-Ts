import { Transacao } from "./transacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./tipo-transacao.js";
import { Armazenador } from "./Armazenador.js";
import { ValidarDebito, ValidarDeposito } from "./Decorators.js";
export class Conta {
  protected nome: string;
  protected saldo: number;
  private transacoes: Transacao[];

  constructor(nome: string) {
    this.nome = nome;

    this.saldo = Armazenador.obter<number>("saldo") ?? 0;

    this.transacoes =
      Armazenador.obter<Transacao[]>(
        "transacoes",
        (key: string, value: any) => {
          if (key === "data") {
            return new Date(value);
          }
          return value;
        }
      ) || [];
  }
  public getTitular() {
    this.nome;
  }

  getGruposTransacoes(): GrupoTransacao[] {
    const gruposTransacoes: GrupoTransacao[] = [];

    const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
    console.log(typeof listaTransacoes);
    const transacoesOrdenadas: Transacao[] = listaTransacoes.sort(
      (t1, t2) => t2.data.getTime() - t1.data.getTime()
    );
    let labelAtualGrupoTransacao: string = "";
    for (let transacao of transacoesOrdenadas) {
      let labelGrupoTransacao: string = transacao.data.toLocaleDateString(
        "pt-br",
        {
          month: "long",
          year: "numeric",
        }
      );
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
  registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao == TipoTransacao.Deposito) {
      this.depositar(novaTransacao.valor);
    } else if (
      novaTransacao.tipoTransacao == TipoTransacao.Transferencia ||
      novaTransacao.tipoTransacao == TipoTransacao.PagamentoBoleto
    ) {
      this.debitar(novaTransacao.valor);
      novaTransacao.valor *= -1;
    } else {
      throw new Error("Tipo de Transação é inválido!");
    }
    this.transacoes.push(novaTransacao);
    console.log(this.getGruposTransacoes());
    Armazenador.salvar("transacoes", this.transacoes);
  }

  @ValidarDebito
  private debitar(valor: number): void {
    this.saldo -= valor;
    Armazenador.salvar("saldo", this.saldo);
  }
  @ValidarDeposito
  private depositar(valor: number): void {
    this.saldo += valor;
    Armazenador.salvar("saldo", this.saldo);
  }
}

export class ContaPremium extends Conta {
  registrarTransacao(transacao: Transacao): void {
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
