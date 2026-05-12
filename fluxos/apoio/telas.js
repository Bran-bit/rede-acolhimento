
const telaInicial = 'inicio';

const telas = {

  inicio: {
    title: "Algo aconteceu comigo",
    content: [
      { type: "paragraph", text: "Este espaço existe para orientar, acolher e ajudar você a entender quais caminhos estão disponíveis." },
      { type: "paragraph", text: "Você pode conversar com a equipe do campus mesmo sem fazer uma denúncia formal." },
      { type: "paragraph", text: "Escolha como deseja seguir. Nenhuma informação será compartilhada sem sua autorização." }
    ],
    options: [
      { label: "Quero conversar com alguém", next: "canais" },
      { label: "Quero entender minhas opções", next: "menu_opcoes" },
      { label: "Quero registrar oficialmente o ocorrido", next: "forma_contato" }
    ]
  },

  // =====================
  // CONVERSAR COM ALGUÉM
  // =====================
  canais: {
    title: "Canais de atendimento",
    content: [
      { type: "paragraph", text: "Você pode conversar com alguém do campus agora mesmo." },
      { type: "paragraph", text: "O objetivo é ouvir você, entender o que está acontecendo e ajudar a clarear os próximos passos, sem pressa e sem julgamento." },
      { type: "question", text: "Como prefere o atendimento?" }
    ],
    options: [
      { label: "Presencial", next: "atendimento_presencial" },
      { label: "WhatsApp", next: "contato_whatsapp" },
      { label: "E-mail", next: "contato_email" }
    ]
  },

  atendimento_presencial: {
    title: "Atendimento Presencial",
    content: [
      { type: "paragraph", text: "Procure a sala da CAE no campus." },
      { type: "paragraph", text: "Um servidor da CAE irá te receber. A conversa é reservada. Se preferir, pode levar alguém de sua confiança." }
    ],
    options: [
      { label: "Voltar ao início", next: "inicio" }
    ]
  },

  contato_whatsapp: {
    title: "Atendimento via WhatsApp",
    content: [
      { type: "paragraph", text: "Você pode chamar tanto a CAE quanto a CSP pelo WhatsApp, bastando clicar em uma das opções a seguir." },
      { type: "paragraph", text: "A CAE é a porta de entrada para orientações e encaminhamentos." },
      { type: "paragraph", text: "A CSP oferece apoio psicológico, social e pedagógico." }
    ],
    options: [
      { label: "WhatsApp – CAE", effect: { type: "whatsapp", key: "whatsappCAE" } },
      { label: "WhatsApp – CSP", effect: { type: "whatsapp", key: "whatsappCSP" } }
    ]
  },

  contato_email: {
    title: "Atendimento via E-mail",
    content: [
      { type: "paragraph", text: "Você pode escrever para a CAE ou ao CSP por e-mail, bastando clicar em uma das opções a seguir." },
      { type: "paragraph", text: "A CAE é a porta de entrada para orientações e encaminhamentos." },
      { type: "paragraph", text: "A CSP oferece apoio psicológico, social e pedagógico." }
    ],
    options: [
      { label: "E-mail – CAE", effect: { type: "mailto", key: "emailCAE" } },
      { label: "E-mail – CSP", effect: { type: "mailto", key: "emailCSP" } },
      { label: "Quero ajuda para escrever o que aconteceu no e-mail", set: { modo_ajuda_redacao: "sim" }, next: "coleta_dados" }
    ]
  },

  // =====================
  // ENTENDER MINHAS OPÇÕES
  // =====================
  menu_opcoes: {
    title: "O que você gostaria de entender melhor?",
    content: [
      { type: "paragraph", text: "Você não precisa decidir nada agora." },
      { type: "paragraph", text: "Conhecer seus direitos, entender o que caracteriza cada tipo de violência e descobrir quais recursos o campus oferece pode ajudar a clarear o que faz mais sentido para você." }
    ],
    options: [
      { label: "Não quero denunciar, mas quero que a situação pare", next: "parar_situacao" },
      { label: "Quero registrar, mas tenho medo de me expor", next: "medo_exposicao" },
      { label: "Quero apoio psicológico, mas sem envolver mais ninguém", next: "opcao_psicologico" },
      { label: "Não sei se o que vivi é grave o suficiente para denunciar", next: "duvida_gravidade" },
      { label: "Não sei o que fazer, mas quero pensar com calma", next: "opcao_calma" },
      { label: "Voltar ao início", next: "inicio" }
    ]
  },

  parar_situacao: {
    title: "Não quero denunciar, mas quero que pare",
    content: [
      { type: "paragraph", text: "A CAE pode intervir diretamente com a pessoa ou setor envolvido, sem abrir um processo formal." },
      { type: "paragraph", text: "Você também pode pedir mediação da CSP para resolver o conflito de forma educativa." }
    ],
    options: [
      { label: "Quero conversar com alguém sobre isso", next: "canais" },
      { label: "Quero saber mais sobre mediação e intervenção", effect: { type: "url", key: "artigoMediacao" } },
    ]
  },

  medo_exposicao: {
    title: "Quero registrar, mas tenho medo de me expor",
    content: [
      { type: "paragraph", text: "Você pode registrar um relato anônimo na Plataforma Fala.BR ou diretamente na CAE, sem se identificar." },
      { type: "paragraph", text: "Também pode fazer um relato identificado, mas sigiloso — apenas as pessoas responsáveis pelo caso terão acesso." }
    ],
    options: [
      { label: "Quero entender melhor os tipos de denúncia e o sigilo", effect: { type: "url", key: "artigoTiposDenuncia" } },
      { label: "Quero iniciar um relato anônimo agora", set: { identificacao: "anonimo" }, next: "coleta_dados" }
    ]
  },

  opcao_psicologico: {
    title: "Apoio psicológico sem envolver outros setores",
    content: [
      { type: "paragraph", text: "Você pode marcar uma conversa diretamente com a psicóloga ou com a assistente social do campus." },
      { type: "paragraph", text: "Caso prefira, também pode conhecer grupos de apoio do campus, em espaços que celebram a diversidade." }
    ],
    options: [
      { label: "Quero saber como marcar atendimento", next: "contatos_psicologico" },
      { label: "Quero conhecer outros espaços de apoio", effect: { type: "url", key: "ondeBuscarApoio" } },
    ]
  },

  contatos_psicologico: {
    title: "Atendimento psicológico",
    content: [
      { type: "paragraph", text: "Atendimento psicológico: achar o contato (em breve mais detalhes)." }
    ],
    options: [
      { label: "WhatsApp – CSP", effect: { type: "whatsapp", key: "whatsappCSP" } },
      { label: "E-mail – CSP", effect: { type: "mailto", key: "emailCSP" } },
    ]
  },

  duvida_gravidade: {
    title: "Será que é grave o suficiente?",
    content: [
      { type: "paragraph", text: "Muitas situações de discriminação, exclusão ou constrangimento podem ser difíceis de reconhecer no início." },
      { type: "paragraph", text: "Você não precisa ter certeza sobre o que aconteceu para buscar orientação ou apoio." },
      { type: "question", text: "O que faz mais sentido pra você agora?" }
    ],
    options: [
      { label: "Quero conversar com alguém para tirar dúvidas", next: "canais" },
      { label: "Quero entender se certas situações envolvem preconceito", effect: { type: "url", key: "artigoExemplos" } },
      { label: "Quero elaborar melhor o que aconteceu", next: "risco_permanencia" }
    ]
  },

  opcao_calma: {
    title: "Sem pressa para decidir",
    content: [
      { type: "paragraph", text: "Tudo bem. Você não precisa decidir agora." }
    ],
    options: [
      {
        label: "Quero elaborar melhor o que aconteceu",
        next: "risco_permanencia",
        hideIf: ["risco_permanencia", "tipo_violencia"]   // se essas chaves já existirem, esconde
      },
      { label: "Quero ler sobre como funciona o acolhimento", effect: { type: "url", key: "artigoAcolhimento" } },
      { label: "Quero guardar os contatos", next: "canais" },
    ]
  },

  // =====================
  // FLUXO DE RELATO (unificado)
  // =====================
  risco_permanencia: {
    title: "Impacto na permanência",
    content: [
      { type: "question", text: "A situação afetou sua permanência ou sensação de segurança no campus?" }
    ],
    defaultNext: "antes_envolvidos",
    options: [
      { label: "Acredito que não afetou, mas me sinto desconfortável", set: { risco_permanencia: "desconforto" } },
      { label: "Tenho evitado espaços ou pessoas", set: { risco_permanencia: "evitado" } },
      { label: "Tenho medo de frequentar atividades", set: { risco_permanencia: "medo" } },
      { label: "Estou pensando em abandonar disciplinas/curso", set: { risco_permanencia: "abandono" } },
      { label: "Está afetando meu bem-estar emocional", set: { risco_permanencia: "bemestar" } },
      { label: "Prefiro não responder", set: { risco_permanencia: "naoresponder" } }
    ]
  },

  antes_envolvidos: {
    title: "Sobre as pessoas envolvidas",
    content: [
        { type: "paragraph", text: "A próxima pergunta ajuda a entender melhor a situação e a definir os caminhos possíveis." },
        { type: "paragraph", text: "Se a situação envolver um professor, servidor ou terceirizado, existem medidas específicas de proteção para evitar retaliações. Você não será exposto(a) de forma alguma." },
        { type: "paragraph", text: "Se for um estudante, o campus também tem formas de agir com respeito e sigilo." },
        { type: "paragraph", text: "Responda apenas se quiser. Nenhuma informação será revelada sem sua autorização." }
    ],
    options: [
        { label: "Entendi, quero responder", next: "envolvidos" },
        { label: "Prefiro pular essa pergunta", set: { envolvidos: "naoresponder" }, next: "tipo_violencia" }
    ]
},

envolvidos: {
    title: "Quem estava envolvido?",
    content: [
        { type: "question", text: "Escolha a opção que melhor descreve quem participou da situação:" }
    ],
    defaultNext: function (state) {
        const envolvido = state.envolvidos?.valor;
        if (["docente", "servidor", "terceirizado"].includes(envolvido)) {
            return "mensagem_protecao";
        }
        return "tipo_violencia";
    },
    options: [
        { label: "Estudante", set: { envolvidos: "estudante" } },
        { label: "Docente", set: { envolvidos: "docente" } },
        { label: "Servidor(a)", set: { envolvidos: "servidor" } },
        { label: "Terceirizado(a)", set: { envolvidos: "terceirizado" } },
        { label: "Grupo de pessoas", set: { envolvidos: "grupo" } },
        { label: "Não sei identificar", set: { envolvidos: "naosei" } },
        { label: "Prefiro não responder", set: { envolvidos: "naoresponder" } }
    ]
},

mensagem_protecao: {
    title: "Importante",
    content: [
        { type: "alert", text: "Situações envolvendo pessoas em posição institucional podem gerar medo ou insegurança." },
        { type: "paragraph", text: "Você poderá escolher quanto deseja compartilhar, e a equipe responsável avaliará formas de acolhimento e sigilo adequadas à situação." },
        { type: "paragraph", text: "O anonimato é garantido, e a instituição proíbe retaliações." }
    ],
    options: [
        { label: "Continuar", next: "tipo_violencia" }
    ]
},

  tipo_violencia: {
    title: "O que aconteceu?",
    content: [
      { type: "question", text: "Qual dessas situações mais se aproxima do que aconteceu?" }
    ],
    defaultNext: "expectativa",
    options: [
      { label: "Não respeitaram meu nome social ou pronomes", set: { tipo_violencia: "nome_social" } },
      { label: "Piadas ou comentários ofensivos", set: { tipo_violencia: "piadas" } },
      { label: "Fui excluído(a) de grupos ou trabalhos", set: { tipo_violencia: "exclusao" } },
      { label: "Assédio", set: { tipo_violencia: "assedio" } },
      { label: "Sofri uma agressão física", set: { tipo_violencia: "agressao" } },
      { label: "Não tenho certeza, mas me sinto mal", set: { tipo_violencia: "incerteza" } }
    ]
  },

expectativa: {
    title: "O que você espera que aconteça agora?",
    content: [
        { type: "validacao", key: "validacao_impacto" },
        { type: "validacao", key: "validacao_tipo" },
        { type: "validacao", key: "encaminhamento" },
        { type: "paragraph", text: "Escolha a opção que fizer mais sentido para você neste momento." }
    ],
    options: [
        { label: "Registrar o ocorrido", next: "forma_contato" },
        { label: "Buscar apoio psicológico", next: "opcao_psicologico" },
        { label: "Entrar em contato com um grupo de apoio", effect: { type: "url", key: "ondeBuscarApoio" } },
        { label: "Ainda não tenho certeza", next: "opcao_calma" }
    ]
},

  forma_contato: {
    title: "Como você prefere seguir?",
    content: [
      { type: "paragraph", text: "Existem duas maneiras de relatar o que aconteceu ao campus. Escolha a que fizer mais sentido agora." }
    ],
    options: [
      { label: "Prefiro eu mesma(o) entrar em contato", next: "canais" },
      { label: "Quero que o sistema monte um relato pra mim", next: "coleta_dados" }
    ]
  },

  passo_a_passo_contato: {
    title: "Como entrar em contato por conta própria",
    content: [
      { type: "paragraph", text: "Você pode usar qualquer um dos canais abaixo para relatar a situação no seu ritmo." },
    ],
    options: [
      { label: "WhatsApp – CAE", effect: { type: "whatsapp", key: "whatsappCAE" } },
      { label: "WhatsApp – CSP", effect: { type: "whatsapp", key: "whatsappCSP" } },
      { label: "E-mail – CAE", effect: { type: "mailto", key: "emailCAE" } },
      { label: "E-mail – CSP", effect: { type: "mailto", key: "emailCSP" } },
      { label: "Atendimento presencial", effect: { type: "url", key: "presencial" } },
    ]
  },

  coleta_dados: {
    title: "Montagem do relato",
    content: [
      { type: "paragraph", text: "Responda às perguntas abaixo para que o sistema gere um texto estruturado." },
      { type: "paragraph", text: "Todas as perguntas são opcionais. Você pode pular as que não quiser responder." },
      { type: "divider" },
      {
        type: "select",
        key: "local",
        label: "Local aproximado",
        optional: true,
        placeholder: "Selecione um local",
        options: [
          "Sala de aula",
          "Laboratório de Informática",
          "Laboratório de Automação",
          "Laboratório de Eletrônica",
          "Laboratório de Turismo",
          "Biblioteca",
          "Pátio / Área de Convivência",
          "Cantina / Refeitório",
          "Quadra / Área esportiva",
          "Corredor",
          "Estacionamento",
          "Entrada do campus",
          "Secretaria / Coordenação",
          "Banheiros",
          "Auditório",
          "Sala de professores",
          "Fora do campus",
          "Outro",
          "Prefiro não informar"
        ]
      },
      {
        type: "input",
        key: "data",
        label: "Data ou período aproximado",
        optional: true,
        placeholder: "Ex.: março de 2025, 15/04/2025, ou \"primeiro semestre\""
      },
      { type: "divider" },
      {
        type: "file",
        key: "evidencias",
        label: "Anexar provas ou evidências",
        optional: true,
        accept: ".jpg,.jpeg,.png,.gif,.bmp,.webp,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.mp3,.mp4,.mov,.avi,.zip,.rar",
        maxSize: 10 * 1024 * 1024,
        maxFiles: 5,
        multiple: true
      },
      { type: "divider" },
      {
        type: "textarea",
        key: "complemento",
        label: "Algo mais que queira acrescentar",
        optional: true,
        rows: 6,
        placeholder: "Use este espaço para descrever detalhes que não foram abordados nas perguntas anteriores."
      },
      { type: "divider" }
    ],
    defaultNext: function (state) {
      // Quem só quer ajuda para redigir vai direto para revisão
      if (state.modo_ajuda_redacao?.valor === "sim") {
        return "relato_revisao";
      }
      // Fluxo normal de denúncia: passa pela identificação
      return "relato_identificacao";
    },
    options: [
      { label: "Continuar" }
    ]
  },

  relato_identificacao: {
    title: "Como você quer que seu relato seja enviado?",
    content: [
      { type: "paragraph", text: "Identificado: o relato incluirá seu nome e e-mail para retorno." },
      { type: "paragraph", text: "Anônimo: o relato não terá seus dados pessoais." }
    ],
    options: [
      { label: "Quero enviar identificado", set: { identificacao: "identificado" }, next: "coleta_identificacao" },
      { label: "Quero enviar anonimamente", set: { identificacao: "anonimo" }, next: "relato_revisao" }
    ]
  },

  coleta_identificacao: {
    title: "Seus dados para identificação",
    content: [
      { type: "paragraph", text: "Essas informações são necessárias para que a equipe possa entrar em contato e dar andamento ao seu relato." },
      { type: "paragraph", text: "Todos os dados serão tratados com sigilo e utilizados apenas para os fins deste processo." },
      { type: "divider" },
      {
        type: "input",
        key: "nome",
        label: "Nome completo",
        required: true,
        placeholder: "Seu nome completo"
      },
      {
        type: "input",
        key: "email",
        label: "E-mail institucional",
        required: true,
        inputType: "email",
        placeholder: "exemplo@ifsp.edu.br"
      },
      {
        type: "input",
        key: "prontuario",
        label: "Prontuário (se souber)",
        optional: true,
        placeholder: "ex.: 12345-6"
      },
      { type: "divider" },
      {
        type: "select",
        key: "curso",
        label: "Seu curso",
        required: true,
        placeholder: "Selecione um curso",
        options: [
          "Técnico em Automação Industrial",
          "Técnico em Informática",
          "Técnico em Eventos",
          "Técnico em Informática para Internet (EJA)",
          "Tecnologia em Automação Industrial",
          "Tecnologia em Gestão de Turismo",
          "Tecnologia em Análise e Desenvolvimento de Sistemas",
          "Bacharelado em Turismo",
          "Engenharia de Controle e Automação",
          "Licenciatura em Letras",
          "Licenciatura em Matemática",
          "Pós-graduação em Engenharia Elétrica",
          "Não sou aluno(a)",
          "Prefiro não informar"
        ]
      },
      {
        type: "radio",
        key: "periodo",
        label: "Período",
        required: true,
        options: [
          { label: "Matutino (manhã)", value: "matutino" },
          { label: "Vespertino (tarde)", value: "vespertino" },
          { label: "Noturno (noite)", value: "noturno" },
          { label: "Prefiro não informar", value: "nao_informar" }
        ]
      }
    ],
    submit: {
      label: "Continuar",
      next: "relato_revisao"
    }
  },

  relato_revisao: {
    title: "Revisão do relato",
    content: [
      { type: "paragraph", text: "Confira abaixo o texto que será enviado. Você pode copiá-lo, editá-lo ou salvá-lo antes de enviar." },
      { type: "divider" },
      {
        type: "relato",
        title: "Texto do relato"
      }
    ],
    options: [
      { label: "Copiar relato", effect: { type: "action", action: "copiarRelato" } },
      { label: "Editar antes de enviar", next: "coleta_dados" },
      { label: "Salvar como texto", effect: { type: "action", action: "salvarRelato" } },
      { label: "Enviar agora", effect: { type: "action", action: "enviarRelato" } },
      { label: "Voltar ao início", next: "inicio" }
    ]
  }
};