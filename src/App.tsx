import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { Converter } from "./components/Converter";
import { LanguageSelector } from "./components/LanguageSelector";
import enTranslations from "./i18n/en.json";
import deTranslations from "./i18n/de.json";

// Ein Objekt, das die Übersetzungsdateien hält
const translations: { [key: string]: any } = {
  en: enTranslations,
  de: deTranslations,
};

function App() {
  const [language, setLanguage] = useState("de");
  const [currentTranslations, setCurrentTranslations] = useState(
    translations.de
  );

  // useEffect, um die Übersetzungen zu laden, wenn sich die Sprache ändert
  useEffect(() => {
    setCurrentTranslations(translations[language]);
  }, [language]);

  return (
    <div className="App">
      <LanguageSelector
        onLanguageChange={setLanguage}
        currentLanguage={language}
      />
      <Converter translations={currentTranslations} />
    </div>
  );
}

export default App;
