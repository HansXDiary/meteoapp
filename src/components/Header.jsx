import React from "react";

export default function Header({ onToggleUnit, onToggleLang, unit, lang }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold">Météo Pro</h1>
      <div className="flex gap-2">
        <button onClick={onToggleUnit} className="px-2 py-1 bg-white text-black rounded">
          {unit === "metric" ? "°C" : "°F"}
        </button>
        <button onClick={onToggleLang} className="px-2 py-1 bg-white text-black rounded">
          {lang.toUpperCase()}
        </button>
      </div>
    </div>
  );
}