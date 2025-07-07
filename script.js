/* ───────────── Zenix Web Tools – script.js (FULL) ───────────── */
document.addEventListener('DOMContentLoaded', () => {
  const sidebar   = document.getElementById('sidebar');
  const hamBtn    = document.querySelector('.ham');
  const themeBtn  = document.getElementById('themeToggle');
  const navLinks  = sidebar.querySelectorAll('a[href^="#"]');
  const pages     = document.querySelectorAll('.page');

  /* ── SIDEBAR ─────────────────────────── */
  function toggleSidebar () {
    sidebar.classList.toggle('open');
    document.body.classList.toggle('sidebar-closed',
      !sidebar.classList.contains('open'));
  }
  hamBtn.addEventListener('click', toggleSidebar);
  window.toggleSidebar = toggleSidebar; // agar onclick inline jalan

  /* ── PAGE ROUTING ────────────────────── */
  function show(id) {
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
  show('welcome');

  /* ── THEME ───────────────────────────── */
  if (localStorage.getItem('zen.theme') === 'light') {
    document.body.classList.add('light');
    themeBtn.textContent = '☀️';
  }
  themeBtn.addEventListener('click', () => {
    const l = document.body.classList.toggle('light');
    themeBtn.textContent = l ? '☀️' : '🌓';
    localStorage.setItem('zen.theme', l ? 'light' : 'dark');
  });

  /* ── FUNC BUG RENDER ─────────────────── */
  if (typeof bugData !== 'undefined') {
    const box = document.getElementById('bugList');
    bugData.forEach((b,i) => {
      const div = document.createElement('div');
      div.className = 'bug';
      div.innerHTML = `<span>${b.title}</span>
                       <button onclick="copyBug(${i})">Copy</button>`;
      box.appendChild(div);
    });
  }
  window.copyBug = idx =>
    navigator.clipboard.writeText(atob(bugData[idx].funcB64))
      .then(()=>toast('✅ Copied!'))
      .catch(()=>toast('❌ Gagal',true));

  /* ── TOAST ───────────────────────────── */
  function toast(msg, err=false){
    const c = document.getElementById('toastContainer');
    const d = document.createElement('div');
    d.className='toast'; if(err)d.style.borderLeftColor='red';
    d.textContent = msg; c.appendChild(d);
    setTimeout(()=>{d.style.opacity=0;setTimeout(()=>c.removeChild(d),500)},2300);
  }
});
