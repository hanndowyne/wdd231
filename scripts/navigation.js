
document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("navToggle");
    const navList = document.querySelector(".nav-list");

    function setAria(expanded) {
        navToggle.setAttribute("aria-expanded", expanded);
        navToggle.setAttribute("aria-label", expanded === "true" ? "Close navigation" : "Open navigation");
    }

    navToggle.addEventListener("click", () => {
        const shown = navList.classList.toggle("show");
        setAria(String(shown));
    });

    navList.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            navList.classList.remove("show");
            setAria("false");
        }
    });


    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            navList.classList.remove("show");
            setAria("false");
        }
    });
});