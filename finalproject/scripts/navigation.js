const hamBtn = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");
const yearSpan = document.querySelector("#year");

hamBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    hamBtn.classList.toggle("open");
});

yearSpan.textContent = new Date().getFullYear();