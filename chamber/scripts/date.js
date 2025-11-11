document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("currentYear");
    const lastEl = document.getElementById("lastModified");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lastEl) lastEl.textContent = `Last Modified: ${document.lastModified}`;
});