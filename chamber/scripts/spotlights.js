async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("JSON load error");

        const members = await response.json();   // JSON is an array

        // Select GOLD (3) and SILVER (2)
        const premium = members.filter(m =>
            m.level === 3 || m.level === 2
        );

        // Randomly choose 3
        const selected = premium.sort(() => Math.random() - 0.5).slice(0, 3);

        const container = document.getElementById("spotlight-container");
        container.innerHTML = "";

        selected.forEach(member => {
            container.innerHTML += `
                <div class="spot-card">
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.tagline}</p>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <span class="tag">${member.level === 3 ? "Gold" : "Silver"}</span>
                </div>
            `;
        });

    } catch (error) {
        console.error("Spotlight Error:", error);
    }
}

loadSpotlights();