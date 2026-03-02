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

  // Lightbox: click gallery image to view full size
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox && lightbox.querySelector('.lightbox-img');
  var lightboxClose = lightbox && lightbox.querySelector('.lightbox-close');
  var lightboxBackdrop = lightbox && lightbox.querySelector('.lightbox-backdrop');

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-item img').forEach(function (img) {
    img.addEventListener('click', function (e) {
      e.stopPropagation();
      openLightbox(img.src, img.alt);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
  });
})();
