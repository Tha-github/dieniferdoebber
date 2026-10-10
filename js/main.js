/*
 * Dienifer Doebber · script único do site (carregado com defer).
 * 1. Header: fundo e tamanho compacto ao rolar.
 * 2. Navegação: aria-current na seção visível.
 * 3. Menu mobile: abrir, fechar, ESC, foco preso dentro do menu.
 * 4. Reveal: seções aparecem suavemente ao rolar.
 * 5. Botão flutuante do WhatsApp: some sobre o hero, o Contato e o rodapé.
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
})();
