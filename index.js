const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the public directory
app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    const weatherData = [];

    for (const city of cities) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
            const data = response.data;

            weatherData.push({
                city: data.name,
                temperature: data.main.temp,
                feelsLike: data.main.feels_like,
                condition: data.weather[0].description,
            });
        } catch (error) {
            console.error(`Error fetching weather data for ${city}: ${error.message}`);
        }
    }

    res.json(weatherData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
