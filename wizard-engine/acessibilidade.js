/**
 * Módulo central de acessibilidade.
 * Concentra todos os atributos ARIA, textos acessíveis e comportamentos
 * de foco para facilitar ajustes baseados em feedback de usuários.
 */

/**
 * Torna um link externo acessível.
 * - Abre em nova aba com segurança (rel="noopener noreferrer")
 * - Adiciona ícone visual com aria-label para leitores de tela
 */
export function tornarLinkAcessivel(elementoLink) {
    elementoLink.target = '_blank';
    elementoLink.rel = 'noopener noreferrer';

    const icone = document.createElement('span');
    icone.setAttribute('aria-label', 'abre em nova aba');
    icone.setAttribute('role', 'img');
    icone.textContent = ' ↗';
    elementoLink.appendChild(icone);
}

/**
 * Torna um botão acessível.
 * - Define type="button" para evitar submissão acidental de formulários
 */
export function tornarBotaoAcessivel(botao) {
    botao.type = 'button';
}

/**
 * Torna uma lista de opções acessível.
 * - Define role="list" para leitores de tela
 */
export function tornarListaAcessivel(lista) {
    lista.setAttribute('role', 'list');
}

/**
 * Configura a região do wizard com atributos de acessibilidade.
 * - role="region" com nome acessível
 * - aria-live="polite" para anunciar mudanças
 * - aria-atomic="true" para anunciar a região inteira
 */
export function configurarRegiao(container, tituloId) {
    container.setAttribute('role', 'region');
    container.setAttribute('aria-labelledby', tituloId);
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
}

/**
 * Torna o título da tela focável para leitores de tela.
 * - tabIndex=-1 permite foco programático sem entrar na ordem de tabulação
 * - O foco é movido para o título a cada troca de tela
 */
export function tornarTituloFocavel(h1) {
    h1.tabIndex = -1;
}

/**
 * Move o foco para o título para que leitores de tela anunciem a nova tela.
 */
export function focarTitulo(tituloId) {
    const h1 = document.getElementById(tituloId);
    if (h1) h1.focus();
}

/**
 * Atualiza o botão Voltar com o nome acessível correto.
 * - Esconde na tela inicial (hidden)
 * - Exibe com aria-label descritivo nas demais telas
 */
export function atualizarBotaoVoltar(botao, podeVoltar, tituloAnterior) {
    if (!botao) return;

    if (!podeVoltar) {
        botao.hidden = true;
        return;
    }

    botao.hidden = false;
    botao.setAttribute('aria-label', `Voltar para ${tituloAnterior}`);
}

/**
 * Cria um span de erro acessível associado a um campo.
 * - role="alert" para anúncio automático
 */
export function criarSpanErro(idCampo) {
    const span = document.createElement('span');
    span.className = 'campo-erro';
    span.id = `erro-${idCampo}`;
    span.setAttribute('role', 'alert');
    span.hidden = true;
    return span;
}

/**
 * Exibe ou esconde a mensagem de erro de um campo.
 * - Atualiza aria-invalid e o texto do span
 */
export function mostrarErro(campo, spanErro, mensagem) {
    if (mensagem) {
        spanErro.textContent = mensagem;
        spanErro.hidden = false;
        campo.setAttribute('aria-invalid', 'true');
    } else {
        spanErro.textContent = '';
        spanErro.hidden = true;
        campo.setAttribute('aria-invalid', 'false');
    }
}