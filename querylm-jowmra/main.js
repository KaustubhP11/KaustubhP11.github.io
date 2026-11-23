// Minimal behaviour: theme toggle, worked-example views, figure tabs, BibTeX copy. No dependencies.
(function () {
  var root = document.documentElement;

  document.querySelector('.theme-toggle').addEventListener('click', function () {
    var dark = root.dataset.theme ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  function select(buttons, active) {
    buttons.forEach(function (b) { b.setAttribute('aria-selected', b === active ? 'true' : 'false'); });
  }

  document.querySelectorAll('.walk').forEach(function (walk) {
    var buttons = Array.prototype.slice.call(walk.querySelectorAll('.seg button'));
    buttons.forEach(function (b) {
      b.addEventListener('click', function () { walk.dataset.view = b.dataset.view; select(buttons, b); });
    });
  });

  document.querySelectorAll('[data-tabs]').forEach(function (tabs) {
    var buttons = Array.prototype.slice.call(tabs.querySelectorAll('.seg button'));
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        select(buttons, b);
        tabs.querySelectorAll('[data-panel]').forEach(function (p) { p.hidden = p.dataset.panel !== b.dataset.tab; });
      });
    });
  });

  document.querySelectorAll('.bib .copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.parentNode.querySelector('code').innerText;
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(
        function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy'; }, 1500); },
        function () { btn.textContent = 'Select & copy'; });
    });
  });
})();
