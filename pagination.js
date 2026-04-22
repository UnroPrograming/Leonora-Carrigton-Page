const secciones = [
  { id: 'Portada',      paginas: 1 },
  { id: 'Biografía',    paginas: 4 },
  { id: 'Exposición',   paginas: 1 },
  { id: 'Curiosidades', paginas: 1 },
];

let seccionActual = 0;
let paginaActual  = 0;


function mostrar(sec, pag) {
  // Ocultar todo
  document.querySelectorAll('.pagina-contenido').forEach(el => {
      el.classList.remove('activa');
  });

  // Mostrar la correcta
  const selector = `[data-seccion="${secciones[sec].id}"][data-pagina="${pag}"]`;
  document.querySelector(selector).classList.add('activa');

  // Actualizar indicador
  document.getElementById('indicador').textContent =
      `${secciones[sec].id} · ${pag + 1} / ${secciones[sec].paginas}`;

  // Sincronizar post-its
  document.querySelectorAll('.postit').forEach(el => el.classList.remove('activo'));
  document.querySelector(`.postit[data-seccion="${secciones[sec].id}"]`)
      ?.classList.add('activo');

  // // Cambiar fondo según sección
  const pagina = document.querySelector('.pagina');

  if (secciones[sec].id === 'Portada') {
    pagina.classList.remove('fondo-normal');
    pagina.classList.add('fondo-portada');
    document.querySelector('.contenido').style.visibility = 'hidden';
  } else {
    pagina.classList.remove('fondo-portada');
    pagina.classList.add('fondo-normal');
    document.querySelector('.contenido').style.visibility = 'visible';
  }
}

document.getElementById('btn-siguiente').addEventListener('click', () => {
  if (paginaActual < secciones[seccionActual].paginas - 1) {
    paginaActual++;
  } else if (seccionActual < secciones.length - 1) {
    seccionActual++;
    paginaActual = 0;
  }
  mostrar(seccionActual, paginaActual);
});

document.getElementById('btn-anterior').addEventListener('click', () => {
  if (paginaActual > 0) {
    paginaActual--;
  } else if (seccionActual > 0) {
    seccionActual--;
    paginaActual = secciones[seccionActual].paginas - 1;
  }
  mostrar(seccionActual, paginaActual);
});

// Los post-its también navegan
document.querySelectorAll('.postit').forEach(el => {
  el.addEventListener('click', () => {
    const idx = secciones.findIndex(s => s.id === el.dataset.seccion);
    if (idx !== -1) { seccionActual = idx; paginaActual = 0; mostrar(seccionActual, paginaActual); }
  });
});

// Arrancar en portada
mostrar(0, 0);