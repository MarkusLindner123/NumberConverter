// src/components/Input.tsx
import React from "react";

// Definiert die Props für die Basis-Dropdown-Auswahl
interface BaseSelectorProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

// Die neue Komponente für die Basis-Auswahl
export const BaseSelector: React.FC<BaseSelectorProps> = ({
  label,
  value,
  onChange,
}) => {
  const bases = [2, 8, 10, 16]; // Bietet die gängigsten Basen

  return (
    <label>
      {label}
      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      >
        {bases.map((base) => (
          <option key={base} value={base}>
            {base}
          </option>
        ))}
      </select>
    </label>
  );
};

// Bestehende Input-Komponente für die Zahleneingabe
interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const NumberInput: React.FC<InputProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <label>
      {label}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};
