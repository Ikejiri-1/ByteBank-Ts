import { TipoTransacao } from "./tipo-transacao.js";
let saldo = 3000;
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.Deposito) {
            saldo += novaTransacao.valor;
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.Transferencia ||
            novaTransacao.tipoTransacao == TipoTransacao.PagamentoBoleto) {
            saldo -= novaTransacao.valor;
        }
        else {
            alert("Tipo de Transação é inválido!");
            return;
        }
        console.log(novaTransacao);
    },
};
export default Conta;
