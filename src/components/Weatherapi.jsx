import React, { useState, useEffect } from "react";

function Weatherapi() {
  const [city, setCity] = useState("London");          
  const [inputCity, setInputCity] = useState("");      
  const [weather, setWeather] = useState(null);      
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const controller = new AbortController();

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_KEY = "4eb3703790b356562054106543b748b2"; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("Failed to fetch weather");

        const data = await response.json();
        setWeather({
          name: data.name,
          temp: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
        });
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    return () => controller.abort(); 
  }, [city]);

  const handleFetch = () => {
    if (inputCity.trim() !== "") setCity(inputCity.trim());
  };

  return (
    <div style={{ fontFamily: "Arial", maxWidth: "400px", margin: "20px auto" }}>
      <h2>Weather Dashboard</h2>

      <input
        type="text"
        value={inputCity}
        placeholder="Enter city"
        onChange={(e) => setInputCity(e.target.value)}
        style={{ padding: "8px", width: "70%" }}
      /><br></br>
      <button onClick={handleFetch} style={{ padding: "8px", marginLeft: "5px" }}>
        Get Weather
      </button>
      <br />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {weather && !loading && (
        <div style={{ marginTop: "20px" }}>
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.temp} °C</p>
          <p>Weather: {weather.description}</p>
          <p>Humidity: {weather.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default Weatherapi;
