import { renderizarTelaAtual } from './renderer.js';

// telaInicial é uma variável global definida em telas.js (carregado antes como script comum).
// Fallback para 'inicio' caso não esteja definida.
export let telaAtualId = typeof telaInicial !== 'undefined' ? telaInicial : 'inicio';

const historico = []; // [{ id, titulo }]

export function navegarParaTela(novoId) {
    // Não tente resolver função aqui. Deixe o destino vir pronto do renderer.
    historico.push({
        id: telaAtualId,
        titulo: telas[telaAtualId]?.title || telaAtualId,
    });
    telaAtualId = novoId;
    renderizarTelaAtual();
}

export function voltarTela() {
    if (historico.length === 0) return;
    telaAtualId = historico.pop().id;
    renderizarTelaAtual();
}

export function atualizarBotaoVoltar() {
    const botao = document.getElementById('btn-voltar');
    if (!botao) return;

    if (historico.length === 0) {
        botao.hidden = true;
        return;
    }

    const destino = historico[historico.length - 1];
    botao.hidden = false;
    botao.setAttribute('aria-label', `Voltar para ${destino.titulo}`);
}
