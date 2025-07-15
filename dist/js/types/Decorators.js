export function ValidarDebito(target, propertyKey, descriptor) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (valorDoDebito) {
        if (valorDoDebito <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        if (valorDoDebito > this.saldo) {
            throw new Error("Saldo insuficiente!");
        }
        return metodoOriginal.apply(this, [valorDoDebito]);
    };
    return descriptor;
}
export function ValidarDeposito(target, propertyKey, descriptor) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (valorDepositado) {
        if (valorDepositado <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
        return metodoOriginal.apply(this, [valorDepositado]);
    };
    return descriptor;
}
