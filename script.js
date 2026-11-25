// Interactive tabs in the hero code card
const codeTabs = document.querySelectorAll('.code-tab');
const codePanels = document.querySelectorAll('.code-panel');

codeTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    codeTabs.forEach((btn) => {
      const isSelected = btn === tab;
      btn.classList.toggle('is-active', isSelected);
      btn.setAttribute('aria-selected', String(isSelected));
    });

    codePanels.forEach((panel) => {
      const match = panel.dataset.panel === target;
      panel.classList.toggle('is-active', match);
      panel.hidden = !match;
    });
  });
});

// Project category filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach((b) => b.classList.toggle('is-active', b === btn));

    projectCards.forEach((card) => {
      const categories = (card.dataset.category || '').split(' ');
      const show = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-hidden', !show);
    });
  });
});

// Copy email buttons with toast feedback
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2400);
}

document.querySelectorAll('[data-copy-email]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const email = btn.dataset.copyEmail;
    const badge = btn.querySelector('.copy-badge');
    try {
      await navigator.clipboard.writeText(email);
      if (badge) badge.textContent = 'Copié !';
      showToast('Adresse e-mail copiée : ' + email + ' ✦');
      setTimeout(() => {
        if (badge) badge.textContent = 'Copier';
      }, 2200);
    } catch {
      window.location.href = 'mailto:' + email;
    }
  });
});

// Subtle cursor aura on desktop
const aura = document.querySelector('.cursor-aura');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (aura && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (e) => {
    aura.style.opacity = '1';
    aura.style.left = `${e.clientX}px`;
    aura.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mouseleave', () => {
    aura.style.opacity = '0';
  });
}
