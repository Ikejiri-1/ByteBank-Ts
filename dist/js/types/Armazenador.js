export class Armazenador {
    constructor() { }
    static salvar(key, value) {
        const valorComoString = JSON.stringify(value);
        localStorage.setItem(key, valorComoString);
    }
    static obter(key, reviver) {
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
