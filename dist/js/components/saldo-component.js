import { formatarData, formatarSaldo } from "../utils/formatters.js";
import { DataPadronizada } from "../types/data-padronizada.js";
let saldo = 3000;
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoDataDeAcesso = document.querySelector(".block-saldo time");
if (elementoDataDeAcesso !== null) {
    const dataAcesso = new Date();
    elementoDataDeAcesso.textContent = formatarData(dataAcesso, DataPadronizada.DIA_SEMANA_DIA_MES_ANO);
}
atualizarSaldo(saldo);
export function getSaldo() {
    return saldo;
}
export function atualizarSaldo(novoSaldo) {
    saldo = novoSaldo;
    if (elementoSaldo !== null) {
        elementoSaldo.textContent = formatarSaldo(saldo);
    }
}
