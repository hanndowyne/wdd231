const apiKey = "c16c987ad8508366225f45f02ed4fc15";
const city = "New York";
const units = "metric"; // change to "imperial" for °F

// ---- CURRENT WEATHER ----
async function getCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Current Weather API error");

    const data = await response.json();

    document.querySelector("#current-temp").textContent = `Temperature: ${data.main.temp}°`;
    document.querySelector("#description").textContent = `Conditions: ${data.weather[0].description}`;
}

// ---- 3-DAY FORECAST ----
async function getForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Forecast API error");

    const data = await response.json();

    // OpenWeather returns data every 3 hours → pick 12:00 entries
    const days = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    const container = document.querySelector("#forecast");
    container.innerHTML = "";

    days.slice(0, 3).forEach(day => {
        const div = document.createElement("div");
        div.classList.add("forecast-day");

        div.innerHTML = `
            <p>${new Date(day.dt_txt).toLocaleDateString()}</p>
            <p>${day.main.temp}°</p>
            <p>${day.weather[0].description}</p>
        `;

        container.appendChild(div);
    });
}

getCurrentWeather().catch(console.error);
getForecast().catch(console.error);