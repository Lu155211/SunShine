const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('jianlu-theme');

function setTheme(theme) {
  root.dataset.theme = theme;
  toggle?.setAttribute('aria-label', theme === 'dark' ? '切换到浅色模式' : '切换到深色模式');
  if (toggle) {
    toggle.innerHTML = theme === 'dark'
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.6 15.7A8.5 8.5 0 0 1 8.3 3.4 8.5 8.5 0 1 0 20.6 15.7Z"></path></svg>';
  }
}

setTheme(savedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

toggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('jianlu-theme', next);
  setTheme(next);
});

const dropdownButton = document.querySelector('.nav-dropdown > button');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownButton?.addEventListener('click', () => {
  const open = dropdownMenu.classList.toggle('open');
  dropdownButton.setAttribute('aria-expanded', String(open));
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-dropdown')) {
    dropdownMenu?.classList.remove('open');
    dropdownButton?.setAttribute('aria-expanded', 'false');
  }
});

document.querySelector('.email')?.addEventListener('click', async (event) => {
  const button = event.currentTarget;
  const email = button.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    button.textContent = '邮箱已复制 ✓';
    setTimeout(() => { button.textContent = email.replace('@', '[at]'); }, 1600);
  } catch {
    location.href = `mailto:${email}`;
  }
});

document.querySelectorAll('.activity-grid').forEach((grid) => {
  const levels = [0,0,1,0,2,1,0,0,1,2,0,0,3,1,0,2,1,0,0,0,1,2,3,0,1,0];
  for (let index = 0; index < 104; index += 1) {
    const cell = document.createElement('i');
    const level = levels[(index * 7 + index % 5) % levels.length];
    if (level) cell.dataset.level = level;
    grid.appendChild(cell);
  }
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});
