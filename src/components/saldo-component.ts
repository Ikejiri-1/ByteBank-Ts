import { formatarData, formatarSaldo } from "../utils/formatters.js";
import { DataPadronizada } from "../types/data-padronizada.js";
import Conta from "../types/Conta-antiga.js";

const elementoSaldo = document.querySelector(
  ".saldo-valor .valor"
) as HTMLElement;

renderizarSaldo();
function renderizarSaldo(): void {
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
