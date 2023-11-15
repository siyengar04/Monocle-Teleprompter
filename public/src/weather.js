async function fetchWeatherData() {
    try {
        const response = await fetch('https://api.weather.gov/points/40.1163,-88.2435');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

function formatWeatherData(weatherData) {
    // Example of formatting weather data.
    // You should adapt this according to the structure your Monocle device expects.
    if (!weatherData || !weatherData.properties) {
        return null;
    }

    const forecastUrl = weatherData.properties.forecast;
    return fetch(forecastUrl)
        .then(response => response.json())
        .then(forecastData => {
            return forecastData.properties.periods.map(period => {
                return {
                    "slideNumber": period.number,
                    "notes": [period.name, period.temperature + '°' + period.temperatureUnit, period.shortForecast]
                };
            });
        })
        .catch(error => {
            console.error('Error fetching detailed forecast:', error);
            return null;
        });
}

async function sendWeatherDataToMonocle() {
    const weatherData = await fetchWeatherData();
    const formattedData = await formatWeatherData(weatherData);

    if (formattedData) {
        const jsonData = JSON.stringify(formattedData);
        send_data(jsonData); // Assuming send_data is a function from connect.js
    } else {
        console.log('No weather data available to send');
    }
}

// Assuming send_data is a function from connect.js to send data to Monocle
function send_data(data) {
    // Implementation depends on how connect.js sends data to Monocle
    console.log('Sending data to Monocle:', data);
}
