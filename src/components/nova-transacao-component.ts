import { Transacao } from "../types/transacao.js";
import { TipoTransacao } from "../types/tipo-transacao.js";
import SaldoComponent from "./saldo-component.js";
import Conta from "../types/Conta.js";
import ExtratoComponent from "./extrato-component.js";
import { DataPadronizada } from "../types/data-padronizada.js";

const elementoFormulario = document.querySelector(
  ".block-nova-transacao form"
) as HTMLFormElement;

elementoFormulario.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    if (!elementoFormulario.checkValidity()) {
      alert("Por favor, preencha todos os campos da transação!");
      return;
    }

    const inputTipoTransacao = elementoFormulario.querySelector(
      "#tipoTransacao"
    ) as HTMLSelectElement;
    const inputValor = elementoFormulario.querySelector(
      "#valor"
    ) as HTMLInputElement;
    const inputData = elementoFormulario.querySelector(
      "#data"
    ) as HTMLInputElement;
    console.log(inputData.value);
    let tipoTransacao: TipoTransacao =
      inputTipoTransacao.value as TipoTransacao;
    let valor: number = parseFloat(inputValor.value);
    let data: Date = new Date(
      inputData.value.replace(/-/g, "/").trim() + " 00:00:00"
    );

    const novaTransacao: Transacao = {
      tipoTransacao: tipoTransacao,
      valor: valor,
      data: data,
    };

    Conta.registrarTransacao(novaTransacao);
    SaldoComponent.atualizar();
    ExtratoComponent.atualizar();
    elementoFormulario.reset();
  } catch (error: any) {
    alert("Erro ao registrar transação: " + error.message);
  }
});
