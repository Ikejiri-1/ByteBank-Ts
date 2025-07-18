import { DataPadronizada } from "../types/data-padronizada.js";
export function formatarSaldo(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}
export function formatarData(data, padrao = DataPadronizada.PADRAO) {
    if (padrao === DataPadronizada.DIA_SEMANA_DIA_MES_ANO) {
        return data.toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    }
    else if (padrao === DataPadronizada.DIA_MES) {
        return data.toLocaleDateString("pt-BR", {
            month: "2-digit",
            day: "2-digit",
        });
    }
    return data.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}
