import { formatarSaldo } from "../utils/formatters.js";
import Conta from "../types/Conta-antiga.js";
const elementoSaldo = document.querySelector(".saldo-valor .valor");
renderizarSaldo();
function renderizarSaldo() {
    if (elementoSaldo) {
        elementoSaldo.textContent = formatarSaldo(Conta.getSaldo());
    }
}
const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    },
};
export default SaldoComponent;
