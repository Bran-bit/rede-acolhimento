import './blocos/index.js';

import { CLASSES }             from './config.js';
import { voltarTela }          from './navigation.js';
import { renderizarTelaAtual } from './renderer.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById(CLASSES.container);
    if (!container) {
        console.error(`Container #${CLASSES.container} não encontrado no HTML.`);
        return;
    }

    // Atributos de acessibilidade fixos — definidos uma vez, não a cada render.
    container.setAttribute('role',        'region');
    container.setAttribute('aria-live',   'polite');
    container.setAttribute('aria-atomic', 'true');

    // Listener do botão Voltar registrado uma única vez.
    document.getElementById('btn-voltar')
        ?.addEventListener('click', voltarTela);

    renderizarTelaAtual();
});
