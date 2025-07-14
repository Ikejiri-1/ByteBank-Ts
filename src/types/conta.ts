import { Transacao } from "./transacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./tipo-transacao.js";
import { Armazenador } from "./Armazenador.js";
export class Conta {
  protected nome: string;
  protected saldo: number;
  private transacoes: Transacao[];

  constructor(nome: string) {
    this.nome = nome;

    this.saldo = Armazenador.obter("saldo");

    this.transacoes =
      Armazenador.obter("transacoes", (key: string, value: any) => {
        if (key === "data") {
          return new Date(value);
        }
        return value;
      }) || [];
  }
  public getTitular() {
    this.nome;
  }

  getGruposTransacoes(): GrupoTransacao[] {
    const gruposTransacoes: GrupoTransacao[] = [];
    const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
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
    Armazenador.salvar("transacoes", JSON.stringify(this.transacoes));
  }
  private debitar(valor: number): void {
    if (valor <= 0) {
      throw new Error("O valor a ser debitado deve ser maior que zero!");
    }
    if (valor > this.saldo) {
      throw new Error("Saldo insuficiente!");
    }
    this.saldo -= valor;
    Armazenador.salvar("saldo", JSON.stringify(this.saldo));
  }
  private depositar(valor: number): void {
    if (valor <= 0) {
      throw new Error("O valor a ser depositado deve ser maior que zero!");
    }
    this.saldo += valor;
    Armazenador.salvar("saldo", JSON.stringify(this.saldo));
  }
}
const conta = new Conta("Joana da Silva Oliveira");
export default conta;
