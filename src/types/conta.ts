import { Transacao } from "./transacao.js";
import { TipoTransacao } from "./tipo-transacao.js";

let saldo: number = 3000;

function debitar(valor: number): void {
  if (valor <= 0) {
    throw new Error("O valor a ser debitado deve ser maior que zero!");
  }
  if (valor > saldo) {
    throw new Error("Saldo insuficiente!");
  }
  saldo -= valor;
}
function depositar(valor: number): void {
  if (valor <= 0) {
    throw new Error("O valor a ser depositado deve ser maior que zero!");
  }
  saldo += valor;
}

const Conta = {
  getSaldo() {
    return saldo;
  },

  getDataAcesso() {
    return new Date();
  },

  registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao == TipoTransacao.Deposito) {
      depositar(novaTransacao.valor);
    } else if (
      novaTransacao.tipoTransacao == TipoTransacao.Transferencia ||
      novaTransacao.tipoTransacao == TipoTransacao.PagamentoBoleto
    ) {
      debitar(novaTransacao.valor);
    } else {
      throw new Error("Tipo de Transação é inválido!");
    }
    console.log(novaTransacao);
  },
};

export default Conta;
