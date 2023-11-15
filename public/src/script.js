const axios = require('axios');
const connect = require('./connect.js');

async function fetchWeatherData(latitude, longitude) {
    try {
        const response = await axios.get(`https://api.weather.gov/points/40.1163,-88.2435`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

async function sendWeatherDataToMonocle(latitude, longitude) {
    const weatherData = await fetchWeatherData(latitude, longitude);
    if (weatherData) {
        const formattedData = formatWeatherData(weatherData);
        const monocle = connect.createConnection();
        monocle.sendData(formattedData);
    } else {
        console.error('No weather data to send');
    }
}

function formatWeatherData(weatherData) {
    // Format weather data for the Monocle. Adjust according to your needs and Monocle's capabilities.
    return {
        "temperature": weatherData.properties.temperature,
        "condition": weatherData.properties.condition
        // Add more fields as needed
    };
}

module.exports = { sendWeatherDataToMonocle };
