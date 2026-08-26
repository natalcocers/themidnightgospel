function myFunction(x) {
    x.classList.toggle("change");
}

function openNav() {
    const nav = document.getElementById("mySidenav");
    nav.style.width = "280px";
    nav.classList.add("sidenav--open");
}

function closeNav() {
    const nav = document.getElementById("mySidenav");
    nav.style.width = "0";
    nav.classList.remove("sidenav--open");
}