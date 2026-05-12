const respostas = {};

export function salvar(chave, valor) {
    respostas[chave] = { valor, timestamp: Date.now() };
}

export function salvarVarios(setMap) {
    Object.entries(setMap).forEach(([chave, valor]) => salvar(chave, valor));
}

export function ler(chave) {
    return respostas[chave]?.valor;
}

export function obterTodas() {
    return respostas;
}

export function existe(chave) {
    return chave in respostas;
}
