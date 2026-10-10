/*
 * Dienifer Doebber · script único do site (carregado com defer).
 * 1. Header: fundo e tamanho compacto ao rolar.
 * 2. Navegação: aria-current na seção visível.
 * 3. Menu mobile: abrir, fechar, ESC, foco preso dentro do menu.
 * 4. Reveal: seções aparecem suavemente ao rolar.
 * 5. Botão flutuante do WhatsApp: some sobre o hero, o Contato e o rodapé.
 * 6. Formulário de contato: valida e abre o WhatsApp com a mensagem pronta.
 * Sem JavaScript, o site continua funcionando (ver css/noscript.css).
 */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
   * 1. Header: transparente no topo; ao rolar, fundo off-white e compacto.
   * Um elemento sentinela no topo da página indica se ainda estamos nele.
   * ------------------------------------------------------------------- */
  var header = document.querySelector("[data-site-header]");
  var sentinel = document.querySelector("[data-header-sentinel]");

  if (header && sentinel) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle("is-top", entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* ---------------------------------------------------------------------
   * 2. aria-current: marca, no menu desktop e no mobile, o link da seção
   * que cruza a faixa central da tela (sem seção na faixa, nenhum link).
   * Só na página inicial (links "#sobre" etc.).
   * ------------------------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('[data-site-header] a[href^="#"], [data-menu] a[href^="#"]'),
  );
  var sectionIds = navLinks
    .map(function (link) {
      return link.hash.slice(1);
    })
    .filter(function (id, i, all) {
      return all.indexOf(id) === i;
    });
  var sections = sectionIds
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  if (sections.length) {
    var inBand = new Set();
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        });
        var current = sectionIds.find(function (id) {
          return inBand.has(id);
        });
        navLinks.forEach(function (link) {
          if (current && link.hash === "#" + current) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* ---------------------------------------------------------------------
   * 3. Menu mobile (<dialog> em tela cheia).
   * ------------------------------------------------------------------- */
  var menu = document.querySelector("[data-menu]");
  var openButton = document.querySelector("[data-menu-open]");

  if (menu && openButton) {
    var focusables = function () {
      return Array.prototype.slice.call(menu.querySelectorAll("a[href], button:not([disabled])"));
    };

    openButton.addEventListener("click", function () {
      menu.showModal();
      openButton.setAttribute("aria-expanded", "true");
    });

    // Ao seguir um link, o foco acompanha a seção de destino; nos demais
    // casos (ESC, botão fechar), volta ao botão de abrir — o Safari não
    // foca botões no clique, então a restauração nativa não basta.
    var linkTarget = null;

    // ESC dispara "close" nativamente.
    menu.addEventListener("close", function () {
      openButton.setAttribute("aria-expanded", "false");
      if (linkTarget) {
        if (!linkTarget.hasAttribute("tabindex")) linkTarget.setAttribute("tabindex", "-1");
        linkTarget.focus({ preventScroll: true });
      } else {
        openButton.focus();
      }
      linkTarget = null;
    });

    menu.addEventListener("click", function (event) {
      var link = event.target.closest("a[href]");
      if (link) {
        linkTarget = link.hash ? document.getElementById(link.hash.slice(1)) : null;
        menu.close();
      } else if (event.target.closest("[data-menu-close]")) {
        menu.close();
      }
    });

    // Mantém o Tab dentro do menu (inclusive ao sair do último item).
    menu.addEventListener("keydown", function (event) {
      if (event.key !== "Tab") return;
      var items = focusables();
      var first = items[0];
      var last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Ao ampliar a janela para desktop com o menu aberto, fecha.
    window.matchMedia("(min-width: 64rem)").addEventListener("change", function (event) {
      if (event.matches && menu.open) menu.close();
    });
  }

  /* ---------------------------------------------------------------------
   * 4. Reveal: conteúdo das seções ([data-reveal]) aparece ao entrar na tela.
   * Desligado para quem pede menos movimento (prefers-reduced-motion).
   * O estado oculto só existe com a classe .js-reveal no <html>.
   * ------------------------------------------------------------------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = document.querySelectorAll("[data-reveal]");

  if (!reduceMotion && "IntersectionObserver" in window && revealTargets.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    revealTargets.forEach(function (target) {
      revealObserver.observe(target);
    });
    document.documentElement.classList.add("js-reveal");
  }

  /* ---------------------------------------------------------------------
   * 5. Botão flutuante do WhatsApp: oculto enquanto qualquer elemento com
   * [data-whatsapp-float-hide] (hero, Contato, rodapé) estiver visível.
   * ------------------------------------------------------------------- */
  var floatButton = document.querySelector("[data-whatsapp-float]");
  var hideZones = document.querySelectorAll("[data-whatsapp-float-hide]");

  if (floatButton) {
    var visibleZones = new Set();
    var updateFloat = function () {
      floatButton.classList.toggle("is-hidden", visibleZones.size > 0);
    };

    var floatObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visibleZones.add(entry.target);
        else visibleZones.delete(entry.target);
      });
      updateFloat();
    });

    hideZones.forEach(function (zone) {
      floatObserver.observe(zone);
    });
    // Página sem zonas: sempre visível.
    if (hideZones.length === 0) updateFloat();
  }

  /* ---------------------------------------------------------------------
   * 6. Formulário de contato → mensagem no WhatsApp.
   * Não envia nada ao site e não guarda nada (sem cookies, localStorage
   * etc.): só monta o texto e abre o WhatsApp em nova aba para a pessoa
   * conferir e enviar.
   *
   * PARA EDITAR A MENSAGEM: veja a função montarMensagem() abaixo.
   * ------------------------------------------------------------------- */
  var form = document.querySelector("[data-contact-form]");

  if (form) {
    var WHATSAPP_NUMERO = "5511992561321";
    var LIMITES = { nome: 80, contato: 100, mensagem: 500 };
    var MODALIDADES = {
      presencial: "presencial, em São Paulo",
      online: "on-line",
      indefinida: "modalidade ainda a definir",
    };

    var campoNome = form.querySelector("#cf-nome");
    var campoContato = form.querySelector("#cf-contato");
    var campoMensagem = form.querySelector("#cf-mensagem");
    var campoPrivacidade = form.querySelector("#cf-privacidade");
    var contador = form.querySelector("#cf-mensagem-contador");
    var status = form.querySelector("[data-form-status]");
    var tentouEnviar = false;

    // Remove caracteres de controle, junta espaços e limita o tamanho.
    var limpar = function (valor, max, manterQuebras) {
      var texto = String(valor || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
      texto = manterQuebras
        ? texto.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n")
        : texto.replace(/\s+/g, " ");
      return texto.trim().slice(0, max);
    };

    var valorMarcado = function (nome) {
      var marcado = form.querySelector('input[name="' + nome + '"]:checked');
      return marcado ? marcado.value : "";
    };

    // Telefone (com DDD; 10 a 13 dígitos, aceita + ( ) - . e espaços) ou e-mail.
    var contatoValido = function (valor) {
      var email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);
      var digitos = valor.replace(/\D/g, "").length;
      var telefone = /^[\d\s()+.-]+$/.test(valor) && digitos >= 10 && digitos <= 13;
      return email || telefone;
    };

    // ---- Erros acessíveis: texto ligado ao campo por aria-describedby.
    var idErro = function (campo) {
      return campo.id + "-erro";
    };
    var mostrarErro = function (campo, mensagem) {
      var erro = form.querySelector("#" + idErro(campo));
      erro.textContent = mensagem;
      erro.hidden = false;
      campo.setAttribute("aria-invalid", "true");
      var ids = (campo.getAttribute("aria-describedby") || "").split(" ").filter(Boolean);
      if (ids.indexOf(idErro(campo)) === -1) ids.push(idErro(campo));
      campo.setAttribute("aria-describedby", ids.join(" "));
    };
    var limparErro = function (campo) {
      var erro = form.querySelector("#" + idErro(campo));
      erro.textContent = "";
      erro.hidden = true;
      campo.removeAttribute("aria-invalid");
      var ids = (campo.getAttribute("aria-describedby") || "").split(" ").filter(function (id) {
        return id && id !== idErro(campo);
      });
      if (ids.length) campo.setAttribute("aria-describedby", ids.join(" "));
      else campo.removeAttribute("aria-describedby");
    };

    // Cada regra devolve a mensagem de erro, ou "" se estiver tudo certo.
    var regras = [
      [
        campoNome,
        function () {
          return limpar(campoNome.value, LIMITES.nome).length >= 2 ? "" : "Informe seu nome.";
        },
      ],
      [
        campoContato,
        function () {
          var valor = limpar(campoContato.value, LIMITES.contato);
          if (!valor) return "Informe um telefone ou e-mail para retorno.";
          return contatoValido(valor) ? "" : "Informe um telefone com DDD ou um e-mail válido.";
        },
      ],
      [
        campoPrivacidade,
        function () {
          return campoPrivacidade.checked
            ? ""
            : "Para continuar, confirme que leu e concorda com a Política de privacidade.";
        },
      ],
    ];

    var validar = function () {
      var invalidos = [];
      regras.forEach(function (regra) {
        var mensagem = regra[1]();
        if (mensagem) {
          mostrarErro(regra[0], mensagem);
          invalidos.push(regra[0]);
        } else {
          limparErro(regra[0]);
        }
      });
      return invalidos;
    };

    // Texto enviado ao WhatsApp. Partes vazias (modalidade, período,
    // mensagem) são omitidas.
    var montarMensagem = function () {
      var nome = limpar(campoNome.value, LIMITES.nome);
      var contato = limpar(campoContato.value, LIMITES.contato);
      var mensagem = limpar(campoMensagem.value, LIMITES.mensagem, true);
      var modalidade = MODALIDADES[valorMarcado("modalidade")];
      var periodo = valorMarcado("periodo");

      var texto = "Olá, Dienifer. Meu nome é " + nome + ". ";
      texto +=
        "Gostaria de informações sobre o atendimento" + (modalidade ? " (" + modalidade + ")" : "") + ". ";
      if (periodo) texto += "Melhor período: " + periodo + ". ";
      texto += "Contato: " + contato + ".";
      if (mensagem) texto += " " + mensagem;
      return texto;
    };

    var abrirWhatsApp = function (url) {
      // Link temporário com noopener: abre em nova aba sem dar acesso a esta página.
      var link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();
    };

    var mostrarStatus = function (texto, url) {
      status.textContent = texto;
      if (url) {
        var alternativa = document.createElement("a");
        alternativa.href = url;
        alternativa.target = "_blank";
        alternativa.rel = "noopener noreferrer";
        alternativa.textContent = "Se ele não abriu, use este link";
        var dica = document.createElement("span");
        dica.className = "visually-hidden";
        dica.textContent = " (abre em nova aba)";
        alternativa.appendChild(dica);
        status.appendChild(document.createTextNode(" "));
        status.appendChild(alternativa);
        status.appendChild(document.createTextNode("."));
      }
    };

    // Contador de caracteres da mensagem.
    var atualizarContador = function () {
      contador.textContent = campoMensagem.value.length + " de " + LIMITES.mensagem + " caracteres";
    };
    campoMensagem.addEventListener("input", atualizarContador);
    atualizarContador();

    // Depois da primeira tentativa, o erro some assim que o campo fica válido.
    form.addEventListener("input", function (event) {
      if (!tentouEnviar) return;
      regras.forEach(function (regra) {
        if (regra[0] === event.target && !regra[1]()) limparErro(regra[0]);
      });
    });
    form.addEventListener("change", function (event) {
      if (tentouEnviar && event.target === campoPrivacidade && campoPrivacidade.checked) {
        limparErro(campoPrivacidade);
      }
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      tentouEnviar = true;
      var invalidos = validar();

      if (invalidos.length) {
        invalidos[0].focus();
        mostrarStatus(
          invalidos.length === 1
            ? "Revise o campo indicado para continuar."
            : "Revise os " + invalidos.length + " campos indicados para continuar.",
        );
        return;
      }

      var url = "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(montarMensagem());
      abrirWhatsApp(url);
      mostrarStatus(
        "O WhatsApp foi aberto em uma nova aba com a sua mensagem. Confira o texto e envie por lá.",
        url,
      );
    });
  }
})();
