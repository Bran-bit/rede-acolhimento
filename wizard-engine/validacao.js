/**
 * Módulo puro de validação.
 * Não conhece DOM, não conhece acessibilidade, não conhece campos.
 * Testável sem browser.
 *
 * Regras de formato (regex) vivem em config/padroes.js
 * para evitar duplicação com resolverLinks.js.
 */

import { PADROES } from './config/padroes.js';

/**
 * Valida um valor conforme as regras do bloco.
 * @param {string} valor - Valor a ser validado (já trimado)
 * @param {Object} bloco - Definição do bloco (required, inputType, pattern, errorMessage)
 * @returns {string} Mensagem de erro ou '' se válido
 */
export function validarInput(valor, bloco) {
    if (bloco.required && valor === '') {
        return bloco.errorMessage || 'Este campo é obrigatório.';
    }

    if (bloco.inputType && valor !== '') {
        const padrao = PADROES[bloco.inputType];
        if (padrao && !padrao.validar(valor)) {
            return bloco.errorMessage || padrao.erro(valor);
        }
    }

    if (bloco.pattern && valor !== '') {
        if (!new RegExp(bloco.pattern).test(valor)) {
            return bloco.errorMessage || 'Formato inválido.';
        }
    }

    return '';
}

/**
 * Percorre os campos obrigatórios de um formulário e coleta erros.
 * Não toca no DOM — apenas lê valores e retorna o que está errado.
 *
 * @param {HTMLFormElement} form
 * @returns {{ campo: HTMLElement, mensagem: string }[]}
 *   Array de erros. Array vazio significa formulário válido.
 */
export function validarFormulario(form) {
    const campos = form.querySelectorAll('input[required], textarea[required], select[required]');
    const erros = [];

    campos.forEach(campo => {
        if (campo.type === 'radio') {
            const grupo = Array.from(form.querySelectorAll(`input[name="${campo.name}"]`));
            if (campo !== grupo[0]) return; // processa o grupo só uma vez
            if (!grupo.some(r => r.checked))
                erros.push({ campo: grupo[0], mensagem: 'Selecione uma opção.' });
        } else if (campo.value.trim() === '') {
            erros.push({ campo, mensagem: 'Este campo é obrigatório.' });
        }
    });

    return erros;
}