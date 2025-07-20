import React from "react";

export default function WeatherNow({ data, unit }) {
  const temp = Math.round(data.main.temp);
  const unitLabel = unit === "metric" ? "°C" : "°F";
  return (
    <div className="bg-white/20 p-4 rounded-xl text-center mb-4">
      <h2 className="text-2xl font-semibold mb-2">{data.name}</h2>
      <i className={`wi wi-${data.weather[0].icon} text-6xl`}></i>
      <p className="text-lg capitalize">{data.weather[0].description}</p>
      <p className="text-4xl font-bold">{temp}{unitLabel}</p>
      <div className="flex justify-between text-sm mt-2">
        <span>💧 {data.main.humidity}%</span>
        <span>💨 {data.wind.speed} {unit === "metric" ? "m/s" : "mph"}</span>
      </div>
    </div>
  );
}