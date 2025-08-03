// src/components/Input.tsx
import React from "react";

interface InputProps {
  label: string;
  value: string | number;
  type?: "text" | "number";
  onChange: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  type = "text",
  onChange,
}) => {
  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};
