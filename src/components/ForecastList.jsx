import React from "react";

export default function ForecastList({ forecast, unit }) {
  const unitLabel = unit === "metric" ? "°C" : "°F";
  return (
    <div className="grid grid-cols-2 gap-4">
      {forecast.map((item, index) => (
        <div key={index} className="bg-white/10 p-4 rounded-lg text-center">
          <p className="text-sm font-semibold">{item.date}</p>
          <i className={`wi wi-${item.icon} text-4xl`}></i>
          <p className="text-sm">{item.desc}</p>
          <p>{item.tempMin}{unitLabel} / {item.tempMax}{unitLabel}</p>
        </div>
      ))}
    </div>
  );
}