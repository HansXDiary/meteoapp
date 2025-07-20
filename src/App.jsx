import React, { useEffect, useState } from "react";
import {
  FaWind,
  FaTint,
  FaMapMarkerAlt,
  FaSun,
  FaCloudSun,
  FaCloudShowersHeavy,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [query, setQuery] = useState("");
  const [forecast, setForecast] = useState([]);

  const API_KEY = "48848bd829cd089812c87e85f85f44e7";

  useEffect(() => {
    if (!query) {
      getCurrentLocation();
    }
  }, [query]);

  const getCurrentLocation = async () => {
    try {
      const res = await axios.get("https://ipapi.co/json/");
      const { latitude, longitude } = res.data;
      setLocation({ lat: latitude, lon: longitude });
      fetchWeatherCoords(latitude, longitude);
      fetchForecastCoords(latitude, longitude);
    } catch (err) {
      console.error("Erreur géolocalisation IP:", err);
    }
  };

  const fetchWeatherCoords = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
      );
      setWeather(res.data);
    } catch (err) {
      console.error("Erreur API OpenWeather:", err);
    }
  };

  const fetchForecastCoords = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
      );
      setForecast(res.data.list.slice(0, 6));
    } catch (err) {
      console.error("Erreur API Prévision:", err);
    }
  };

  const fetchWeatherCity = async () => {
    if (!query.trim()) return;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric&lang=fr`
      );
      setWeather(res.data);
      fetchForecastCity(query);
      setQuery("");
    } catch (err) {
      console.error("Ville non trouvée:", err);
      alert("Ville non trouvée. Veuillez réessayer.");
    }
  };

  const fetchForecastCity = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
      );
      setForecast(res.data.list.slice(0, 6));
    } catch (err) {
      console.error("Erreur prévision ville:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800 p-6 font-sans">
      <div className="max-w-5xl mx-auto rounded-3xl shadow-xl bg-white/80 backdrop-blur-md p-8">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">Bienvenue 👋</h1>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Rechercher une ville..."
              className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={fetchWeatherCity}
              className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600"
            >
              <FaSearch />
            </button>
          </div>
        </header>

        {weather ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-blue-100 p-6 shadow-md">
              <h2 className="text-xl font-semibold flex items-center mb-2">
                <FaMapMarkerAlt className="mr-2 text-blue-700" /> {weather.name}
              </h2>
              <p className="text-6xl font-extrabold text-blue-800 mb-1">
                {Math.round(weather.main.temp)}°C
              </p>
              <p className="capitalize text-blue-600 mb-4">
                {weather.weather[0].description}
              </p>
              <div className="flex justify-between text-sm text-gray-700">
                <div className="flex items-center">
                  <FaWind className="mr-1" /> {weather.wind.speed} km/h
                </div>
                <div className="flex items-center">
                  <FaTint className="mr-1" /> {weather.main.humidity}%
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-yellow-100 p-6 shadow-md">
              <div className="flex justify-between text-sm mb-2">
                <div className="flex items-center">
                  <FaSun className="mr-1 text-yellow-600" /> Levé:
                </div>
                <span>
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <div className="flex items-center">
                  <FaCloudSun className="mr-1 text-orange-500" /> Couché:
                </div>
                <span>
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Coordonnées</h3>
                <p className="text-xs text-gray-800">
                  Latitude: {weather.coord.lat}, Longitude: {weather.coord.lon}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">Chargement des données météo...</p>
        )}

        {forecast.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Prévisions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {forecast.map((f, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 rounded-xl shadow-lg p-4 flex flex-col items-center text-center"
                >
                  <p className="text-xs text-gray-500 mb-1">
                    {new Date(f.dt * 1000).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <FaCloudShowersHeavy className="text-blue-400 text-2xl mb-1" />
                  <p className="text-lg font-semibold text-gray-800">
                    {Math.round(f.main.temp)}°C
                  </p>
                  <p className="text-xs capitalize text-gray-600">
                    {f.weather[0].description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
