// Tab switching for main nav
(function () {
  var buttons = document.querySelectorAll('.nav-btn[data-tab]');
  var panels = document.querySelectorAll('.tab-panel');

  function switchTab(tabId) {
    panels.forEach(function (panel) {
      var isActive = panel.id === tabId;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
    buttons.forEach(function (btn) {
      var isActive = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tabId = btn.getAttribute('data-tab');
      if (tabId) switchTab(tabId);
    });
  });

  // Optional: open correct tab from hash, e.g. index.html#publications
  var hash = window.location.hash.slice(1);
  if (hash && document.getElementById(hash)) {
    switchTab(hash);
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
