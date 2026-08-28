/* Info de cada personaje para la pantalla de detalle: descripción, planeta
   (mismos nombres/textos que en mundos.html) e imagen alterna a la del carrusel */
const personajesInfo = {
  Clancy: {
    nombreCompleto: 'Clancy Gilroy',
    descripcion: 'Es un "spacecaster" que utiliza un simulador de universos para viajar a diferentes mundos y entrevistar a sus habitantes sobre temas existenciales. Su búsqueda constante de conocimiento lo lleva a cuestionar la naturaleza de la realidad y su propio propósito.',
    planetaNombre: 'Lazo Cromático',
    planetaDescripcion: 'Una dimensión donde se encuentran los cultivadores de simulaciones.',
    planetaImagen: 'imgs/lazocromatico.png',
    imagen: 'imgs/Clancy.png',
  },
  Anne: {
    descripcion: 'Es una figura sabia que acompaña a Clancy en una conversación profunda sobre la muerte y el perdón mientras se dirigen a un matadero. Destaca su serenidad y comprensión de la mortalidad, ofreciéndole a los espectadores una visión reconfortante sobre el ciclo de vida.',
    planetaNombre: 'Clownplanet',
    planetaDescripcion: 'Ecosistema de bebés payaso y ciervos-perro; colores circo-pastel que contrastan con mataderos industriales y arañas parásitas.',
    planetaImagen: 'imgs/clownplanet.png',
    imagen: 'imgs/annedeerdog.png',
  },
  Bob: {
    descripcion: 'Prisionero en un bucle temporal de muerte y resurrección dentro de una prisión existencial, reflexiona sobre el sufrimiento, el karma y el perdón. Su experiencia ilustra cómo la liberación mental no depende del entorno físico, sino de romper el apego al ego y comprender la compasión hacia uno mismo.',
    planetaNombre: 'Luna R3T8',
    planetaDescripcion: 'Satélite-prisión gris, laberinto vertical de celdas donde almas reinciden en bucles de muerte; nubes tóxicas y pilares de roca translúcida.',
    planetaImagen: 'imgs/luna.png',
    imagen: 'imgs/bob.png',
  },
  Darryl: {
    nombreCompleto: 'Darryl the Fish',
    descripcion: 'Encarna al neófito en las artes ocultas que desmitifica la magia ceremonial, la meditación y la cábala. Comparte su transición de la fascinación superficial por el poder esotérico hacia la comprensión de la verdadera voluntad, el dominio de la mente y la superación del miedo a la muerte.',
    planetaNombre: 'Acream',
    planetaDescripcion: 'Orbe completamente inundado, ruinas sumergidas y barcos-gato navegando corrientes fluorescentes.',
    planetaImagen: 'imgs/acream.png',
    imagen: 'imgs/darryl.png',
  },
  David: {
    descripcion: 'Encarna al maestro de meditación y guía espiritual de la tradición budista. Comparte su aprendizaje sobre la disciplina de la mente, el concepto de Chögyam Trungpa, la superación de las distracciones del ego y cómo la práctica constante permite estar presente incluso cuando todo a tu alrededor cae en el caos.',
    planetaNombre: 'Button 78914',
    planetaDescripcion: '',
    planetaImagen: 'imgs/acream.png',
    imagen: 'imgs/david.png',
  },
  Deneen: {
    descripcion: 'Recorre junto a Clancy todo el ciclo biológico —desde el nacimiento y la crianza hasta la vejez y la disolución— mientras discute la naturaleza de la presencia y la pérdida. Su historia es una lección sobre el amor sin apego, la transformación del dolor en sabiduría y el arte de dejar ir en el instante presente.',
    planetaNombre: 'Unknown',
    planetaDescripcion: '',
    planetaImagen: 'imgs/unknown.png',
    imagen: 'imgs/deneen.png',
  },
  Muerte: {
    descripcion: 'Personificada como una figura serena, acogedora y maternal, comparte una visión donde la finitud no es un castigo, sino la condición que le da sentido a la existencia. Su mensaje desmonta el tabú occidental sobre la muerte, invitando a ver el final de la vida como una transición natural que exige presencia y entrega.',
    planetaNombre: 'Blankball',
    planetaDescripcion: '',
    planetaImagen: 'imgs/planetadavid.png',
    imagen: 'imgs/muerte.png',
  },
  'Presidente Little': {
    descripcion: 'Líder de un mundo apocalíptico infestado por zombis. Mantiene una actitud estoica y reflexiva. Discute abiertamente sobre el uso de drogas y meditación mostrando una perspectiva contemplativa sobre estos temas.',
    planetaNombre: 'Tierra 4-169',
    planetaDescripcion: 'Planeta Tierra en pleno apocalipsis zombi: suburbios destruidos, pancartas antidroga y sangre sobre asfalto pop.',
    planetaImagen: 'imgs/planetalittle.png',
    imagen: 'imgs/presidente-little.png',
  },
  Trudy: {
    descripcion: 'Enfrenta una búsqueda de venganza en un mundo en ruinas mientras expone cómo atravesar el duelo, la pérdida y el dolor emocional. Su viaje no busca aniquilar el sufrimiento, sino integrarlo para transformarlo en una forma de amor incondicional y aceptación de la impermanencia.',
    planetaNombre: 'Mercuritaville',
    planetaDescripcion: 'Destino vacacional sugerido por el simulador: fusión de playa hedonista "Margaritaville" con misticismo de Mercurio/Hermes; un carnaval psicodélico de fiestas y alquimia.',
    planetaImagen: 'imgs/mercuritaville.png',
    imagen: 'imgs/trudy.png',
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
  const detallePlanetaImagen = document.getElementById('detalle-planeta-imagen');
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
    const gapRatio = window.innerWidth <= 720 ? 0.85 : 0.42;
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
    detalleNombre.textContent = info.nombreCompleto || nombre;
    detalleDescripcion.textContent = info.descripcion || '';
    detallePlanetaNombre.textContent = info.planetaNombre || '';
    detallePlanetaDescripcion.textContent = info.planetaDescripcion || '';
    detallePlanetaImagen.src = info.planetaImagen || 'imgs/clownplanet.png';
    detallePlanetaImagen.alt = info.planetaNombre || '';
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
