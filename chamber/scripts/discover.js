import { places } from '../data/discoverData.mjs';

const grid = document.getElementById("discoverGrid");
const visitMessage = document.getElementById("visit-message");

function createCard(place, index) {
    const card = document.createElement('article');
    card.className = `card area-card${index + 1}`;
    card.setAttribute('role', 'listitem');

    const fig = document.createElement('figure');
    const img = document.createElement('img');
    img.src = place.img;
    img.alt = place.title + ' image';
    fig.appendChild(img);

    const body = document.createElement('div');
    body.className = 'card-body';
    const h2 = document.createElement('h2'); h2.textContent = place.title;
    const addr = document.createElement('address'); addr.textContent = place.address;
    const p = document.createElement('p'); p.textContent = place.description;
    const btn = document.createElement('button'); btn.className = 'btn'; btn.textContent = 'Learn more';

    btn.addEventListener('click', () => {
        alert(place.title + '\n\n' + place.address + '\n\n' + place.description);
    });

    body.append(h2, addr, p, btn);
    card.append(fig, body);
    return card;
}

places.slice(0, 8).forEach((p, i) => {
    grid.appendChild(createCard(p, i));
});

const LAST_VISIT_KEY = 'harmony_last_visit';
const now = Date.now();
const last = localStorage.getItem(LAST_VISIT_KEY);

if (!last) {
    visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
} else {
    const diffMs = now - Number(last);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMs < (1000 * 60 * 60 * 24)) {
        visitMessage.textContent = 'Back so soon! Awesome!';
    } else if (diffDays === 1) {
        visitMessage.textContent = 'You last visited 1 day ago.';
    } else {
        visitMessage.textContent = `You last visited ${diffDays} days ago.`;
    }
}

localStorage.setItem(LAST_VISIT_KEY, String(now));

grid.setAttribute('aria-label', 'Places of interest in the Miami area');