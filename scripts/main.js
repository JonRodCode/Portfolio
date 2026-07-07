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

async function enviarEmail(event) {
  event.preventDefault();

  const form = event.target;
  const status = document.getElementById('formStatus');
  const data = new FormData(form);
  const email = data.get('email');
  const asunto = data.get('asunto');

  if (!emailValido(email)) {
    status.textContent = 'Por favor ingresá un email válido.';
    return;
  }

  try {
    const response = await fetch('https://formspree.io/f/xvzjybnl', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      status.textContent = '¡Gracias! Tu mensaje fue enviado.';
      form.reset();
    } else {
      status.textContent = 'Hubo un error. Intentá de nuevo.';
    }
  } catch (error) {
    status.textContent = 'Hubo un error. Intentá de nuevo.';
  }
}

function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
