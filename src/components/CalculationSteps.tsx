// src/components/CalculationSteps.tsx
import React from "react";

interface CalculationStepsProps {
  steps: string[];
  translations: { [key: string]: string }; // Füge translations als Prop hinzu
}

export const CalculationSteps: React.FC<CalculationStepsProps> = ({
  steps,
  translations,
}) => {
  if (steps.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>{translations.calculation_steps_title}</h2>
      <ul>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
};
