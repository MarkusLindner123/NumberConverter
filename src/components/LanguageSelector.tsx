import React from "react";

interface LanguageSelectorProps {
  onLanguageChange: (lang: string) => void;
  currentLanguage: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageChange,
  currentLanguage,
}) => {
  return (
    <div style={{ marginBottom: "20px", textAlign: "right" }}>
      <label>
        Sprache:
        <select
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <option value="en">English</option>
          <option value="de">Deutsch</option>
        </select>
      </label>
    </div>
  );
};
