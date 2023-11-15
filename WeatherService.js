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