export function ValidarDebito(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const metodoOriginal = descriptor.value;

  descriptor.value = function (this: { saldo: number }, valorDoDebito: number) {
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

export function ValidarDeposito(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const metodoOriginal = descriptor.value;
  descriptor.value = function (
    this: { saldo: number },
    valorDepositado: number
  ) {
    if (valorDepositado <= 0) {
      throw new Error("O valor a ser depositado deve ser maior que zero!");
    }
    return metodoOriginal.apply(this, [valorDepositado]);
  };
  return descriptor;
}
