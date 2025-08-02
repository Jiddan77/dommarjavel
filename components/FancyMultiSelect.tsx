'use client';

import { useState } from 'react';

type Props = {
  label: string;
  options: string[];
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
  const [query, setQuery] = useState('');

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const isAllSelected = selected.length === 0 || selected.length === options.length;

  const visibleOptions = options.filter(opt =>
    opt.toLowerCase().includes(query.toLowerCase())
  );

  const selectAll = () => onChange([...options]);
  const clearAll = () => onChange([]);

  const setPreset = (values: string[]) => onChange(values);

  return (
    <div className="bg-white/5 rounded-xl p-4">
      <label className="block text-sm font-medium mb-2">{label}</label>

      {presets.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {presets.map(p => (
            <button
              key={p.name}
              onClick={() => setPreset(p.values)}
              className="text-xs bg-white/10 hover:bg-white/20 rounded px-2 py-1"
            >
              {p.name}
            </button>
          ))}
          <button onClick={selectAll} className="text-xs bg-white/10 hover:bg-white/20 rounded px-2 py-1">
            Alla
          </button>
          <button onClick={clearAll} className="text-xs bg-white/10 hover:bg-white/20 rounded px-2 py-1">
            Rensa
          </button>
        </div>
      )}

      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Sök..."
        className="w-full mb-2 px-3 py-1 rounded bg-black/20 text-white text-sm"
      />

      <div className="max-h-40 overflow-y-auto space-y-1">
        {visibleOptions.map(opt => (
          <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-white/10 px-2 py-1 rounded">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => toggle(opt)}
              className="form-checkbox accent-white"
            />
            {opt}
          </label>
        ))}

        {visibleOptions.length === 0 && (
          <div className="text-sm text-gray-400 px-2">Inga resultat</div>
        )}
      </div>

      {isAllSelected && (
        <div className="mt-2 text-xs text-gray-400 italic">Alla valda</div>
      )}
    </div>
  );
}
