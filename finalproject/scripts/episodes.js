const display = document.querySelector("#episodes-list");

async function fetchEpisodes() {
    try {
        display.innerHTML = `<p>Loading episodes...</p>`;

        const res = await fetch("https://api.jikan.moe/v4/seasons/2017/summer?sfw");
        const data = await res.json();

        const episodes = data.data.slice(0, 15);

        display.innerHTML = episodes.map(ep => `
            <div class="card">
                <img src="${ep.images.jpg.image_url}" alt="${ep.title}">
                <h3>${ep.title}</h3>
                <p><strong>Type:</strong> ${ep.type}</p>
                <p><strong>Episodes:</strong> ${ep.episodes || "?"}</p>
                <small>⭐ ${ep.score || "N/A"}</small>
            </div>
        `).join("");

    } catch (error) {
        display.innerHTML = `<p>❌ Failed to load episodes. Try again later.</p>`;
        console.error(error);
    }
}

fetchEpisodes();