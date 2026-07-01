/* Static, dependency-free navigation for the AntHive documentation.
   Builds a shared sidebar into #sidebar on every page, highlights the current
   page + section, provides a mobile toggle and a simple client-side filter. */
(function () {
  var NAV = [
    { group: 'Allgemein', pages: [
      { id: 'index', label: 'Übersicht', sections: [
        ['was-ist', 'Was ist AntHive?'], ['architektur', 'Architektur'], ['zielgruppen', 'Zielgruppen'],
        ['prozesse', 'Kernprozesse'], ['module', 'Modulübersicht'], ['offene-punkte', 'Offene Punkte'],
      ] },
    ] },
    { group: 'Dokumentationsbereiche', pages: [
      { id: 'developer', label: 'Entwicklerdokumentation', sections: [
        ['dev-stack', 'Technologie-Stack'], ['dev-setup', 'Setup & Betrieb'], ['dev-arch', 'Architektur & Module'],
        ['dev-data', 'Datenmodell'], ['dev-api', 'API & Auth'], ['dev-events', 'Events & Webhooks'],
        ['dev-tests', 'Tests'], ['dev-obs', 'Observability'],
      ] },
      { id: 'admin-wms', label: 'Administration WMS', sections: [
        ['aw-deploy', 'Deployment & Konfiguration'], ['aw-perms', 'Rechte-Katalog'], ['aw-areas', 'Bereiche & Tags'],
        ['aw-strategies', 'Allokationsstrategien'], ['aw-webhooks', 'Webhooks'], ['aw-monitoring', 'Monitoring'],
      ] },
      { id: 'admin-tenant', label: 'Administration (Mandant)', sections: [
        ['at-users', 'Benutzer & Rollen'], ['at-keys', 'API-Keys'], ['at-catalog', 'Artikel & Bilder'],
        ['at-locations', 'Lagerplätze & Bereiche'], ['at-tags', 'Tags'], ['at-billing', 'Abrechnung'],
      ] },
      { id: 'operator', label: 'Operative Anwender', sections: [
        ['op-inbound', 'Wareneingang'], ['op-putaway', 'Einlagerung'], ['op-picking', 'Kommissionierung'],
        ['op-transfer', 'Umlagerung'], ['op-pack', 'Packen & Versand'], ['op-returns', 'Retouren'],
        ['op-quality', 'Qualitätsprüfung'], ['op-count', 'Inventur'],
      ] },
    ] },
  ];

  var current = document.body.getAttribute('data-page') || 'index';
  var sidebar = document.getElementById('sidebar');
  if (sidebar) {
    var html = '';
    NAV.forEach(function (g) {
      html += '<div class="group"><span>' + g.group + '</span>';
      g.pages.forEach(function (p) {
        var isCur = p.id === current;
        html += '<a class="' + (isCur ? 'page-active' : '') + '" href="' + p.id + '.html">' + p.label + '</a>';
        if (isCur && p.sections) {
          p.sections.forEach(function (s) {
            html += '<a class="sub" href="#' + s[0] + '">' + s[1] + '</a>';
          });
        }
      });
      html += '</div>';
    });
    sidebar.innerHTML = html;
  }

  // Active section highlight while scrolling.
  var subLinks = sidebar ? [].slice.call(sidebar.querySelectorAll('a.sub')) : [];
  if (subLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    subLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          subLinks.forEach(function (a) { a.classList.remove('active'); });
          if (byId[e.target.id]) byId[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-10% 0px -75% 0px' });
    subLinks.forEach(function (a) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      if (el) io.observe(el);
    });
  }

  // Mobile toggle.
  var hamb = document.getElementById('hamb');
  if (hamb && sidebar) hamb.addEventListener('click', function () { sidebar.classList.toggle('open'); });
  if (sidebar) sidebar.addEventListener('click', function (e) { if (e.target.tagName === 'A') sidebar.classList.remove('open'); });

  // Simple filter over sidebar links.
  var search = document.getElementById('search');
  if (search && sidebar) {
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      [].slice.call(sidebar.querySelectorAll('a')).forEach(function (a) {
        a.style.display = !q || a.textContent.toLowerCase().indexOf(q) > -1 ? '' : 'none';
      });
    });
  }
})();
