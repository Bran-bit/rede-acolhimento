import { registrarBloco } from '../registry.js';
import { ler }            from '../state.js';

// Tradutores (valores → texto humanizado)
const TRADUTORES = {
    risco_permanencia: {
        'desconforto': 'Embora não tenha afetado diretamente minha permanência, sinto-me desconfortável com a situação.',
        'evitado': 'Tenho evitado espaços ou pessoas no campus em decorrência do ocorrido.',
        'medo': 'Sinto medo de frequentar determinadas atividades no campus.',
        'abandono': 'Estou considerando abandonar disciplinas ou o curso por conta da situação.',
        'bemestar': 'A situação tem afetado significativamente meu bem-estar emocional.',
        'naoresponder': 'Prefiro não detalhar o impacto na minha permanência.'
    },
    envolvidos: {
        'estudante': 'Estudante',
        'docente': 'Docente',
        'servidor': 'Servidor(a)',
        'terceirizado': 'Terceirizado(a)',
        'grupo': 'Grupo de pessoas',
        'naosei': 'Não sei identificar',
        'naoresponder': 'Prefiro não informar'
    },
    tipo_violencia: {
        'nome_social': 'Não respeitaram meu nome social ou pronomes.',
        'piadas': 'Sofri piadas ou comentários ofensivos.',
        'exclusao': 'Fui excluído(a) de grupos ou trabalhos.',
        'assedio': 'Sofri assédio.',
        'agressao': 'Sofri uma agressão física.',
        'incerteza': 'Não tenho certeza sobre a natureza do ocorrido, mas estou desconfortável.'
    },
    periodo: {
        'matutino': 'matutino',
        'vespertino': 'vespertino',
        'noturno': 'noturno'
    }
};

// ===== Gerador de texto =====
function gerarTextoRelato() {
    const partes = [];
    const temIdentificacao = ler('nome') || ler('curso') || ler('prontuario');

    // Cabeçalho com identificação (se houver)
    if (temIdentificacao) {
        const id = [];
        if (ler('nome')) id.push(`Eu, ${ler('nome')},`);
        if (ler('curso')) {
            let info = `aluno(a) do curso ${ler('curso')}`;
            if (ler('periodo') && ler('periodo') !== 'nao_informar') {
                info += ` (período ${ler('periodo')})`;
            }
            id.push(info);
        }
        if (ler('prontuario')) id.push(`prontuário ${ler('prontuario')}`);
        partes.push(id.join(' ') + ', relato que:');
    } else {
        partes.push('Relato que:');
    }

    // Fatos (cada um aparece apenas se o dado existir)
    if (ler('local'))       partes.push(`• A situação ocorreu em: ${ler('local')}.`);
    if (ler('data'))        partes.push(`• Data/período: ${ler('data')}.`);
    if (ler('risco_permanencia')) partes.push(`• Impacto na permanência: ${TRADUTORES.risco_permanencia[ler('risco_permanencia')] || ler('risco_permanencia')}`);
    if (ler('envolvidos'))  partes.push(`• Pessoa(s) envolvida(s): ${TRADUTORES.envolvidos[ler('envolvidos')] || ler('envolvidos')}.`);
    if (ler('tipo_violencia')) partes.push(`• Tipo de situação: ${TRADUTORES.tipo_violencia[ler('tipo_violencia')] || ler('tipo_violencia')}`);

    // Evidências
    const evidencias = ler('evidencias');
    if (evidencias && Array.isArray(evidencias) && evidencias.length > 0) {
        const nomes = evidencias.map(f => f.name).join(', ');
        partes.push(`• Anexei as seguintes evidências: ${nomes}.`);
    }

    // Complemento
    if (ler('complemento')) partes.push(`• Informações adicionais: ${ler('complemento')}`);

    // Se não há fatos, adiciona mensagem humanizada
    const temFatos = partes.length > 1;
    if (!temFatos) {
        partes.push('• O usuário optou por não detalhar a situação, mas utilizou o formulário para registrar o ocorrido.');
    }

    // Fechamento
    if (ler('identificacao') === 'identificado') {
        partes.push('\nSolicito que este relato seja tratado de forma identificada.');
        if (ler('email')) partes.push(`Meu e-mail para contato é: ${ler('email')}`);
    } else if (ler('identificacao') === 'anonimo') {
        partes.push('\nSolicito que este relato seja tratado de forma anônima.');
    }

    return partes.join('\n');
}

// ===== Registro do bloco =====

registrarBloco('relato', (bloco) => {
    const texto = gerarTextoRelato();

    // Se não houver conteúdo relevante, não renderiza
    if (!texto || texto.trim() === 'Relato que:' || texto.trim() === '') {
        return null;
    }

    const container = document.createElement('div');
    container.className = 'relato-texto';

    if (bloco.title) {
        const h2 = document.createElement('h2');
        h2.textContent = bloco.title;
        container.appendChild(h2);
    }

    const pre = document.createElement('pre');
    pre.textContent = texto;
    pre.style.whiteSpace = 'pre-wrap';
    pre.style.fontFamily = 'inherit';
    pre.style.background = '#f8f9fa';
    pre.style.padding = '1rem';
    pre.style.borderRadius = '4px';
    pre.style.border = '1px solid #dee2e6';
    pre.style.lineHeight = '1.6';
    container.appendChild(pre);

    return container;
});