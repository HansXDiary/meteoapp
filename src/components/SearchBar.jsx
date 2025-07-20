import React, { useState } from "react";

export default function SearchBar({ onSearch, onGeolocate }) {
  const [input, setInput] = useState("");
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ville..."
        className="flex-1 px-4 py-2 rounded text-black"
      />
      <button onClick={() => onSearch(input)} className="bg-white text-blue-600 px-4 py-2 rounded">
        Rechercher
      </button>
      <button onClick={onGeolocate} className="bg-white text-blue-600 px-4 py-2 rounded">
        📍
      </button>
    </div>
  );
}