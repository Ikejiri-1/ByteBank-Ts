import Conta from "../types/Conta.js";
import { formatarData } from "../utils/formatters.js";
import { DataPadronizada } from "../types/data-padronizada.js";
const elementoDataDeAcesso = document.querySelector(".block-saldo time");
function renderizarData() {
    if (elementoDataDeAcesso) {
        elementoDataDeAcesso.textContent = formatarData(Conta.getDataAcesso(), DataPadronizada.DIA_SEMANA_DIA_MES_ANO);
    }
}
const DataComponent = {
    atualizarData() {
        renderizarData();
    },
};
export default DataComponent;
