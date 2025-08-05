"use client";

import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (newSelected: string[]) => void;
  presets?: { name: string; values: string[] }[];
};

export default function FancyMultiSelect({
  label,
  options,
  selected,
  onChange,
  presets = [],
}: Props) {
  const [query, setQuery] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const toggleValue = (value: string) => {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(updated);
  };

  const selectAll = () => onChange(options.map((opt) => opt.value));
  const clearAll = () => onChange([]);

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow hover:shadow-xl transition">
      <label className="block text-white font-semibold mb-2">{label}</label>

      <input
        type="text"
        placeholder="Sök..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-2 p-2 rounded bg-gray-700 text-white border border-gray-600"
      />

      <div className="mb-2 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onChange(preset.values)}
            className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {preset.name}
          </button>
        ))}
        <button
          onClick={selectAll}
          className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Markera alla
        </button>
        <button
          onClick={clearAll}
          className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Rensa
        </button>
      </div>

      <div className="max-h-40 overflow-y-auto space-y-1">
        {filteredOptions.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center space-x-2 text-white"
          >
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => toggleValue(opt.value)}
              className="form-checkbox text-blue-600"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
