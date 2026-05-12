import { registrarBloco } from '../registry.js';
import { CLASSES }        from '../config.js';
import { salvar }         from '../state.js';

function formatarTamanho(bytes) {
    if (bytes < 1024)    return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
}

function renderizarListaArquivos(lista, arquivos) {
    lista.innerHTML = '';
    arquivos.forEach(f => {
        const li = document.createElement('li');
        li.textContent = `${f.name} (${formatarTamanho(f.size)})`;
        lista.appendChild(li);
    });
}

function validarArquivos(files, bloco) {
    if (bloco.maxFiles && files.length > bloco.maxFiles) {
        return `Você pode anexar no máximo ${bloco.maxFiles} arquivo(s).`;
    }
    for (const file of files) {
        if (bloco.maxSize && file.size > bloco.maxSize) {
            const max = Math.round(bloco.maxSize / 1048576);
            return `O arquivo "${file.name}" excede o tamanho máximo de ${max} MB.`;
        }
    }
    return null; // sem erros
}

registrarBloco('file', (bloco) => {
    const id      = `campo-${bloco.key}`;
    const infoId  = `file-info-${bloco.key}`;

    const label = document.createElement('label');
    label.htmlFor     = id;
    label.textContent = bloco.label;

    if (bloco.optional) {
        const span = document.createElement('span');
        span.className   = CLASSES.campoOpcional;
        span.textContent = ' (opcional)';
        label.appendChild(span);
    }

    const info = document.createElement('p');
    info.className   = CLASSES.fileInfo;
    info.id          = infoId;
    const maxMB      = Math.round((bloco.maxSize || 0) / 1048576);
    info.textContent = `Formatos aceitos: ${bloco.accept} · Máx. ${bloco.maxFiles} arquivo(s) · Tamanho máx. ${maxMB} MB cada`;

    const input = document.createElement('input');
    input.type     = 'file';
    input.id       = id;
    input.name     = bloco.key;
    input.accept   = bloco.accept   || '';
    input.multiple = bloco.multiple || false;
    input.setAttribute('aria-describedby', infoId);

    const lista = document.createElement('ul');
    lista.className = CLASSES.fileList;
    lista.setAttribute('aria-live', 'polite');

    input.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        const erro  = validarArquivos(files, bloco);

        if (erro) {
            alert(erro);
            input.value = '';
            return;
        }

        salvar(bloco.key, {
            arquivos:  files.map(f => ({ name: f.name, size: f.size, type: f.type, lastModified: f.lastModified })),
            _files:    files,   // referência para upload posterior
        });

        renderizarListaArquivos(lista, files);
    });

    const container = document.createElement('div');
    container.className = CLASSES.campoFormulario;
    container.appendChild(label);
    container.appendChild(info);
    container.appendChild(input);
    container.appendChild(lista);
    return container;
});
