import { registrarBloco } from '../registry.js';
import { CLASSES }        from '../config.js';
import { ler }            from '../state.js';

// ===== Substituição de marcadores =====
const REGEX_MARCADOR = /\{\{\s*(.+?)\s*\}\}/g;

function substituirMarcadores(texto) {
    return texto.replace(REGEX_MARCADOR, (_, chave) =>
        ler(chave) ?? `{{${chave}}}`
    );
}

// ===== Registros =====

registrarBloco('paragraph', (bloco) => {
    const p = document.createElement('p');
    p.innerHTML = substituirMarcadores(bloco.text);
    return p;
});

registrarBloco('question', (bloco) => {
    const h2 = document.createElement('h2');
    h2.className = CLASSES.perguntaDestaque;
    h2.textContent = substituirMarcadores(bloco.text);
    return h2;
});

registrarBloco('alert', (bloco) => {
    const div = document.createElement('div');
    div.className = CLASSES.alerta;
    div.setAttribute('role', 'alert');
    div.textContent = substituirMarcadores(bloco.text);
    return div;
});

registrarBloco('divider', () => document.createElement('hr'));
