import React, { useState, useEffect } from "react";
import { NumberInput } from "./NumberInput";
import { BaseSelector } from "./BaseSelector";
import { Result } from "./Result";
import { CalculationSteps } from "./CalculationSteps";

// Mapping von Ziffern > 9 auf Buchstaben
const digitToChar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Definiert die Props, die die Komponente erwartet
interface ConverterProps {
  translations: { [key: string]: string };
}

type ConverterState = {
  inputValue: string;
  inputBase: number;
  outputBase: number;
  result: string;
  steps: string[];
};

export function Converter({ translations }: ConverterProps) {
  const [state, setState] = useState<ConverterState>({
    inputValue: "",
    inputBase: 10,
    outputBase: 2,
    result: "",
    steps: [],
  });

  const handleConversion = () => {
    try {
      const { inputValue, inputBase, outputBase } = state;

      if (inputValue.trim() === "") {
        setState((prev) => ({ ...prev, result: "", steps: [] }));
        return;
      }

      let decimalValue = 0;
      const steps: string[] = [];

      // Schritt 1: Umwandlung von jeder Basis zu Dezimal (Potenzreihe)
      steps.push(`--- ${translations.decimal_conversion_step} ---`);
      const reversedInput = inputValue.toUpperCase().split("").reverse();

      for (let i = 0; i < reversedInput.length; i++) {
        const char = reversedInput[i];
        const digit = digitToChar.indexOf(char);

        if (digit >= inputBase || digit === -1) {
          setState((prev) => ({
            ...prev,
            result: translations.invalid_input,
            steps: [],
          }));
          return;
        }

        const term = digit * Math.pow(inputBase, i);
        decimalValue += term;
        steps.push(`${char} * ${inputBase}^${i} = ${term}`);
      }
      steps.push(`${translations.result_decimal_step} ${decimalValue}`);

      // Schritt 2: Umwandlung von Dezimal zu jeder anderen Basis (Horner-Schema)
      steps.push(`--- ${translations.target_base_conversion_step} ---`);
      let tempValue = decimalValue;
      const remainderList: string[] = [];

      if (tempValue === 0) {
        steps.push(translations.zero_conversion_step);
        remainderList.push("0");
      }

      while (tempValue > 0) {
        const remainder = tempValue % outputBase;
        const quotient = Math.floor(tempValue / outputBase);

        const remainderChar = digitToChar[remainder];
        remainderList.push(remainderChar);

        steps.push(
          `${tempValue} ÷ ${outputBase} = ${quotient} ${translations.remainder} ${remainderChar}`
        );
        tempValue = quotient;
      }

      // Schritt 3: Den letzten Schritt der Umkehrung der Reste hinzufügen
      if (remainderList.length > 0) {
        const reversedList = [...remainderList].reverse();
        steps.push(
          `${translations.reversed_remainders_step} ${reversedList.join("")}`
        );
      }

      const convertedValue = remainderList.reverse().join("");

      setState((prev) => ({
        ...prev,
        result: convertedValue,
        steps: steps,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        result: translations.conversion_error,
        steps: [],
      }));
    }
  };

  useEffect(() => {
    handleConversion();
  }, [state.inputValue, state.inputBase, state.outputBase]);

  return (
    <div>
      <h1>{translations.title}</h1>
      <NumberInput
        label={translations.number_label}
        value={state.inputValue}
        onChange={(value) => setState({ ...state, inputValue: value })}
      />
      <BaseSelector
        label={translations.input_base_label}
        value={state.inputBase}
        onChange={(value) => setState({ ...state, inputBase: value })}
      />
      <BaseSelector
        label={translations.output_base_label}
        value={state.outputBase}
        onChange={(value) => setState({ ...state, outputBase: value })}
      />
      <Result value={state.result} label={translations.result_label} />
      <CalculationSteps steps={state.steps} translations={translations} />{" "}
      {/* Weiterleitung der translations-Prop */}
    </div>
  );
}
