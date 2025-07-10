import { Transacao } from "../types/transacao.js";
import { TipoTransacao } from "../types/tipo-transacao.js";
import { atualizarSaldo, getSaldo } from "./saldo-component.js";

const elementoFormulario = document.querySelector(
  ".block-nova-transacao form"
) as HTMLFormElement;
elementoFormulario.addEventListener("submit", (e) => {
  e.preventDefault();
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

  let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
  let valor: number = parseFloat(inputValor.value);
  let data: Date = new Date(inputData.value);
  let saldo: number = getSaldo();

  if (tipoTransacao == TipoTransacao.Deposito) {
    saldo += valor;
  } else if (
    tipoTransacao == TipoTransacao.Transferencia ||
    tipoTransacao == TipoTransacao.PagamentoBoleto
  ) {
    saldo -= valor;
  } else {
    alert("Tipo de Transação é inválido!");
    return;
  }

  atualizarSaldo(saldo);

  const novaTransacao: Transacao = {
    tipoTransacao: tipoTransacao,
    valor: valor,
    data: data,
  };

  console.log(novaTransacao);
  elementoFormulario.reset();
});
