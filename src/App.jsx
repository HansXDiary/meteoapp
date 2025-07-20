import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "48848bd829cd089812c87e85f85f44e7";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: "metric",
            lang: "fr",
          },
        }
      );
      setWeather(response.data);
      console.log("Météo reçue :", response.data);
    } catch (err) {
      console.error("Erreur API OpenWeather :", err);
      setError("Impossible de récupérer la météo.");
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.error("Erreur de géolocalisation :", err);
          setError("Autorisation de localisation refusée ou indisponible.");
        }
      );
    } else {
      setError("La géolocalisation n'est pas prise en charge.");
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🌍 Météo actuelle</h1>
      {error && <p className="text-red-500">{error}</p>}
      {weather ? (
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h2 className="text-xl">{weather.name}</h2>
          <p className="text-lg">{weather.weather[0].description}</p>
          <p>🌡️ Température : {weather.main.temp}°C</p>
          <p>💨 Vent : {weather.wind.speed} m/s</p>
          <p>💧 Humidité : {weather.main.humidity}%</p>
        </div>
      ) : !error ? (
        <p>Chargement de la météo...</p>
      ) : null}
    </div>
  );
}
