const apiKey = "48848bd829cd089812c87e85f85f44e7";

export async function fetchWeatherByCity(city, unit = "metric", lang = "fr") {
  const res = await window.axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}&lang=${lang}`
  );
  return res.data;
}

export async function fetchWeatherByCoords(lat, lon, unit = "metric", lang = "fr") {
  const res = await window.axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}&lang=${lang}`
  );
  return res.data;
}

export async function fetchForecastByCity(city, unit = "metric", lang = "fr") {
  const res = await window.axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}&lang=${lang}`
  );
  const list = res.data.list.filter((_, i) => i % 8 === 0).map(item => ({
    date: new Date(item.dt_txt).toLocaleDateString(lang, { weekday: "short" }),
    icon: item.weather[0].icon,
    desc: item.weather[0].description,
    tempMin: Math.round(item.main.temp_min),
    tempMax: Math.round(item.main.temp_max)
  }));
  return list;
}