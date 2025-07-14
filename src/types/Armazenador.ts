export class Armazenador {
  private constructor() {}
  static salvar(key: string, value: any): void {
    const valorComoString = JSON.stringify(value);
    localStorage.setItem(key, valorComoString);
  }
  static obter(
    key: string,
    reviver?: (this: any, key: string, value: any) => any
  ) {
    const valor = localStorage.getItem(key);
    if (valor === null) {
      return null;
    }
    if (reviver) {
      return JSON.parse(valor, reviver);
    }
    return JSON.parse(valor);
  }
}
