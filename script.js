const apiKey = '20939651d295b24006f3d23ec4471739'; // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
        throw new Error(`Error fetching weather data for ${city}: ${response.status}`);
    }
    return response.json();
}

async function displayWeather() {
    const container = document.getElementById('weather-container');
    for (const city of cities) {
        try {
            const data = await fetchWeather(city);
            const card = document.createElement('div');
            card.className = 'weather-card';
            card.innerHTML = `
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Feels Like: ${data.main.feels_like} °C</p>
                <p>Condition: ${data.weather[0].description}</p>
                <p>Updated at: ${new Date(data.dt * 1000).toLocaleString()}</p>
            `;
            container.appendChild(card);
        } catch (error) {
            console.error(error.message);
        }
    }
}

displayWeather();
