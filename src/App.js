import React, { useState } from "react";
import data from "./data.json";
import ThemesPage from "./components/ThemesPage";
import SubthemesPage from "./components/SubthemesPage";
import ContentPage from "./components/ContentsPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("themes");
  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const [selectedSubthemeId, setSelectedSubthemeId] = useState(null);
  const [themes, setThemes] = useState(data.themes);
  const [subthemes, setSubthemes] = useState(data.subthemes);

  const handleThemeSelect = (themeId) => {
    setSelectedThemeId(themeId);
    setCurrentPage("subthemes");
  };

  const handleSubthemeSelect = (subthemeId) => {
    setSelectedSubthemeId(subthemeId);
    setCurrentPage("content");
  };

  const handleBackToThemes = () => {
    setCurrentPage("themes");
    setSelectedSubthemeId(null); // Сбрасываем выбранную подтему
  };

  const handleBackToSubthemes = () => {
    setCurrentPage("subthemes");
    setSelectedSubthemeId(null); // Сбрасываем выбранную подтему
  };

  const handleAddTheme = (newTheme) => {
    setThemes((prevThemes) => [...prevThemes, newTheme]);
  };

  const handleAddSubtheme = (newSubtheme) => {
    const newSubthemeWithThemeId = { ...newSubtheme, themeId: selectedThemeId };
    setSubthemes((prevSubthemes) => [...prevSubthemes, newSubthemeWithThemeId]);
  };

  const handleDeleteSubtheme = (id) => {
    const newSubthemes = subthemes.filter((subtheme) => subtheme.id !== id);
    setSubthemes(newSubthemes);
  };

  return (
    <div>
      {currentPage === "themes" && (
        <ThemesPage
          themes={themes}
          onSelect={handleThemeSelect}
          onAddTheme={handleAddTheme}
        />
      )}
      {currentPage === "subthemes" && (
        <SubthemesPage
          subthemes={subthemes.filter((sub) => sub.themeId === selectedThemeId)}
          onSelect={handleSubthemeSelect}
          onBack={handleBackToThemes}
          onAddSubtheme={handleAddSubtheme}
          onDeleteSubtheme={handleDeleteSubtheme} // Передача функции
        />
      )}
      {currentPage === "content" && (
        <ContentPage
          subthemeId={selectedSubthemeId}
          onBack={handleBackToSubthemes}
        />
      )}
    </div>
  );
};

export default App;
