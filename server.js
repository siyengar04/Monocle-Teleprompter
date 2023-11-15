const express = require('express');
const axios = require('axios');
const path = require('path'); // Import the path module
const app = express();
const port = 3000;


const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await axios.get(`https://api.weather.gov/points/40.1163,-88.2435`);
    const forecastUrl = response.data.properties.forecast;
    const forecastResponse = await axios.get(forecastUrl);
    return forecastResponse.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

app.get('/weather', async (req, res) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const weatherData = await fetchWeatherData(latitude, longitude);
  res.json(weatherData);
});



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});