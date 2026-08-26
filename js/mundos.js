// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los planetas con atributo data-target
  const planetas = document.querySelectorAll('[data-target]');
  const closeButtons = document.querySelectorAll('.overlay .close');

  // Efecto de máquina de escribir: revela el texto letra por letra
  function escribirTexto(el, velocidad, cb) {
    if (!el) { if (cb) cb(); return; }
    if (el.dataset.fullText === undefined) {
      el.dataset.fullText = el.textContent;
    }
    const texto = el.dataset.fullText;
    clearInterval(el._typingInterval);
    el.textContent = '';
    el.classList.add('escribiendo');
    let i = 0;
    el._typingInterval = setInterval(() => {
      i++;
      el.textContent = texto.slice(0, i);
      if (i >= texto.length) {
        clearInterval(el._typingInterval);
        el.classList.remove('escribiendo');
        if (cb) cb();
      }
    }, velocidad);
  }

  function detenerEscritura(el) {
    if (!el) return;
    clearInterval(el._typingInterval);
    el.classList.remove('escribiendo');
    if (el.dataset.fullText !== undefined) {
      el.textContent = el.dataset.fullText;
    }
  }

  function abrirOverlay(overlay) {
    overlay.style.display = 'block';
    // fuerza reflow para que la animación se repita si se vuelve a abrir
    overlay.classList.remove('is-open');
    void overlay.offsetWidth;
    overlay.classList.add('is-open');

    const titulo = overlay.querySelector('.overlay__texto h2');
    const parrafo = overlay.querySelector('.overlay__texto p');
    detenerEscritura(titulo);
    detenerEscritura(parrafo);
    clearTimeout(overlay._typingTimeout);
    overlay._typingTimeout = setTimeout(() => {
      escribirTexto(titulo, 45, () => {
        escribirTexto(parrafo, 12);
      });
    }, 250);
  }

  function cerrarOverlay(overlay) {
    overlay.classList.remove('is-open');
    overlay.style.display = 'none';
    clearTimeout(overlay._typingTimeout);
    detenerEscritura(overlay.querySelector('.overlay__texto h2'));
    detenerEscritura(overlay.querySelector('.overlay__texto p'));
  }

  // Abrir overlay correspondiente al hacer clic en un planeta
  planetas.forEach(planeta => {
    planeta.addEventListener('click', () => {
      const targetId = planeta.getAttribute('data-target');
      const overlay = document.getElementById(targetId);
      if (overlay) {
        abrirOverlay(overlay);
      }
    });
  });

  // Cerrar overlay al hacer clic en el botón de cierre
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const overlay = button.closest('.overlay');
      if (overlay) {
        cerrarOverlay(overlay);
      }
    });
  });

  // Opcional: cerrar el overlay si se hace clic fuera del contenido
  const overlays = document.querySelectorAll('.overlay');
  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        cerrarOverlay(overlay);
      }
    });
  });

  // Parallax del starfield: cada capa se mueve a distinta velocidad al hacer scroll
  const capasEstrellas = [
    { el: document.getElementById('starsFar'), velocidad: 0.05 },
    { el: document.getElementById('starsMid'), velocidad: 0.15 },
    { el: document.getElementById('starsNear'), velocidad: 0.3 },
  ];

  let actualizandoParallax = false;

  function actualizarParallax() {
    const scrollY = window.scrollY;
    capasEstrellas.forEach(({ el, velocidad }) => {
      if (el) el.style.backgroundPositionY = `${scrollY * velocidad}px`;
    });
    actualizandoParallax = false;
  }

  window.addEventListener('scroll', () => {
    if (!actualizandoParallax) {
      requestAnimationFrame(actualizarParallax);
      actualizandoParallax = true;
    }
  }, { passive: true });
});
