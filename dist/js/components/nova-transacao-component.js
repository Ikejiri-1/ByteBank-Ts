import SaldoComponent from "./saldo-component.js";
import Conta from "../types/Conta.js";
import ExtratoComponent from "./extrato-component.js";
const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        if (!elementoFormulario.checkValidity()) {
            alert("Por favor, preencha todos os campos da transação!");
            return;
        }
        const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao");
        const inputValor = elementoFormulario.querySelector("#valor");
        const inputData = elementoFormulario.querySelector("#data");
        console.log(inputData.value);
        let tipoTransacao = inputTipoTransacao.value;
        let valor = parseFloat(inputValor.value);
        let data = new Date(inputData.value.replace(/-/g, "/").trim() + " 00:00:00");
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        };
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoFormulario.reset();
    }
    catch (error) {
        alert("Erro ao registrar transação: " + error.message);
    }
});
