import { registrarBloco } from '../registry.js';
import { ler }            from '../state.js';

registrarBloco('validacao', (bloco) => {
    const chave = bloco.key;
    let texto = '';

    if (chave === 'validacao_impacto') {
        const impacto = ler('risco_permanencia');
        const mapa = {
            'desconforto': 'Você relatou que a situação gerou desconforto, mas não afetou diretamente sua permanência. Isso é importante de ser registrado.',
            'medo': 'Você relatou que está com medo de frequentar atividades. Isso merece atenção e cuidado.',
            'abandono': 'Você está considerando abandonar disciplinas ou o curso. Isso é muito sério e o campus precisa agir.',
            'evitado': 'Você tem evitado espaços ou pessoas no campus. Nenhum estudante deveria passar por isso.',
            'bemestar': 'A situação está afetando seu bem-estar emocional. Isso é tão importante quanto qualquer outro impacto.',
        };
        texto = mapa[impacto] || '';
    }

    if (chave === 'validacao_tipo') {
        const tipo = ler('tipo_violencia');
        if (tipo) {
            texto = 'A situação que você viveu é séria e o campus tem o dever de proteger você e outras pessoas.';
        }
    }

    if (chave === 'encaminhamento') {
        texto = 'Você não está sozinho(a). A equipe do campus está preparada para acolher seu relato com respeito e sigilo.';
    }

    if (!texto) return null;

    const p = document.createElement('p');
    p.textContent = texto;
    return p;
});