$(document).ready(function () {
  var $carousel = $(".custom-carousel");

  $carousel.owlCarousel({
    autoWidth: true,
    loop: true,
    nav: true,
    dots: true,
    navText: [
      "<img src='imgs/flecha-izquierda.png' alt='Episodio anterior'>",
      "<img src='imgs/flecha-derecha.png' alt='Episodio siguiente'>"
    ],
    onInitialized: function () {
      $carousel.find(".item").each(function (i) {
        this.style.setProperty("--delay", (i % 8) * 0.08 + "s");
      });
      $carousel.addClass("carousel-scan-in");
    }
  });

  $carousel.on("click", ".item", function () {
    $carousel.find(".item").not(this).removeClass("active");
    $(this).toggleClass("active");
  });
});
