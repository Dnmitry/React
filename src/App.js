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
    if (typeof themeId !== "number") {
      console.error("Неправильный тип идентификатора темы");
      return;
    }
    setSelectedThemeId(themeId);
    setCurrentPage("subthemes");
  };

  const handleSubthemeSelect = (subthemeId) => {
    if (typeof subthemeId !== "number") {
      console.error("Неправильный тип идентификатора подтемы");
      return;
    }
    setSelectedSubthemeId(subthemeId);
    setCurrentPage("content");
  };

  const handleBackToThemes = () => {
    setCurrentPage("themes");
    setSelectedThemeId(null);
    setSelectedSubthemeId(null);
  };

  const handleBackToSubthemes = () => {
    setCurrentPage("subthemes");
    setSelectedSubthemeId(null);
  };

  const handleAddTheme = (newTheme) => {
    if (typeof newTheme !== "object" || Object.keys(newTheme).length === 0) {
      console.error("Неправильный тип или пустой объект темы");
      return;
    }
    if (themes.find((theme) => theme.id === newTheme.id)) {
      console.error("Тема с таким идентификатором уже существует");
      return;
    }
    try {
      setThemes((prevThemes) => [...prevThemes, newTheme]);
    } catch (error) {
      console.error("Ошибка при добавлении темы", error);
    }
  };

  const handleAddSubtheme = (newSubtheme) => {
    if (
      typeof newSubtheme !== "object" ||
      Object.keys(newSubtheme).length === 0
    ) {
      console.error("Неправильный тип или пустой объект подтемы");
      return;
    }
    if (!selectedThemeId) {
      console.error("Не выбрана тема");
      return;
    }
    if (subthemes.find((subtheme) => subtheme.id === newSubtheme.id)) {
      console.error("Подтема с таким идентификатором уже существует");
      return;
    }
    try {
      const newSubthemeWithThemeId = {
        ...newSubtheme,
        themeId: selectedThemeId,
      };
      setSubthemes((prevSubthemes) => [
        ...prevSubthemes,
        newSubthemeWithThemeId,
      ]);
    } catch (error) {
      console.error("Ошибка при добавлении подтемы", error);
    }
  };

  const handleDeleteSubtheme = (id) => {
    if (typeof id !== "number") {
      console.error("Неправильный тип идентификатора подтемы");
      return;
    }
    const subtheme = subthemes.find((subtheme) => subtheme.id === id);
    if (!subtheme) {
      console.error("Подтема не найдена");
      return;
    }
    try {
      const newSubthemes = subthemes.filter((subtheme) => subtheme.id !== id);
      setSubthemes(newSubthemes);
    } catch (error) {
      console.error("Ошибка при удалении подтемы", error);
    }
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
          onDeleteSubtheme={handleDeleteSubtheme}
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
