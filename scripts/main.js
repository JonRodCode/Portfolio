/* Año dinámico en el footer */
document.getElementById('anio').textContent = new Date().getFullYear();

/* Menú mobile */
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  const abierto = navMobile.classList.toggle('abierto');
  navToggle.setAttribute('aria-expanded', String(abierto));
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('abierto');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* Barra de progreso de scroll */
const progreso = document.getElementById('progreso');

function actualizarProgreso() {
  const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
  const porcentaje = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;
  progreso.style.width = porcentaje + '%';
}
window.addEventListener('scroll', actualizarProgreso, { passive: true });
actualizarProgreso();

/* Reveal on scroll */
const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefiereMenosMovimiento && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}
