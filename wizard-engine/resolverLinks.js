import { PADROES as formatos } from './config/padroes.js';



export function resolverLink(nomeLinks, listaLinks) {
    const enderecoLink = listaLinks[nomeLinks];
    if (!enderecoLink) {
        console.error(`[resolverLink] Link não encontrado: "${nomeLinks}"`);
        return null;
    }
    const formato = formatos[enderecoLink.tipo];   
    if (!formato) {
        console.error(`[resolverLink] Formato desconhecido: "${enderecoLink.tipo}"`);
        return null;
    }
    if (!formato.validar(enderecoLink.valor)) {
        console.error(`[resolverLink] ${formato.erro(enderecoLink.valor)}`);
        return null;
    }
    return formato.formatar(enderecoLink.valor);   
}