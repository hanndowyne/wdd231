const grid = document.querySelector("#char-grid");
const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modal-body");
const closeModal = document.querySelector("#close-modal");

async function fetchCharacters() {
    const res = await fetch("data/characters.json");
    const data = await res.json();
    displayCharacters(data);
}

function displayCharacters(list) {
    grid.innerHTML = list.map(char => `
        <div class="card" data-id="${char.id}">
            <img loading="lazy" src="${char.image}" alt="${char.name}">
            <h3>${char.name}</h3>
            <p>${char.personality}</p>
        </div>
    `).join("");

    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => openModal(card.dataset.id, list));
    });
}

function openModal(id, list) {
    const char = list.find(c => c.id == id);

    modalBody.innerHTML = `
        <h2>${char.name}</h2>
        <p><strong>Role:</strong> ${char.role}</p>
        <p><strong>Personality:</strong> ${char.personality}</p>
        <button id="fav-btn">❤️ Add to Favorites</button>
    `;

    document.querySelector("#fav-btn").onclick = () => {
        localStorage.setItem("favorite", char.name);
        alert(`${char.name} saved as favorite!`);
    };

    modal.classList.add("open");
}

closeModal.onclick = () => modal.classList.remove("open");
modal.onclick = (e) => { if (e.target === modal) modal.classList.remove("open"); };

fetchCharacters();