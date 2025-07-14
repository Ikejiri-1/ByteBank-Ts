import Conta from "../types/Conta-antiga.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarData, formatarSaldo } from "../utils/formatters.js";
const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(
  ".extrato .registro-transacoes"
) as HTMLElement;

renderizarExtrato();
function renderizarExtrato(): any {
  const gruposTransacoes: GrupoTransacao[] = Conta.getGruposTransacoes();
  elementoRegistroTransacoesExtrato.innerHTML = "";
  let htmlRegistroTransacoes: string = "";
  for (let grupoTransacao of gruposTransacoes) {
    let htmlTransacaoItems: string = "";
    for (let transacao of grupoTransacao.transacoes) {
      htmlTransacaoItems += `<div class="transacao-item">
              <div class="transacao-info">
                <span class="tipo">${transacao.tipoTransacao}</span>
                <strong class="valor">${formatarSaldo(transacao.valor)}</strong>
              </div>
              <time class="data">${formatarData(transacao.data)}</time>
            </div>`;
    }
    htmlRegistroTransacoes += `<div class="transacoes-group">
              <strong class="mes-group">${grupoTransacao.label}</strong>
              ${htmlTransacaoItems}
            </div>`;
  }

  if (htmlRegistroTransacoes === "") {
    htmlRegistroTransacoes = `<div class="transacoes-group">
              <strong class="mes-group">Nenhuma transação</strong>
            </div>`;
  }

  elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}

const ExtratoComponent = {
  atualizar(): void {
    renderizarExtrato();
  },
};

export default ExtratoComponent;
