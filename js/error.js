document.addEventListener("DOMContentLoaded", () => {
  /* ==== Constantes y elementos base ==== */
  const root      = document.getElementById("popup-root");
  const template  = document.getElementById("popup-template");
  const variants  = ["popup-cyan", "popup-magenta", "popup-green"];
  const LIMIT     = 6;               // Ventanas que deben cerrarse antes de mostrar root otra vez
  let   closed    = 0;

  /* Coloca el root centrado y arrastrable */
root.querySelector(".popup-close").addEventListener("click", () => {
  const boton = root.querySelector(".boton-click-aqui");
  if (boton) boton.style.display = "none"; // Oculta el botón
  root.remove();
  spawnPopups();
});


  /* ---- Funciones principales ---- */
  function spawnPopups() {
    closed++;
    if (closed >= LIMIT) { showRootAgain(); return; }

    // Generar 2-4 ventanas nuevas
    const n = Math.floor(Math.random()*3)+2;
    for (let i=0; i<n; i++) {
      const pop  = template.cloneNode(true);
      pop.classList.remove("oculto","popup-template");
      pop.classList.add( variants[Math.floor(Math.random()*variants.length)] );

      // Quitar botón si existe por clonación
      const btn = pop.querySelector(".boton-click-aqui");
      if (btn) btn.remove();

      randomPos(pop);
      document.body.appendChild(pop);

      pop.querySelector(".popup-close").addEventListener("click", () => {
        pop.remove();
        spawnPopups();
      });

      enableDrag(pop);
    }
  }

 function showRootAgain() {
  closed = 0;
  const boton = root.querySelector(".boton-click-aqui");
  if (boton) boton.style.display = "block"; // Muestra el botón de nuevo
  document.body.appendChild(root);
  center(root);
}


  /* ---- Utilidades ---- */
  function center(el) {
    el.style.top  = `calc(50vh - ${el.offsetHeight/2}px)`;
    el.style.left = `calc(50vw - ${el.offsetWidth/2}px)`;
  }

  function randomPos(el) {
    const x = Math.random()*(window.innerWidth  - el.offsetWidth);
    const y = Math.random()*(window.innerHeight - el.offsetHeight);
    el.style.left = `${x}px`;
    el.style.top  = `${y}px`;
  }

  function enableDrag(win) {
    const bar = win.querySelector(".popup-bar");
    let drag = false, startX, startY;

    bar.addEventListener("mousedown", (e) => {
      drag   = true;
      startX = e.clientX - win.offsetLeft;
      startY = e.clientY - win.offsetTop;
      win.style.zIndex = Date.now();   // Traer al frente
    });

    document.addEventListener("mousemove", (e) => {
      if (!drag) return;
      win.style.left = `${e.clientX - startX}px`;
      win.style.top  = `${e.clientY - startY}px`;
    });

    document.addEventListener("mouseup", () => { drag = false; });
  }
});
