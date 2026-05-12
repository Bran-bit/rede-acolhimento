# Rede de Acolhimento — REATRANS

## Sobre o projeto

A **Rede de Acolhimento** (sem nome definido ainda) é uma plataforma digital desenvolvida para acolher, orientar e encaminhar estudantes do IFSP Campus Cubatão em situações de violência, discriminação ou sofrimento psíquico, com atenção especial às questões de gênero e sexualidade.

O projeto é baseado na Cartilha de Combate à LGBTQIAPN+Fobia no Ambiente Educacional, produzida pelo Grupo de Pesquisas REATRANS (Rede Antitransfobia).

---

##  Funcionalidades

- **Wizard de acolhimento** — formulário multietapas com navegação condicional
- **Relato adaptativo** — geração automática de texto narrativo baseado nas respostas
- **Validação acessível** — mensagens de erro com `role="alert"` para leitores de tela
- **Múltiplos fluxos** — motor reutilizável para diferentes contextos (ajuda, testemunha, informação)
- **Links externos** — integração com WhatsApp, e-mail e recursos institucionais
- **Upload seguro** — validação de tipo e tamanho de arquivos

---

##  Arquitetura

O projeto é dividido em duas partes:

| Componente | Descrição |
|---|---|
| `index.html` + `principal.css` | Página inicial com informações, grupos de apoio e links para os fluxos |
| `wizard-engine/` | Motor declarativo do wizard (zero dependências, JavaScript vanilla) |
| `fluxos/` | Cada pasta contém um fluxo específico (`apoio/`, `testemunha/`, `entender/`) |

### Motor do wizard

O motor é baseado em uma **estrutura de dados declarativa** (`telas.js`) que define:

- Título e conteúdo de cada tela (`paragraph`, `question`, `alert`, `divider`)
- Campos de formulário (`input`, `textarea`, `select`, `radio`, `file`)
- Validação (`required`, `pattern`, `inputType`)
- Navegação condicional (`next`, `defaultNext`, `hideIf`)
- Placeholders adaptativos (`{{chave}}`)
- Ações externas (`whatsapp`, `mailto`, `url`, `action`)

O renderizador interpreta essa estrutura e gera a interface dinamicamente, com:

- Acessibilidade (ARIA, foco automático, navegação por teclado)
- Sistema de plugins para novos tipos de bloco
- Salvamento de respostas com timestamp
- Geração de relato narrativo

