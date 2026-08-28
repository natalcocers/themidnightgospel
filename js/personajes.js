/* Info de cada personaje para la pantalla de detalle: descripción, planeta
   (mismos nombres/textos que en mundos.html) e imagen alterna a la del carrusel */
const personajesInfo = {
  Clancy: {
    descripcion: 'Es un "spacecaster" que utiliza un simulador de universos para viajar a diferentes mundos y entrevistar a sus habitantes sobre temas existenciales. Su búsqueda constante de conocimiento lo lleva a cuestionar la naturaleza de la realidad y su propio propósito.',
    planetaNombre: 'Lazo Cromático',
    planetaDescripcion: 'Cinta multicolor suspendida en el vacío, sembrada de biocomputadoras "granja-simulador". Arquitectura orgánica que palpita con luces neón y filamentos de datos.',
    imagen: 'imgs/Clancy.png',
  },
  Anne: {
    descripcion: 'Habitante de Clownplanet con forma de ciervo-perro, mezcla de ternura infantil y crudeza circense. Acompaña a Clancy en sus travesías y con humor absurdo pone en palabras los miedos que todos evitamos nombrar.',
    planetaNombre: 'Clownplanet',
    planetaDescripcion: 'Ecosistema de bebés payaso y ciervos-perro; colores circo-pastel que contrastan con mataderos industriales y arañas parásitas.',
    imagen: 'imgs/anne.png',
  },
  Bob: {
    descripcion: 'Payaso de mirada cansada que habita Clownplanet y esconde una sabiduría inesperada bajo el maquillaje. Su presencia recuerda que la comedia y el dolor pueden convivir en un mismo cuerpo.',
    planetaNombre: 'Clownplanet',
    planetaDescripcion: 'Ecosistema de bebés payaso y ciervos-perro; colores circo-pastel que contrastan con mataderos industriales y arañas parásitas.',
    imagen: 'imgs/bob.png',
  },
  Darryl: {
    descripcion: 'Ciervo-perro de Clownplanet, compañero de Bob y Anne en un mundo donde la fiesta y la masacre conviven a la vuelta de la esquina. Su tono relajado contrasta con la intensidad del entorno que habita.',
    planetaNombre: 'Clownplanet',
    planetaDescripcion: 'Ecosistema de bebés payaso y ciervos-perro; colores circo-pastel que contrastan con mataderos industriales y arañas parásitas.',
    imagen: 'imgs/darryl.png',
  },
  David: {
    descripcion: 'Ave humanoide que habita Luna R3T8, el satélite-prisión donde las almas repiten sus ciclos de muerte. Observa el ir y venir de los reclusos con la calma de quien ya entendió que todo, tarde o temprano, vuelve a empezar.',
    planetaNombre: 'Luna R3T8',
    planetaDescripcion: 'Satélite-prisión gris, laberinto vertical de celdas donde almas reinciden en bucles de muerte; nubes tóxicas y pilares de roca translúcida.',
    imagen: 'imgs/davidd.png',
  },
  Deneen: {
    descripcion: 'Otra habitante alada de Luna R3T8, cercana a David, que recorre los pasillos grises de la prisión-satélite con una calidez que contrasta con el paisaje tóxico que la rodea.',
    planetaNombre: 'Luna R3T8',
    planetaDescripcion: 'Satélite-prisión gris, laberinto vertical de celdas donde almas reinciden en bucles de muerte; nubes tóxicas y pilares de roca translúcida.',
    imagen: 'imgs/deneenn.png',
  },
  Muerte: {
    descripcion: 'La Muerte misma, guadaña en mano, encargada de custodiar los bucles de Luna R3T8. Más que un final, representa el umbral: la transición que la serie invita a mirar sin miedo.',
    planetaNombre: 'Luna R3T8',
    planetaDescripcion: 'Satélite-prisión gris, laberinto vertical de celdas donde almas reinciden en bucles de muerte; nubes tóxicas y pilares de roca translúcida.',
    imagen: 'imgs/muerte.png',
  },
  'Presidente Little': {
    descripcion: 'Gobierna Luna R3T8 desde un despacho de protocolos absurdos, decidiendo el destino de las almas presas. Su figura autoritaria oculta un miedo propio a aquello que administra.',
    planetaNombre: 'Luna R3T8',
    planetaDescripcion: 'Satélite-prisión gris, laberinto vertical de celdas donde almas reinciden en bucles de muerte; nubes tóxicas y pilares de roca translúcida.',
    imagen: 'imgs/presidente-little.png',
  },
  Trudy: {
    descripcion: 'Ciervo-perro de Clownplanet que encuentra calma en medio del caos circense. Su forma de hablar despacio invita a Clancy a bajar el ritmo y simplemente escuchar.',
    planetaNombre: 'Clownplanet',
    planetaDescripcion: 'Ecosistema de bebés payaso y ciervos-perro; colores circo-pastel que contrastan con mataderos industriales y arañas parásitas.',
    imagen: 'imgs/trudyy.png',
  },
};

/* Apaga la pantalla "salir" (tipo CRT), y al terminar prende "entrar" */
function crtTransicion(salir, entrar) {
  salir.classList.add('crt-apagar');
  salir.addEventListener('animationend', function onOff() {
    salir.removeEventListener('animationend', onOff);
    salir.classList.remove('crt-apagar');
    salir.classList.add('oculto');

    entrar.classList.remove('oculto');
    void entrar.offsetWidth; // fuerza reflow para poder reiniciar la animación
    entrar.classList.add('crt-encender');
    entrar.addEventListener('animationend', function onOn() {
      entrar.removeEventListener('animationend', onOn);
      entrar.classList.remove('crt-encender');
    }, { once: true });
  }, { once: true });
}

document.addEventListener('DOMContentLoaded', () => {
  const btnChoose = document.getElementById('btn-choose-avatar');
  const pantallaChoose = document.getElementById('pantalla-choose');
  const pantallaSelect = document.getElementById('pantalla-select');
  const pantallaDetalle = document.getElementById('pantalla-detalle');
  const carousel = document.getElementById('avatar-carousel');
  const flechaIzq = document.getElementById('carousel-flecha-izq');
  const flechaDer = document.getElementById('carousel-flecha-der');
  const cards = Array.from(document.querySelectorAll('.avatar-card'));
  const nombreTexto = document.getElementById('avatar-nombre-texto');
  const btnSelect = document.getElementById('avatar-btn-select');
  const btnDetalleVolver = document.getElementById('btn-detalle-volver');
  const detalleNombre = document.getElementById('detalle-nombre');
  const detalleDescripcion = document.getElementById('detalle-descripcion');
  const detallePlanetaNombre = document.getElementById('detalle-planeta-nombre');
  const detallePlanetaDescripcion = document.getElementById('detalle-planeta-descripcion');
  const detalleImagen = document.getElementById('detalle-imagen');
  const total = cards.length;

  let currentIndex = 0;

  function actualizarNombre() {
    nombreTexto.textContent = cards[currentIndex].dataset.nombre;
    nombreTexto.classList.remove('avatar-nombre-texto--anim');
    void nombreTexto.offsetWidth; // fuerza reflow para poder reiniciar la animación
    nombreTexto.classList.add('avatar-nombre-texto--anim');
  }

  function layout() {
    const gapRatio = window.innerWidth <= 720 ? 0.85 : 0.6;
    const gap = carousel.clientWidth * gapRatio;

    cards.forEach((card, i) => {
      let offset = i - currentIndex;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
      const abs = Math.abs(offset);

      let escala, opacidad, z, eventos;
      if (abs === 0) {
        escala = 1; opacidad = 1; z = 5; eventos = 'auto';
      } else if (abs === 1) {
        escala = 0.58; opacidad = 0.8; z = 3; eventos = 'auto';
      } else {
        escala = 0.4; opacidad = 0; z = 1; eventos = 'none';
      }

      card.style.transform = `translate(-50%, -50%) translateX(${offset * gap}px) scale(${escala})`;
      card.style.opacity = opacidad;
      card.style.zIndex = z;
      card.style.pointerEvents = eventos;
      card.classList.toggle('avatar-card--activo', abs === 0);
    });
  }

  function irA(index) {
    currentIndex = ((index % total) + total) % total;
    layout();
    actualizarNombre();
  }

  function revelarAvatares() {
    cards.forEach((card, i) => {
      card.classList.remove('avatar-card--in');
      card.style.setProperty('--delay', `${i * 0.08}s`);
      void card.offsetWidth; // fuerza reflow para poder reiniciar la animación
      card.classList.add('avatar-card--in');
    });
  }

  btnChoose.addEventListener('click', () => {
    pantallaChoose.classList.add('oculto');
    pantallaSelect.classList.remove('oculto');
    layout();
    revelarAvatares();
  });

  flechaIzq.addEventListener('click', () => irA(currentIndex - 1));
  flechaDer.addEventListener('click', () => irA(currentIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (pantallaSelect.classList.contains('oculto')) return;
    if (e.key === 'ArrowLeft') irA(currentIndex - 1);
    if (e.key === 'ArrowRight') irA(currentIndex + 1);
  });

  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      if (i !== currentIndex) irA(i);
    });
  });

  window.addEventListener('resize', layout);

  btnSelect.addEventListener('click', () => {
    const nombre = cards[currentIndex].dataset.nombre;
    localStorage.setItem('personajeSeleccionado', nombre);
    btnSelect.classList.add('avatar-btn-select--activo');
    clearTimeout(btnSelect._timeout);
    btnSelect._timeout = setTimeout(() => btnSelect.classList.remove('avatar-btn-select--activo'), 900);

    const info = personajesInfo[nombre] || {};
    detalleNombre.textContent = nombre;
    detalleDescripcion.textContent = info.descripcion || '';
    detallePlanetaNombre.textContent = info.planetaNombre || '';
    detallePlanetaDescripcion.textContent = info.planetaDescripcion || '';
    detalleImagen.src = info.imagen || '';
    detalleImagen.alt = nombre;

    crtTransicion(pantallaSelect, pantallaDetalle);
  });

  btnDetalleVolver.addEventListener('click', () => {
    crtTransicion(pantallaDetalle, pantallaSelect);
  });

  layout();
  actualizarNombre();
});
