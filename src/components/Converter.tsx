// src/components/Converter.tsx
import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import { BaseSelector } from "./BaseSelector";
import { Result } from "./Result";

type ConverterState = {
  inputValue: string;
  inputBase: number;
  outputBase: number;
  result: string;
};

export function Converter() {
  const [state, setState] = useState<ConverterState>({
    inputValue: "",
    inputBase: 10,
    outputBase: 2,
    result: "",
  });

  const handleConversion = () => {
    try {
      if (state.inputValue.trim() === "") {
        setState((prev) => ({ ...prev, result: "" }));
        return;
      }
      const decimalValue = parseInt(state.inputValue, state.inputBase);
      if (isNaN(decimalValue)) {
        setState((prev) => ({ ...prev, result: "Ungültige Eingabe" }));
        return;
      }
      const convertedValue = decimalValue.toString(state.outputBase);
      setState((prev) => ({ ...prev, result: convertedValue }));
    } catch (error) {
      setState((prev) => ({ ...prev, result: "Fehler bei der Umrechnung" }));
    }
  };

  useEffect(() => {
    handleConversion();
  }, [state.inputValue, state.inputBase, state.outputBase]);

  return (
    <div>
      <h1>Zahlenkonverter</h1>
      <Input
        label="Zahl:"
        value={state.inputValue}
        onChange={(value) => setState({ ...state, inputValue: value })}
      />
      <BaseSelector
        label="Ausgangs Basis:"
        value={state.inputBase}
        onChange={(value) => setState({ ...state, inputBase: value })}
      />
      <BaseSelector
        label="Ergebnis Basis:"
        value={state.outputBase}
        onChange={(value) => setState({ ...state, outputBase: value })}
      />
      <Result value={state.result} />
    </div>
  );
}
