import { registrarBloco } from '../registry.js';
import { CLASSES }        from '../config.js';
import { salvar, ler }    from '../state.js';
import { adicionarValidacao } from '../validacao.js';

function criarLabel(bloco, htmlFor) {
    const label = document.createElement('label');
    label.htmlFor = htmlFor;
    label.textContent = bloco.label;

    if (bloco.optional) {
        const span = document.createElement('span');
        span.className = CLASSES.campoOpcional;
        span.textContent = ' (opcional)';
        label.appendChild(span);
    }

    return label;
}

function envolverCampo(...elementos) {
    const container = document.createElement('div');
    container.className = CLASSES.campoFormulario;
    elementos.forEach(el => container.appendChild(el));
    return container;
}

registrarBloco('input', (bloco) => {
    const id = `campo-${bloco.key}`;

    const input = document.createElement('input');
    input.type        = bloco.inputType || 'text';
    input.id          = id;
    input.name        = bloco.key;
    input.placeholder = bloco.placeholder || '';
    input.value       = ler(bloco.key) ?? '';
    if (bloco.required) input.required = true;
    if (bloco.pattern)  input.pattern  = bloco.pattern;

    input.addEventListener('input', (e) => salvar(bloco.key, e.target.value));

    const container = envolverCampo(criarLabel(bloco, id), input);
    adicionarValidacao(input, bloco, container);
    return container;
});

registrarBloco('textarea', (bloco) => {
    const id = `campo-${bloco.key}`;

    const textarea = document.createElement('textarea');
    textarea.id          = id;
    textarea.name        = bloco.key;
    textarea.rows        = bloco.rows || 4;
    textarea.placeholder = bloco.placeholder || '';
    textarea.textContent = ler(bloco.key) ?? '';
    if (bloco.required) textarea.required = true;

    textarea.addEventListener('input', (e) => salvar(bloco.key, e.target.value));

    const container = envolverCampo(criarLabel(bloco, id), textarea);
    adicionarValidacao(textarea, bloco, container);
    return container;
});

registrarBloco('select', (bloco) => {
    const id = `campo-${bloco.key}`;

    const select = document.createElement('select');
    select.id   = id;
    select.name = bloco.key;
    if (bloco.required) select.required = true;

    if (bloco.placeholder) {
        const opt = document.createElement('option');
        opt.value       = '';
        opt.textContent = bloco.placeholder;
        opt.disabled    = true;
        opt.selected    = true;
        select.appendChild(opt);
    }

    bloco.options.forEach(opcao => {
        const opt = document.createElement('option');
        if (typeof opcao === 'string') {
            opt.value = opt.textContent = opcao;
        } else {
            opt.value       = opcao.value;
            opt.textContent = opcao.label;
        }
        if (ler(bloco.key) === opt.value) opt.selected = true;
        select.appendChild(opt);
    });

    select.addEventListener('change', (e) => salvar(bloco.key, e.target.value));

    const container = envolverCampo(criarLabel(bloco, id), select);
    adicionarValidacao(select, bloco, container);
    return container;
});

// radio é um caso especial — a validação é no fieldset, não em cada input
registrarBloco('radio', (bloco) => {
    const fieldset = document.createElement('fieldset');
    fieldset.className = CLASSES.campoFormulario;

    const legend = document.createElement('legend');
    legend.id          = `legend-${bloco.key}`;
    legend.textContent = bloco.label;

    if (bloco.optional) {
        const span = document.createElement('span');
        span.className   = CLASSES.campoOpcional;
        span.textContent = ' (opcional)';
        legend.appendChild(span);
    }

    const group = document.createElement('div');
    group.className = CLASSES.radioOptions;
    group.setAttribute('role', 'radiogroup');
    group.setAttribute('aria-labelledby', legend.id);

    bloco.options.forEach((opcao, i) => {
        const id = `radio-${bloco.key}-${i}`;

        const input = document.createElement('input');
        input.type    = 'radio';
        input.id      = id;
        input.name    = bloco.key;
        input.value   = opcao.value;
        input.checked = ler(bloco.key) === opcao.value;

        input.addEventListener('change', (e) => {
            if (e.target.checked) salvar(bloco.key, e.target.value);
        });

            const label = document.createElement('label');
            label.htmlFor     = id;
            label.textContent = opcao.label;

            const wrapper = document.createElement('div');
            wrapper.className = CLASSES.radioOption;
            wrapper.appendChild(input);
            wrapper.appendChild(label);
            group.appendChild(wrapper);
    });

    fieldset.appendChild(legend);
    fieldset.appendChild(group);
    return fieldset;
});
