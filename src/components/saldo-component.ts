import { formatarData, formatarSaldo } from "../utils/formatters.js";
import { DataPadronizada } from "../types/data-padronizada.js";

let saldo: number = 3000;

const elementoSaldo = document.querySelector(
  ".saldo-valor .valor"
) as HTMLElement;

const elementoDataDeAcesso = document.querySelector(
  ".block-saldo time"
) as HTMLElement;

if (elementoDataDeAcesso !== null) {
  const dataAcesso: Date = new Date();
  elementoDataDeAcesso.textContent = formatarData(
    dataAcesso,
    DataPadronizada.DIA_SEMANA_DIA_MES_ANO
  );
}
atualizarSaldo(saldo);
export function getSaldo(): number {
  return saldo;
}
export function atualizarSaldo(novoSaldo: number): void {
  saldo = novoSaldo;
  if (elementoSaldo !== null) {
    elementoSaldo.textContent = formatarSaldo(saldo);
  }
}
