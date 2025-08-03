// src/components/Result.tsx
import React from "react";

interface ResultProps {
  value: string;
}

export const Result: React.FC<ResultProps> = ({ value }) => {
  return (
    <div>
      <p>Ergebnis: {value}</p>
    </div>
  );
};
