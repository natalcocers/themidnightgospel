document.addEventListener('DOMContentLoaded', () => {
  const btnChoose = document.getElementById('btn-choose-avatar');
  const pantallaChoose = document.getElementById('pantalla-choose');
  const pantallaSelect = document.getElementById('pantalla-select');
  const carousel = document.getElementById('avatar-carousel');
  const flechaIzq = document.getElementById('carousel-flecha-izq');
  const flechaDer = document.getElementById('carousel-flecha-der');
  const cards = Array.from(document.querySelectorAll('.avatar-card'));
  const nombreTexto = document.getElementById('avatar-nombre-texto');
  const btnSelect = document.getElementById('avatar-btn-select');
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
    localStorage.setItem('personajeSeleccionado', cards[currentIndex].dataset.nombre);
    btnSelect.classList.add('avatar-btn-select--activo');
    clearTimeout(btnSelect._timeout);
    btnSelect._timeout = setTimeout(() => btnSelect.classList.remove('avatar-btn-select--activo'), 900);
  });

  layout();
  actualizarNombre();
});
