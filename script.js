/* ─────────────── Zenix Web Tools – script.js (FULL) ─────────────── */
document.addEventListener('DOMContentLoaded', () => {
  /* ELEMENTS */
  const sidebar   = document.getElementById('sidebar');
  const hamBtn    = document.querySelector('.ham');
  const navLinks  = sidebar.querySelectorAll('a[href^="#"]');
  const themeBtn  = document.getElementById('themeToggle');
  const pages     = document.querySelectorAll('.page');

  /* ── 1. SIDEBAR toggle ─────────────────────────────────────────── */
  function toggleSidebar () {
    sidebar.classList.toggle('open');                    // ← sinkron dg CSS
    document.body.classList.toggle(
      'sidebar-closed',
      !sidebar.classList.contains('open')
    );
  }
  hamBtn.addEventListener('click', toggleSidebar);
  window.toggleSidebar = toggleSidebar; // agar atribut HTML onclick bekerja

  /* ── 2. PAGE routing -------------------------------------------------- */
  function show (id) {
    pages.forEach(sec => sec.classList.toggle('hidden', sec.id !== id));
  }
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      show(link.getAttribute('href').substring(1));
      sidebar.classList.remove('open');
      document.body.classList.add('sidebar-closed');
    });
  });
  show('welcome'); // default

  /* ── 3. THEME switch -------------------------------------------------- */
  if (localStorage.getItem('zen.theme') === 'light') {
    document.body.classList.add('light');
    themeBtn.textContent = '☀️';
  }
  themeBtn.addEventListener('click', () => {
    const light = document.body.classList.toggle('light');
    themeBtn.textContent = light ? '☀️' : '🌓';
    localStorage.setItem('zen.theme', light ? 'light' : 'dark');
  });

  /* ── 4. FUNC BUG list (contoh) --------------------------------------- */
  if (typeof bugData !== 'undefined') {
    const wrap = document.getElementById('bugList');
    bugData.forEach((b, i) => {
      const div = document.createElement('div');
      div.className = 'bug';
      div.innerHTML =
        `<span>${b.title}</span>
         <button onclick="copyBug(${i})">Copy</button>`;
      wrap.appendChild(div);
    });
  }
  window.copyBug = idx =>
    navigator.clipboard
      .writeText(atob(bugData[idx].funcB64))
      .then(() => toast('✅ Copied!'))
      .catch(() => toast('❌ Gagal menyalin', true));

  /* ── 5. TOAST --------------------------------------------------------- */
  function toast (msg, err = false) {
    const box = document.getElementById('toastContainer');
    const div = document.createElement('div');
    div.className = 'toast';
    if (err) div.style.borderLeftColor = 'red';
    div.textContent = msg;
    box.appendChild(div);
    setTimeout(() => {
      div.style.opacity = 0;
      setTimeout(() => box.removeChild(div), 500);
    }, 2200);
  }
});
