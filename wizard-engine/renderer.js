import { CLASSES, mapaAcoesExternas } from './config.js';
import { salvarVarios, existe, obterTodas }       from './state.js';
import { telaAtualId, navegarParaTela, atualizarBotaoVoltar } from './navigation.js';
import { renderizarBloco }            from './registry.js';

// ===== Opções =====

function deveOcultarOpcao(opcao) {
    return opcao.hideIf?.length
        ? opcao.hideIf.every(chave => existe(chave))
        : false;
}

function criarBotaoNavegacao(opcao, tela) {
    const botao = document.createElement('button');
    botao.type        = 'button';
    botao.textContent = opcao.label;

    botao.addEventListener('click', () => {
        if (opcao.set) salvarVarios(opcao.set);
        const destinoBruto = opcao.next || tela.defaultNext;
        const destino = typeof destinoBruto === 'function' 
            ? destinoBruto(obterTodas())  // ← estado real
            : destinoBruto;
        if (destino) navegarParaTela(destino);
    });

    return botao;
}

function criarLinkExterno(opcao) {
    const { type, key, url } = opcao.effect;

    let href = '#';
    if (type === 'whatsapp' || type === 'mailto') {
        href = mapaAcoesExternas[key] || '#';
    } else if (type === 'url') {
        href = url || mapaAcoesExternas[key] || '#';
    }

    const link = document.createElement('a');
    link.href = href;
    link.classList.add(CLASSES.linkExterno);

    // Abertura em nova aba apenas para URLs que NÃO são mailto
    if (type !== 'mailto') {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    }

    link.appendChild(document.createTextNode(opcao.label));

    const srSpan = document.createElement('span');
    srSpan.className = CLASSES.srOnly;
    srSpan.textContent = type === 'mailto' 
        ? ' (abre seu cliente de e-mail)' 
        : ' (abre em nova aba)';
    link.appendChild(srSpan);

    link.addEventListener('click', () => {
        if (opcao.set) salvarVarios(opcao.set);
    });

    return link;
}

function criarListaOpcoes(tela) {
    const visiveis = (tela.options || []).filter(o => !deveOcultarOpcao(o));

    if (visiveis.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'Nenhuma opção disponível.';
        return p;
    }

    const lista = document.createElement('ul');
    lista.className = CLASSES.listaOpcoes;
    lista.setAttribute('role', 'list');

    visiveis.forEach(opcao => {
        const li      = document.createElement('li');
        const control = opcao.effect
            ? criarLinkExterno(opcao)
            : criarBotaoNavegacao(opcao, tela);
        li.appendChild(control);
        lista.appendChild(li);
    });

    return lista;
}

// ===== Formulário (telas com submit) =====

function criarBotaoSubmit(tela) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.textContent = tela.submit.label;
    botao.className = CLASSES.botaoSubmit;

    botao.addEventListener('click', () => {
        const container = document.getElementById(CLASSES.container);
        
        // Dispara blur em todos os campos para mostrar erros de validação
        const campos = container.querySelectorAll('input, textarea, select');
        campos.forEach(c => c.dispatchEvent(new Event('blur', { bubbles: true })));

        // Aguarda um instante para as validações processarem
        setTimeout(() => {
            // Verifica se há campos inválidos
            const invalidos = container.querySelectorAll('[aria-invalid="true"], .campo-invalido');
            
            if (invalidos.length > 0) {
                invalidos[0].focus();
                return;
            }

            // Se chegou aqui, está tudo válido
            if (tela.submit.set) salvarVarios(tela.submit.set);
            const destino = tela.submit.next || tela.defaultNext;
            if (destino) navegarParaTela(destino);
        }, 100);
    });

    return botao;
}

// ===== Renderização principal =====

export function renderizarTelaAtual() {
    const tela = telas[telaAtualId];
    if (!tela) {
        console.error(`Tela não encontrada: ${telaAtualId}`);
        return;
    }

    const container = document.getElementById(CLASSES.container);
    if (!container) {
        console.error(`Container #${CLASSES.container} não encontrado.`);
        return;
    }

    // Preserva o botão Voltar (que vive fora do ciclo de render)
    const botaoVoltar = document.getElementById('btn-voltar');
    container.innerHTML = '';
    if (botaoVoltar) container.appendChild(botaoVoltar);

    // Título
    const h1 = document.createElement('h1');
    h1.id          = `titulo-${telaAtualId}`;
    h1.tabIndex    = -1;
    h1.textContent = tela.title;
    container.appendChild(h1);
    container.setAttribute('aria-labelledby', h1.id);

    // Blocos de conteúdo
    const fragment = document.createDocumentFragment();
    (tela.content || []).forEach(bloco => {
        const el = renderizarBloco(bloco);
        if (el) fragment.appendChild(el);
    });
    container.appendChild(fragment);

    // Opções de navegação OU botão submit
    if (tela.submit) {
        container.appendChild(criarBotaoSubmit(tela));
    } else {
        container.appendChild(criarListaOpcoes(tela));
    }

    atualizarBotaoVoltar();

    // Move foco para o título para que leitores de tela releiam o conteúdo
    h1.focus();
}