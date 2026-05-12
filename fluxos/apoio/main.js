import '../../wizard-engine/blocos/index.js';
import { CLASSES } from '../../wizard-engine/config.js';
import { voltarTela } from '../../wizard-engine/navigation.js';
import { renderizarTelaAtual } from '../../wizard-engine/renderer.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById(CLASSES.container);
    if (!container) {
        console.error(`Container #${CLASSES.container} não encontrado.`);
        return;
    }

    container.setAttribute('role', 'region');
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');

    const botaoVoltar = document.getElementById('btn-voltar');
    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', voltarTela);
    }

    renderizarTelaAtual();
});