const display = document.getElementById("quotes-section");

async function fetchAnime() {
    try {
        const response = await fetch("https://api.jikan.moe/v4/seasons/now?sfw");
        const data = await response.json();

        display.innerHTML = data.data.slice(0, 15).map(anime => `
            <div class="card">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                <h3>${anime.title}</h3>
                <p>Episodes: ${anime.episodes ?? "TBA"}</p>
                <p>Score: ${anime.score ?? "N/A"}</p>
                <p>Type: ${anime.type}</p>
            </div>
        `).join("");
    } catch (error) {
        console.error(error);
        display.innerHTML = "<p>Failed to load anime 😢</p>";
    }
}

fetchAnime();