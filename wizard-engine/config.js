const BASE_URL = window.location.hostname.includes('github.io') 
    ? '/rede-acolhimento' 
    : '';


export const CLASSES = {
    container:       'wizard-container',
    perguntaDestaque:'pergunta-destaque',
    alerta:          'alerta',
    listaOpcoes:     'opcoes-lista',
    linkExterno:     'acao-externa',
    srOnly:          'sr-only',
    campoFormulario: 'campo-formulario',
    campoOpcional:   'campo-opcional',
    campoInvalido:   'campo-invalido',
    radioOptions:    'radio-options',
    radioOption:     'radio-option',
    fileInfo:        'file-info',
    fileList:        'file-list',
    botaoSubmit:     'botao-submit',
    wizardForm:      'wizard-form',
};

export const mapaAcoesExternas = {
    whatsappCAE:     'https://wa.me/5513991866188',
    whatsappCSP:     'https://wa.me/5513981970063',
    emailCAE:        'mailto:cae.cbt@ifsp.edu.br',
    emailCSP:        'mailto:csp.cbt@ifsp.edu.br',
    ondeBuscarApoio: `${BASE_URL}/artigos/grupos-apoio.html`,
};
