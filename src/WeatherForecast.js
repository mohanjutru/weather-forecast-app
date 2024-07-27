import axios from 'axios';

const WeatherForecast = (city) => {
  const getForecastByCity = async (city) => {
    const appId = '15ca787f2d191cf1f09525804a2ce85d';
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${appId}`
      );
      const forecasts = response.data.list.filter((item, index) => index % 8 === 0);
      return forecasts;
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      return [];
    }
  };

  return getForecastByCity(city);
};

export default WeatherForecast;