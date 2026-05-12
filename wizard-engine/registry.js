const registroBlocos = {};

export function registrarBloco(tipo, renderizador) {
    registroBlocos[tipo] = renderizador;
}

export function renderizarBloco(bloco) {
    const renderizador = registroBlocos[bloco.type];
    if (!renderizador) {
        console.warn(`Tipo de bloco desconhecido: "${bloco.type}"`);
        return null;
    }
    return renderizador(bloco);
}
