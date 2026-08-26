// Create custom eases and register GSAP plugins
CustomEase.create("smoothIn", "0.4, 0, 0.2, 1");
CustomEase.create("smoothOut", "0.8, 0, 0.6, 1");
CustomEase.create("textReveal", "0.25, 1, 0.5, 1");
gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

// Initialize variables
let lenis = null;
let splitTextInstances = [];
let isWebEntered = false;
let activeIndex = 0;
let isAnimating = false;

// DOM elements
const preloader = document.getElementById("preloader");
const preloaderCounter = document.getElementById("preloader-counter");
const body = document.body;
const mainContent = document.querySelector("main");
const expandingImage = document.getElementById("expandingImage");
const enterButton = document.getElementById("enterButton");
const switchContainer = document.getElementById("switchContainer");
const scrollText = document.getElementById("scrollText");
const contentSection = document.getElementById("contentSection");
const heroSection = document.querySelector(".hero-section");
const slideTitle = document.getElementById("slideTitle");
const contentParagraph = document.getElementById("content-paragraph");
const slideCaption = document.getElementById("slideCaption");
const slideCategory = document.getElementById("slideCategory");
const grid = document.querySelector(".columns");
const columnsInner = {
  up: grid.querySelectorAll(".column-moveup > .column-inner"),
  down: grid.querySelectorAll(".column-movedown > .column-inner")
};
const content = document.querySelector(".content");
const thumbnails = document.querySelector(".thumbnails");
const thumbnailItems = thumbnails.querySelectorAll(".thumbnail");

// Lock scrolling initially
document.body.style.overflow = "hidden";

// Image and content data
//const imageUrls = [
 //"https://cdn.cosmos.so/5eee2d2d-3d4d-4ae5-96d4-cdbae70a2387?format=jpeg",
 //"https://cdn.cosmos.so/def30e8a-34b2-48b1-86e1-07ec5c28f225?format=jpeg",
 //"https://cdn.cosmos.so/44d7cb23-6759-49e4-9dc1-acf771b3a0d1?format=jpeg",
// "https://cdn.cosmos.so/7712fe42-42ca-4fc5-9590-c89f2db99978?format=jpeg",
//"https://cdn.cosmos.so/cbee1ec5-01b6-4ffe-9f34-7da7980454cf?format=jpeg",
 // "https://cdn.cosmos.so/2e91a9d1-db85-4499-ad37-6222a6fea23b?format=jpeg",
 // "https://cdn.cosmos.so/7d47d4e2-0eff-4e2f-9734-9d24a8ba067e?format=jpeg"
 //];

const slideTitles = [
  { first: "Frag", second: "mentos" },
  { first: "Presen", second: "cia" },
  { first: "Ego", second: "?" },
  { first: "Tiempo", second: "fluido" },
  { first: "Sombra", second: "propia" },
  { first: "Caos", second: " maestro" },
  { first: "Muerte", second: "viva" }
];

const slideCaptions = [
  "01 / IDEAS",
  "02 / PRESENCIA RADICAL",
  "03 / MAS ALLA DEL YO",
  "04 / AQUI",
  "05 / ACEPTACION PROFUNDA",
  "06 / CAER PARA VER",
  "07 / EL FIN COMO INICIO"
];

const slideCategories = [
  "EL VIAJE",
  "AQUI Y AHORA",
  "TESTIGO INTERNO",
  "TIEMPO SIN RELOJ",
  "HACER CONCIENTE LO INCONCIENTE",
  "TODO TE TRAJO AQUI",
  "DUELO CONSCIENTE"
];

const slideContent = [
  "No es una biblioteca. No es una sección de frases ni de conceptos. Es un viaje silencioso a través de pequeñas ideas que alguien dijo mientras hablaba desde el corazón. Conversaciones crudas, dulces, lúcidas.",
  "Nada necesita ser distinto ahora. No hay pasado que cambiar ni futuro que controlar. Solo este instante, este cuerpo, esta respiración. Estar aquí es suficiente.",
  "La voz en tu cabeza no eres vos. No eres quien piensa, quien habla, eres quien escucha, quien observa. Pues la conciencia verdadera es la que observa sin juzgar. Cuando el ego se calma, escuchás lo real.",
  "El pasado es memoria. El futuro, imaginación. Lo único que existe es esto: lo que estás sintiendo, pensando y respirando ahora. Todo lo demás vive solo en tu mente. Querés paz? Estás buscándola en el lugar equivocado. No la vas a encontrar en otro momento, en otro cuerpo, en otra versión de vos. Solo existe ahora.",
  "Hay partes de vos que evitas mirar. Tus miedos, tus enojos, tus vergüenzas. Pero no desaparecen. Se esconden, y dirigen tu vida desde la oscuridad. El trabajo con la sombra no es destruirlas, es abrazarlas.",
  "El caos es el lenguaje del cambio. No es el enemigo, es el maestro que rompe estructuras para que crezcas. Cuando todo se desarma, la verdad aparece. No trates de controlarlo. Escuchalo.",
  "No es el final, es parte del camino. Cuando dejás de resistirte a la pérdida, dejás de sufrir.  Y ahí empieza el amor real. No hace falta morir físicamente para experimentar una muerte. Cada vez que algo dentro tuyo cambia —una creencia, una relación, una etapa— estás atravesando una pequeña muerte. Morimos muchas veces en la vida, y eso está bien. "
];

// Preloader function
function runPreloader() {
  gsap.set(mainContent, {
    opacity: 0,
    visibility: "hidden"
  });

  let counter = 0;
  const duration = 2000;
  const interval = 20;
  const increment = 100 / (duration / interval);

  const counterInterval = setInterval(() => {
    counter += increment;
    if (counter >= 100) {
      counter = 100;
      clearInterval(counterInterval);

      gsap.to(preloader, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          preloader.style.display = "none";
          gsap.to(mainContent, {
            opacity: 1,
            visibility: "visible",
            duration: 0.5
          });

          gsap.timeline().set(grid, { opacity: 1 }).fromTo(
            ".column",
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.6,
              ease: "power2.out"
            }
          );
        }
      });
    }
    preloaderCounter.textContent = Math.floor(counter);
  }, interval);
}

// Text animation function using GSAP SplitText
function animateText(element, delay = 0, staggered = false) {
  gsap.set(element, { opacity: 1 });

  // Clean up previous split instances
  splitTextInstances = splitTextInstances.filter((instance) => {
    if (instance.target === element) {
      instance.revert();
      return false;
    }
    return true;
  });

  // Create new SplitText instance - using chars instead of lines for better control
  const splitText = new SplitText(element, {
    type: "words,chars",
    charsClass: "char",
    wordsClass: "word"
  });

  splitTextInstances.push(splitText);

  // Create animation timeline
  const tl = gsap.timeline();

  // Animate based on whether it's staggered or not
  if (staggered && element.children.length > 1) {
    // First line (first child)
    tl.from(element.children[0].querySelectorAll(".char"), {
      duration: 0.9,
      yPercent: 100,
      opacity: 0.2,
      stagger: 0.03,
      ease: "textReveal",
      delay: delay
    });

    // Second line (second child) with delay
    tl.from(
      element.children[1].querySelectorAll(".char"),
      {
        duration: 0.9,
        yPercent: 100,
        opacity: 0.2,
        stagger: 0.03,
        ease: "textReveal"
      },
      "-=0.5"
    );
  } else {
    // Regular animation for all chars
    tl.from(splitText.chars, {
      duration: 0.9,
      yPercent: 100,
      opacity: 0.2,
      stagger: 0.02,
      ease: "textReveal",
      delay: delay
    });
  }

  return tl;
}

// Update slide content with animation
function updateSlideContent(index) {
  // Clean up previous SplitText instances
  splitTextInstances.forEach((instance) => {
    if (instance.revert) instance.revert();
  });
  splitTextInstances = [];

  // Update content
  const title = slideTitles[index];
  slideTitle.innerHTML = `
    <span class="content-title">${title.first}</span>
    <span class="content-title">${title.second}</span>
  `;

  contentParagraph.textContent = slideContent[index];
  slideCaption.textContent = slideCaptions[index];
  slideCategory.textContent = slideCategories[index];

  // Create animation timeline
  const masterTl = gsap.timeline();

  // Animate elements
  masterTl.fromTo(
    [slideCaption, slideCategory],
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
    0
  );

  const titleTl = animateText(slideTitle, 0.05, true);
  const paragraphTl = animateText(contentParagraph, 0.4);

  masterTl.add(titleTl, 0);
  masterTl.add(paragraphTl, 0);

  return masterTl;
}

// Find leftmost visible image
function findLeftmostVisibleImage() {
  const images = document.querySelectorAll(".column-item-img");
  let leftmostImage = null;
  let leftmostX = Infinity;

  images.forEach((img) => {
    const rect = img.getBoundingClientRect();
    if (
      rect.left < window.innerWidth &&
      rect.right > 0 &&
      rect.top < window.innerHeight &&
      rect.bottom > 0
    ) {
      if (rect.left < leftmostX) {
        leftmostX = rect.left;
        leftmostImage = img;
      }
    }
  });
  return leftmostImage;
}

// Initialize Lenis smooth scrolling
function initializeLenis() {
  if (!lenis) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }
}

// Enter the web animation
const enterTheWeb = () => {
  if (isAnimating || isWebEntered) return;
  isAnimating = true;

  switchContainer.style.paddingLeft = "30px";

  gsap.to(switchContainer, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      switchContainer.style.display = "none";
    }
  });

  content.classList.add("content--current");

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
      isWebEntered = true;

      gsap.set(
        [
          ".expanding-image",
          ".content",
          ".content-paragraph",
          ".thumbnails",
          ".scroll-text",
          ".slide-caption",
          ".slide-category"
        ],
        { position: "absolute" }
      );

      initializeLenis();
      document.body.style.overflow = "auto";

      gsap.to(scrollText, {
        opacity: 1,
        duration: 0.5,
        delay: 0.5
      });

      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(".hero-section", {
            height: 100 - self.progress * 40 + "vh",
            duration: 0,
            width: "100%",
            transformOrigin: "center top"
          });

          gsap.to(".expanding-image", {
            scale: 1 + self.progress * 0.1,
            y: -self.progress * 25 + "%",
            duration: 0,
            width: "100vw",
            height: 100 + self.progress * 30 + "vh"
          });

          const contentWrapper = document.querySelector(".content");
          gsap.to(contentWrapper, {
            y: -self.progress * 50 + "%",
            opacity: 1 - self.progress * 0.7,
            duration: 0
          });

          gsap.to(".content-paragraph", {
            y: -self.progress * 50 + "%",
            opacity: 1 - self.progress * 0.7,
            duration: 0
          });

          gsap.to([".slide-caption", ".slide-category"], {
            y: -self.progress * 50 + "%",
            opacity: 1 - self.progress * 0.7,
            duration: 0
          });

          gsap.to(".thumbnails", {
            y: -self.progress * 50 + "%",
            opacity: 1 - self.progress * 0.7,
            duration: 0
          });

          gsap.to(".scroll-text", {
            opacity: 1 - self.progress * 2,
            y: -self.progress * 20 + "%",
            duration: 0
          });
        }
      });
    }
  });

  // Step 1: Zoom grid
  tl.to(grid, { scale: 1, duration: 0.8, ease: "power2.inOut" }, 0);

  tl.to(
    columnsInner.up,
    { y: "-200vh", duration: 0.8, ease: "power2.inOut" },
    0
  );
  tl.to(
    columnsInner.down,
    { y: "200vh", duration: 0.8, ease: "power2.inOut" },
    0
  );

  // Step 2: Set up expanding image
  tl.add(() => {
    const leftImg = findLeftmostVisibleImage();
    if (leftImg) {
      const imgRect = leftImg.getBoundingClientRect();
      const imgStyle = window.getComputedStyle(leftImg);
      const bgImage = imgStyle.backgroundImage;

      expandingImage.style.backgroundImage = bgImage;
      expandingImage.style.top = `${imgRect.top}px`;
      expandingImage.style.left = `${imgRect.left}px`;
      expandingImage.style.width = `${imgRect.width}px`;
      expandingImage.style.height = `${imgRect.height}px`;
      expandingImage.style.opacity = 1;

      activeIndex = parseInt(leftImg.getAttribute("data-index"));

      document.querySelector(".thumbnail.active").classList.remove("active");
      document
        .querySelector(`.thumbnail[data-index="${activeIndex}"]`)
        .classList.add("active");
    }
  }, 0.8);

  // Step 3: Expand image
  tl.to(
    expandingImage,
    { width: "100vw", duration: 0.7, ease: "power2.inOut" },
    1.0
  );
  tl.to(grid, { opacity: 0, duration: 0.3 }, 1.2);

  // Step 4: Show content
  tl.add(() => updateSlideContent(activeIndex), 1.8);
  tl.set(thumbnails, { opacity: 1 }, 2.2);
  tl.to(
    thumbnailItems,
    { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" },
    2.3
  );
};

// Handle thumbnail clicks
thumbnailItems.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    if (!isWebEntered || isAnimating) return;

    document.querySelector(".thumbnail.active").classList.remove("active");
    thumb.classList.add("active");

    activeIndex = index;

    gsap.to(expandingImage, {
      opacity: 0.5,
      duration: 0.3,
      onComplete: () => {
        expandingImage.style.backgroundImage = `url(${imageUrls[index]})`;
        gsap.to(expandingImage, { opacity: 1, duration: 0.3 });
      }
    });

    gsap.set([slideCaption, slideCategory], { opacity: 0, y: -20 });
    updateSlideContent(index);
  });
});

// Enter button hover effects
enterButton.addEventListener("mouseenter", () => {
  enterButton.querySelector(".indicator-dot").style.opacity = "1";
  switchContainer.style.paddingLeft = "30px";
});

enterButton.addEventListener("mouseleave", () => {
  enterButton.querySelector(".indicator-dot").style.opacity = "0";
  switchContainer.style.paddingLeft = "20px";
});

// Enter button click
enterButton.addEventListener("click", enterTheWeb);

// Scroll event handler
window.addEventListener("scroll", () => {
  if (isWebEntered) {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      gsap.to(scrollText, { opacity: 0, duration: 0.3 });
    } else {
      gsap.to(scrollText, { opacity: 1, duration: 0.3 });
    }
  }
});

// Start preloader when page is loaded
window.addEventListener("load", runPreloader);