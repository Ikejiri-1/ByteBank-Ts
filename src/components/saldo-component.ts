import { formatarData, formatarSaldo } from "../utils/formatters.js";
import { DataPadronizada } from "../types/data-padronizada.js";
import Conta from "../types/Conta.js";

const elementoSaldo = document.querySelector(
  ".saldo-valor .valor"
) as HTMLElement;

const elementoDataDeAcesso = document.querySelector(
  ".block-saldo time"
) as HTMLElement;

if (elementoDataDeAcesso !== null) {
  elementoDataDeAcesso.textContent = formatarData(
    Conta.getDataAcesso(),
    DataPadronizada.DIA_SEMANA_DIA_MES_ANO
  );
}
renderizarSaldo();
function renderizarSaldo(): void {
  if (elementoSaldo !== null) {
    elementoSaldo.textContent = formatarSaldo(Conta.getSaldo());
  }
}
const SaldoComponent = {
  atualizar() {
    renderizarSaldo();
  },
};

export default SaldoComponent;
