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

export const linksOpcoes = {
    emailCAE:    { tipo: 'email',    valor: 'cae.cbt@ifsp.edu.br' },
    emailCSP:    { tipo: 'email',    valor: 'csp.cbt@ifsp.edu.br' },
    whatsappCAE: { tipo: 'whatsapp', valor: '5513991866188' },
    whatsappCSP: { tipo: 'whatsapp', valor: '5513981970063' },
    ondeBuscarApoio: { tipo: 'url', valor: `${BASE_URL}/artigos/grupos-apoio.html` },
};
