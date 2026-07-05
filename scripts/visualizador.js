const grupos = [
  { nombre: "proyecto1", imagenes: document.querySelectorAll('.proyecto1 img') },
  { nombre: "proyecto2", imagenes: document.querySelectorAll('.proyecto2 img') }
];

const visualizador = document.getElementById('visualizador');
const imagenGrande = visualizador.querySelector('.imagen-grande');
const contador = visualizador.querySelector('.contador');
const botonCerrar = visualizador.querySelector('.cerrar');
const flechaIzq = visualizador.querySelector('.flecha-izq');
const flechaDer = visualizador.querySelector('.flecha-der');

let grupoActual = null;
let indiceActual = 0;

grupos.forEach(grupo => {
  grupo.imagenes.forEach((img, index) => {
    img.addEventListener('click', () => abrirVisualizador(grupo, index));
  });
});

function abrirVisualizador(grupo, index) {
  grupoActual = grupo;
  indiceActual = index;
  mostrarImagenActual();
  visualizador.classList.add('abierto');
  visualizador.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function cerrarVisualizador() {
  visualizador.classList.remove('abierto');
  visualizador.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function mostrarImagenActual() {
  if (!grupoActual) return;
  const imagenes = grupoActual.imagenes;
  const total = imagenes.length;
  indiceActual = (indiceActual + total) % total; // navegación circular
  const img = imagenes[indiceActual];
  imagenGrande.src = img.src;
  imagenGrande.alt = img.alt;
  contador.textContent = `${indiceActual + 1} / ${total}`;
}

function siguiente() {
  indiceActual += 1;
  mostrarImagenActual();
}

function anterior() {
  indiceActual -= 1;
  mostrarImagenActual();
}

flechaIzq.addEventListener('click', anterior);
flechaDer.addEventListener('click', siguiente);
botonCerrar.addEventListener('click', cerrarVisualizador);

visualizador.addEventListener('click', (e) => {
  if (e.target === visualizador) cerrarVisualizador();
});

document.addEventListener('keydown', (e) => {
  if (!visualizador.classList.contains('abierto')) return;
  if (e.key === 'ArrowLeft') anterior();
  if (e.key === 'ArrowRight') siguiente();
  if (e.key === 'Escape') cerrarVisualizador();
});
