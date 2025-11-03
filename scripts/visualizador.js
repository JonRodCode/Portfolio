const imagenesProyecto1 = document.querySelectorAll('.proyecto1 img');
const imagenesProyecto2 = document.querySelectorAll('.proyecto2 img');
const imagenes = [
  { nombre: "proyecto1", imagenes: imagenesProyecto1 },
  { nombre: "proyecto2", imagenes: imagenesProyecto2 }
];
const visualizador = document.getElementById('visualizador');
const imagenGrande = visualizador.querySelector('.imagen-grande');
const botonCerrar = visualizador.querySelector('.cerrar');
const flechaIzq = visualizador.querySelector('.flecha-izq');
const flechaDer = visualizador.querySelector('.flecha-der');

let indiceActual = 0;
let proyecto = "";

// Abrimos el visualizador
imagenes.forEach((elemento) => {
  elemento.imagenes.forEach((img, index) => {
    img.addEventListener('click', () => {
      imagenGrande.src = img.src;
      visualizador.style.display = 'flex';
      indiceActual = index;
      proyecto = elemento.nombre;
    });
  });
});


function mostrarImagen(indice) {
    const indiceDeVisualizador = proyecto === "proyecto1" ? 0 : 1;
    const imagenesActuales = imagenes[indiceDeVisualizador].imagenes;
    if (indice < 0) indice = 0;
    if (indice >= imagenesActuales.length) indice -= 1;
    imagenGrande.src = imagenesActuales[indice].src;
    indiceActual = indice;
}

// Flechitas de navegación y boton cerrar
flechaIzq.addEventListener('click', () => mostrarImagen(indiceActual - 1));
flechaDer.addEventListener('click', () => mostrarImagen(indiceActual + 1));
botonCerrar.addEventListener('click', () => {
    visualizador.style.display = 'none';
});

// Aca detectamos si las teclas de las flechas y la tecla escape son pulsadas
document.addEventListener('keydown', (e) => {
    if (visualizador.style.display === 'flex') {
    if (e.key === 'ArrowLeft') mostrarImagen(indiceActual - 1);
    if (e.key === 'ArrowRight') mostrarImagen(indiceActual + 1);
    if (e.key === 'Escape') visualizador.style.display = 'none';
    }
});