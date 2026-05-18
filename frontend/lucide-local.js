(function () {
  const svgAttrs = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const icons = {
    activity: '<path d="M22 12h-4l-3 7-6-14-3 7H2"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5"/>',
    bot: '<rect x="5" y="7" width="14" height="12" rx="3"/><path d="M12 7V3"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/>',
    brain: '<path d="M9 3a4 4 0 0 0-4 4v1a4 4 0 0 0 0 8v1a4 4 0 0 0 7 2 4 4 0 0 0 7-2v-1a4 4 0 0 0 0-8V7a4 4 0 0 0-7-2 4 4 0 0 0-3-2Z"/>',
    'brain-circuit': '<path d="M9 3a4 4 0 0 0-4 4v1a4 4 0 0 0 0 8v1a4 4 0 0 0 7 2 4 4 0 0 0 7-2v-1a4 4 0 0 0 0-8V7a4 4 0 0 0-7-2 4 4 0 0 0-3-2Z"/><path d="M12 8h3v3"/><path d="M12 16h-2v-3"/>',
    'book-open': '<path d="M2 4h7a3 3 0 0 1 3 3v14a3 3 0 0 0-3-3H2Z"/><path d="M22 4h-7a3 3 0 0 0-3 3v14a3 3 0 0 1 3-3h7Z"/>',
    'code-2': '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4"/><path d="M6 2v4M10 2v4M14 2v4M18 2v4M6 18v4M10 18v4M14 18v4M18 18v4M2 6h4M2 10h4M2 14h4M2 18h4M18 6h4M18 10h4M18 14h4M18 18h4"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    'external-link': '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    'flask-conical': '<path d="M10 2v7L4 20a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L14 9V2"/><path d="M8 2h8"/><path d="M7 16h10"/>',
    'folder-open': '<path d="M6 14 8 6h13l-2 8Z"/><path d="M3 6h5l2 3h11v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
    'gamepad-2': '<path d="M6 12h4m-2-2v4"/><path d="M15 13h.01M18 11h.01"/><rect x="2" y="7" width="20" height="10" rx="5"/>',
    'git-branch': '<path d="M6 3v12"/><circle cx="6" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M9 6h6"/>',
    github: '<path d="M15 22v-4a4 4 0 0 0-1-3c3 0 6-2 6-6a5 5 0 0 0-1-3 4 4 0 0 0 0-3s-1 0-3 1a10 10 0 0 0-6 0C8 3 7 3 7 3a4 4 0 0 0 0 3 5 5 0 0 0-1 3c0 4 3 6 6 6a4 4 0 0 0-1 3v4"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
    languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    server: '<rect x="3" y="4" width="18" height="8" rx="2"/><rect x="3" y="12" width="18" height="8" rx="2"/><path d="M7 8h.01M7 16h.01"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-2.8-2.8.1-.1A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.6-1H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1L7.1 4l.1.1A1.7 1.7 0 0 0 9 4.4a1.7 1.7 0 0 0 1-1.6V3h4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
    'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    swords: '<path d="m14.5 17.5 3 3 3-3-3-3"/><path d="m3 3 14.5 14.5"/><path d="m9.5 17.5-3 3-3-3 3-3"/><path d="M21 3 6.5 17.5"/>',
    telescope: '<path d="m10 6 8 4-2 4-8-4Z"/><path d="m8 10-3 6"/><path d="m12 12-3 8"/><path d="M14 4 5 8"/><path d="M6 20h8"/>',
    trophy: '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0Z"/><path d="M5 5H3v2a4 4 0 0 0 4 4"/><path d="M19 5h2v2a4 4 0 0 1-4 4"/>',
    user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    zap: '<path d="M13 2 3 14h8l-1 8 11-14h-8Z"/>',
  };

  function createIcons() {
    document.querySelectorAll('[data-lucide]').forEach(el => {
      const name = el.getAttribute('data-lucide');
      const body = icons[name] || '<circle cx="12" cy="12" r="9"/>';
      const classes = el.getAttribute('class') || '';
      el.outerHTML = `<svg class="${classes}" ${svgAttrs} aria-hidden="true">${body}</svg>`;
    });
  }

  window.lucide = { createIcons };
})();
