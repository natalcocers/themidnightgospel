/// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 0.8, // Reduced from 1.2
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true
});

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, CustomEase);

// Sync Lenis with ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Custom eases
CustomEase.create("softReveal", "0.5, 0, 0, 1");
CustomEase.create("smoothBlur", "0.25, 0.1, 0.25, 1");

// Video animation
const videoContainerintro = document.getElementById("video-container-intro");
const videointro = document.getElementById("video-intro");
const videoOverlayintro = document.querySelector(".video-overlay-intro");
const overlayCaptionintro = document.querySelector(".video-overlay-intro .caption-intro");
const overlayContentintro = document.querySelector(".video-overlay-intro .content-intro");
const overlayTitleintro = document.querySelector(".video-overlay-intro h2");
const overlayTextsintro = document.querySelectorAll(".video-overlay-intro p");


// Ensure video plays
videointro.play().catch((error) => {
  console.log("Video play failed: ", error);
});

// Create timeline for video animation
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-container-intro",
    start: "top top",
    end: "bottom bottom",
    scrub: 1.2, // Increased for smoother motion
    markers: false,
    onEnter: () => videointro.play()
  }
});

// Create timeline for hero section animation with film roll effect
const heroTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container-intro",
    start: "top top", // Start at the very beginning
    end: "top+=400 top", // End after 400px of scrolling - longer duration
    scrub: 1.2, // Slower scrub for smoother animation
    markers: false
  }
});

// Animate each element in the header content with a film roll effect
gsap.utils.toArray(".container-del-container-intro > *").forEach((element, index) => {
  heroTl.to(
    element,
    {
      rotationX: 90,
      y: -30,
      scale: 0.7, // Scale down as it rotates away
      opacity: 0,
      filter: "blur(4px)", // Add blur effect
      ease: "power3.inOut", // Better easing
      transformOrigin: "center top"
    },
    index * 0.08
  ); // More spacing between elements
});

// Create a background overlay for darkening effect
const overlayIntro = document.createElement("div");
overlayIntro.style.position = "absolute";
overlayIntro.style.top = "0";
overlayIntro.style.left = "0";
overlayIntro.style.width = "100%";
overlayIntro.style.height = "100%";
overlayIntro.style.backgroundColor = "rgba(0,0,0,0)";
overlayIntro.style.pointerEvents = "none";
overlayIntro.style.zIndex = "1"; // Lower than text overlay
videoContainerintro.appendChild(overlayIntro);

// Animate video container with darkening overlay
tl.to(
  videoContainerintro,
  {
    width: "90vw",
    height: "90vh",
    borderRadius: "0",
    ease: "expo.out", // More dynamic easing
    duration: 0.5
  },
  0
)
  .to(
    videointro,
    {
      scale: 1.1, // Zoom in the video slightly
      ease: "expo.out",
      duration: 0.5
    },
    0
  )
  .to(
    overlayIntro,
    {
      backgroundColor: "rgba(0,0,0,0.4)", // Darken overlay while scrolling
      ease: "power3.inOut", // Improved easing
      duration: 0.5
    },
    0
  )
  .to(
    videoOverlayintro,
    {
      clipPath: "inset(0% 0 0 0)",
      backdropFilter: "blur(8px)",
      ease: "expo.out", // More dynamic easing
      duration: 0.3
    },
    0.4
  ) // Delay until container is 80% of full size
  .to(
    overlayCaptionintro,
    {
      transform: "translateY(0)",
      ease: "expo.out",
      duration: 0.3
    },
    0.45
  ) // Slightly earlier than before
  .to(
    overlayContentintro,
    {
      filter: "blur(0px)", // Unblur the content
      transform: "scale(1)", // Reset scale to normal
      ease: "expo.out",
      duration: 0.4
    },
    0.45
  );

// Animación de "pantalla encendiéndose" (estilo CRT) para las tarjetas de los creadores al hacer scroll
gsap.utils.toArray(".trussell, .ward").forEach((card) => {
  const scanBar = document.createElement("div");
  scanBar.className = "scan-bar";
  card.appendChild(scanBar);

  gsap.set(card, {
    transformOrigin: "center center",
    opacity: 0,
    scaleY: 0.015,
    scaleX: 1.06,
    filter: "brightness(3.5) blur(3px)"
  });

  const cardTl = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });

  cardTl
    // la "pantalla" se enciende: una línea horizontal se expande de golpe
    .to(card, {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      duration: 0.45,
      ease: "power4.out"
    })
    // destello de encendido tipo CRT que se apaga hasta el brillo normal
    .to(
      card,
      {
        filter: "brightness(1) blur(0px)",
        duration: 0.4,
        ease: "power2.out"
      },
      "<0.05"
    )
    .fromTo(
      scanBar,
      { left: "-30%" },
      { left: "130%", duration: 0.9, ease: "power2.inOut" },
      "-=0.25"
    )
    // parpadeo tipo glitch al final de la revelación
    .to(card, { opacity: 0.55, duration: 0.05 })
    .to(card, { opacity: 1, duration: 0.05 })
    .to(card, { opacity: 0.8, duration: 0.04 })
    .to(card, { opacity: 1, duration: 0.04 });
});



