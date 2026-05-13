const formatos = {
    email: {
        validar: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
        formatar: (v) => `mailto:${v.trim()}`,
        erro: (v) => `E-mail inválido: "${v}"`,
    },
    whatsapp: {
        normalizar: (v) => v.replace(/\D/g, ''),
        validar: (v) => /^\d{12,13}$/.test(v.replace(/\D/g, '')),
        formatar: (v) => `https://wa.me/${v.replace(/\D/g, '')}`,
        erro: (v) => `WhatsApp inválido: "${v}"`,
    },
    url: {
        validar: (v) => v.startsWith('/') || v.startsWith('http'),
        formatar: (v) => v,
        erro: (v) => `URL inválida: "${v}"`,
    },
};

export function resolverLink(nomeLinks, listaLinks) {
    const entrada = listaLinks[nomeLinks];
    if (!entrada) throw new Error(`Link não encontrado: "${nomeLinks}"`);
    const formato = formatos[entrada.tipo];   
    if (!formato)
        throw new Error(`Formato desconhecido: "${entrada.tipo}"`);
    if (!formato.validar(entrada.valor))     
        throw new Error(formato.erro(entrada.valor));
    return formato.formatar(entrada.valor);   
}