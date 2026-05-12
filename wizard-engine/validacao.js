import { CLASSES } from './config.js';

/**
 * Cria um span de erro acessível associado a um campo.
 * Usa role="alert" para anúncio automático por leitores de tela.
 */
export function criarSpanErro(idCampo) {
    const span = document.createElement('span');
    span.className = 'campo-erro';
    span.id        = `erro-${idCampo}`;
    span.setAttribute('role', 'alert');
    span.hidden = true;
    return span;
}

/**
 * Exibe ou esconde a mensagem de erro de um campo.
 * Passar mensagem vazia limpa o estado de erro.
 */
export function mostrarErro(campo, spanErro, mensagem) {
    if (mensagem) {
        spanErro.textContent = mensagem;
        spanErro.hidden = false;
        campo.setAttribute('aria-invalid', 'true');
        campo.classList.add(CLASSES.campoInvalido);
    } else {
        spanErro.textContent = '';
        spanErro.hidden = true;
        campo.setAttribute('aria-invalid', 'false');
        campo.classList.remove(CLASSES.campoInvalido);
    }
}

/**
 * Valida um <input> conforme as regras do bloco.
 * Retorna a mensagem de erro, ou '' se válido.
 */
export function validarInput(input, bloco) {
    const valor = input.value.trim();

    if (bloco.required && valor === '')
        return bloco.errorMessage || 'Este campo é obrigatório.';

    if (bloco.inputType === 'email' && valor !== '') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor))
            return bloco.errorMessage || 'Formato de e-mail inválido.';
    }

    if (bloco.pattern && valor !== '') {
        if (!new RegExp(bloco.pattern).test(valor))
            return bloco.errorMessage || 'Formato inválido.';
    }

    return '';
}

/**
 * Valida todos os campos obrigatórios de um <form>.
 * Retorna true se tudo válido; foca o primeiro campo inválido se não.
 */
export function validarFormulario(form) {
    const campos = form.querySelectorAll('input[required], textarea[required], select[required]');
    let valido = true;

    campos.forEach(campo => {
        if (campo.type === 'radio') {
            // Radio: valida o grupo inteiro uma única vez (pelo primeiro elemento)
            const grupo    = Array.from(form.querySelectorAll(`input[name="${campo.name}"]`));
            const primeiro = grupo[0];
            if (campo !== primeiro) return; // evita revalidar o mesmo grupo

            const marcado = grupo.some(r => r.checked);
            const spanErro = form.querySelector(`#erro-${campo.name}`);
            const fieldset = campo.closest('fieldset');

            if (!marcado) {
                valido = false;
                if (spanErro) {
                    spanErro.textContent = 'Selecione uma opção.';
                    spanErro.hidden = false;
                }
                fieldset?.classList.add(CLASSES.campoInvalido);
            }
        } else if (campo.value.trim() === '') {
            valido = false;
            const spanErro = form.querySelector(`#erro-${campo.name || campo.id.replace('campo-', '')}`);
            campo.classList.add(CLASSES.campoInvalido);
            campo.setAttribute('aria-invalid', 'true');
            if (spanErro) {
                spanErro.textContent = 'Este campo é obrigatório.';
                spanErro.hidden = false;
            }
        }
    });

    if (!valido) {
        const primeiro = form.querySelector(
            `.${CLASSES.campoInvalido} input, .${CLASSES.campoInvalido} textarea, .${CLASSES.campoInvalido} select`
        );
        primeiro?.focus();
    }

    return valido;
}

/**
 * Adiciona validação acessível a um campo de formulário já criado.
 *
 * @param {HTMLElement} campo - O elemento de entrada (input, textarea, select)
 * @param {Object} bloco - A definição do bloco (com key, required, pattern, etc.)
 * @param {HTMLElement} container - O container que envolve o campo (para anexar o span de erro)
 */
export function adicionarValidacao(campo, bloco, container) {
    const spanErro = criarSpanErro(bloco.key);
    container.appendChild(spanErro);
    campo.setAttribute('aria-describedby', spanErro.id);

    const validar = () => {
        const erro = validarInput(campo, bloco);
        mostrarErro(campo, spanErro, erro);
    };

    campo.addEventListener('blur', validar);

    // Revalida em tempo real se já estava inválido
    campo.addEventListener('input', () => {
        if (campo.getAttribute('aria-invalid') === 'true') validar();
    });

        // Para select, usa change em vez de input
        if (campo.tagName === 'SELECT') {
            campo.addEventListener('change', () => {
                if (campo.getAttribute('aria-invalid') === 'true') validar();
            });
        }
}
