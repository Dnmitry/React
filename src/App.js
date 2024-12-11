import React, { useState } from "react";
import data from "./data.json";
import ThemesPage from "./components/ThemesPage";
import SubthemesPage from "./components/SubthemesPage";
import ContentPage from "./components/ContentsPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("themes");
  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const [selectedSubthemeId, setSelectedSubthemeId] = useState(null);

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

  return (
    <div>
      {currentPage === "themes" && (
        <ThemesPage themes={data.themes} onSelect={handleThemeSelect} />
      )}
      {currentPage === "subthemes" && (
        <SubthemesPage
          subthemes={data.subthemes.filter(
            (sub) => sub.themeId === selectedThemeId
          )}
          onSelect={handleSubthemeSelect}
          onBack={handleBackToThemes} // Передаем функцию для возврата
        />
      )}
      {currentPage === "content" && (
        <ContentPage
          subthemeId={selectedSubthemeId}
          onBack={handleBackToSubthemes} // Передаем функцию для возврата на подтемы
        />
      )}
    </div>
  );
};

export default App;
