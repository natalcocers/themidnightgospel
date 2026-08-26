document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('boton-comenzar');
  const pantallaInicio = document.getElementById('pantalla-inicio');
  const introVideo = document.getElementById('intro-video');
  const video = document.getElementById('video');
  const paginaIntro = document.getElementById('pagina-intro');
  const volverInicio = document.getElementById('volver-inicio');
  const footer = document.getElementById('footer');
  const botonClickAqui = document.querySelector('.boton-click-aqui');
  const skipButton = document.getElementById('skipButton');

  // Asegurarse que el footer esté oculto al cargar
  footer.classList.add('oculto');

  btn.addEventListener('click', () => {
      pantallaInicio.classList.add('oculto');
      introVideo.classList.remove('oculto');
      footer.classList.add('oculto'); // Ocultar durante el video
      video.play();
  });

  video.addEventListener('ended', () => {
      introVideo.classList.add('oculto');
      paginaIntro.classList.remove('oculto');
      footer.classList.remove('oculto');

      setTimeout(() => {
          const containerIntro = document.querySelector('.container-intro');
          if (containerIntro) {
              containerIntro.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
      }, 150);
  });

  if (volverInicio) {
      volverInicio.addEventListener('click', () => {
          paginaIntro.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  if (skipButton) {
      skipButton.addEventListener('click', () => {
          video.pause();
          introVideo.classList.add('oculto');
          paginaIntro.classList.remove('oculto');
          footer.classList.remove('oculto');

          // Scroll suave hacia .container-intro (si existe)
          setTimeout(() => {
              const containerIntro = document.querySelector('.container-intro');
              if (containerIntro) {
                  containerIntro.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
          }, 150);
      });
  }
});

