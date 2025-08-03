// src/components/Result.tsx
import React from "react";

interface ResultProps {
  value: string;
  label: string; // Neuer Prop für das Label
}

export const Result: React.FC<ResultProps> = ({ value, label }) => {
  return (
    <div>
      <p>
        {label} {value}
      </p>
    </div>
  );
};
