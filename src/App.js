import React, { useState } from "react";
import WeatherForecast from "./WeatherForecast";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(
    "Please Enter a City for Wearther Forecast"
  );

  const handleSearch = () => {
    setIsLoading(true);
    WeatherForecast(city)
      .then((data) => {
        if (data.length < 1) {
          setErrorMsg("Selected City is not available for Weather Forecast");
        }
        setForecastData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setErrorMsg("No Data Found");
      });
  };
  console.log(forecastData);
  return (
    <div className="container">
      <h1>Weather in your City</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isLoading ? (
        <div className="loader error-msg">Loading...</div>
      ) : forecastData.length < 1 ? (
        <div className="loader error-msg">{errorMsg}</div>
      ) : (
        <div className="forecast-container">
          {forecastData.map((forecast, index) => (
             <div key={index} className="forecast-item">
             <p>Date: {forecast.dt_txt}</p>
             <p className="item-align">Temperature: </p>
             <p>Min: {forecast.main.temp_min}°C</p>  
             <p>Max: {forecast.main.temp_max}°C</p>
             <p className="item-align">Humidity: {forecast.main.humidity}%</p>
             <p className="item-align">Pressure: {forecast.main.pressure} hPa</p>
           </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;