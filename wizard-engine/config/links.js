const BASE_URL = window.location.hostname.includes('github.io') 
    ? '/rede-acolhimento' 
    : '';

export const linksOpcoes = {
    emailCAE:    { tipo: 'email',    valor: 'cae.cbt@ifsp.edu.br' },
    emailCSP:    { tipo: 'email',    valor: 'csp.cbt@ifsp.edu.br' },
    whatsappCAE: { tipo: 'whatsapp', valor: '5513991866188' },
    whatsappCSP: { tipo: 'whatsapp', valor: '5513981970063' },
    ondeBuscarApoio: { tipo: 'url', valor: `${BASE_URL}/artigos/grupos-apoio.html` },
};
