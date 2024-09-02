const apiKey = "";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function fetchWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.ok) {
            const data = await response.json();
            updateWeatherDisplay(data);
        } else {
            handleErrors(response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        document.querySelector(".error").textContent = "Failed to connect. Please check your connection.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

function updateWeatherDisplay(data) {
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

    const weatherCondition = data.weather[0].main;
    const iconMap = {
        "Clouds": "images/clouds.png",
        "Clear": "images/clear.png",
        "Drizzle": "images/drizzle.png",
        "Mist": "images/mist.png"
    };
    weatherIcon.src = iconMap[weatherCondition] || "images/default.png";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

function handleErrors(statusCode) {
    const errorMessage = statusCode === 404 ? "Invalid City Name" : "An error occurred";
    document.querySelector(".error").textContent = errorMessage;
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        fetchWeather(searchBox.value.trim());
    }
});
