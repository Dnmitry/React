// App.js
import React, { useState, useEffect } from "react";
import data from "./data.json";
import ThemesPage from "./components/ThemesPage";
import SubthemesPage from "./components/SubthemesPage";
import ContentPage from "./components/ContentsPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("themes");
  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const [selectedSubthemeId, setSelectedSubthemeId] = useState(null);
  const [themes, setThemes] = useState(
    JSON.parse(localStorage.getItem("themes")) || data.themes
  );
  const [subthemes, setSubthemes] = useState(
    JSON.parse(localStorage.getItem("subthemes")) || data.subthemes
  );
  const [contents, setContents] = useState(
    JSON.parse(localStorage.getItem("contents")) || data.contents
  );

  useEffect(() => {
    localStorage.setItem("themes", JSON.stringify(themes));
    localStorage.setItem("subthemes", JSON.stringify(subthemes));
    localStorage.setItem("contents", JSON.stringify(contents));
  }, [themes, subthemes, contents]);

  const handleThemeSelect = (themeId) => {
    if (themes.find((theme) => theme.id === themeId)) {
      setSelectedThemeId(themeId);
      setCurrentPage("subthemes");
    } else {
      alert("Тема не найдена");
    }
  };

  const handleSubthemeSelect = (subthemeId) => {
    if (subthemes.find((subtheme) => subtheme.id === subthemeId)) {
      setSelectedSubthemeId(subthemeId);
      setCurrentPage("content");
    } else {
      alert("Подтема не найдена");
    }
  };

  const handleBackToThemes = () => {
    if (currentPage === "subthemes") {
      setCurrentPage("themes");
      setSelectedSubthemeId(null); // Сбрасываем выбранную подтему
    }
  };

  const handleBackToSubthemes = () => {
    if (currentPage === "content") {
      setCurrentPage("subthemes");
      setSelectedSubthemeId(null); // Сбрасываем выбранную подтему
    }
  };

  const handleAddTheme = (newTheme) => {
    if (!themes.find((theme) => theme.title === newTheme.title)) {
      setThemes((prevThemes) => [...prevThemes, newTheme]);
    } else {
      alert("Тема с таким названием уже существует");
    }
  };

  const handleAddSubtheme = (newSubtheme) => {
    if (!subthemes.find((subtheme) => subtheme.title === newSubtheme.title)) {
      const newSubthemeWithThemeId = {
        ...newSubtheme,
        themeId: selectedThemeId,
      };
      setSubthemes((prevSubthemes) => [
        ...prevSubthemes,
        newSubthemeWithThemeId,
      ]);
    } else {
      alert("Подтема с таким названием уже существует");
    }
  };

  const handleAddContent = (newContent) => {
    if (!contents.find((content) => content.title === newContent.title)) {
      const newContentWithSubthemeId = {
        ...newContent,
        subthemeId: selectedSubthemeId,
      };
      setContents((prevContents) => [
        ...prevContents,
        newContentWithSubthemeId,
      ]);
    } else {
      alert("Контент с таким названием уже существует");
    }
  };

  const handleDeleteTheme = (id) => {
    const themeToDelete = themes.find((theme) => theme.id === id);
    if (themeToDelete) {
      const newThemes = themes.filter((theme) => theme.id !== id);
      setThemes(newThemes);
    } else {
      alert("Тема не найдена");
    }
  };

  const handleDeleteSubtheme = (id) => {
    const subthemeToDelete = subthemes.find((subtheme) => subtheme.id === id);
    if (subthemeToDelete) {
      const newSubthemes = subthemes.filter((subtheme) => subtheme.id !== id);
      setSubthemes(newSubthemes);
    } else {
      alert("Подтема не найдена");
    }
  };

  const handleDeleteContent = (id) => {
    const contentToDelete = contents.find((content) => content.id === id);
    if (contentToDelete) {
      const newContents = contents.filter((content) => content.id !== id);
      setContents(newContents);
    } else {
      alert("Контент не найден");
    }
  };

  return (
    <div>
      {currentPage === "themes" && (
        <ThemesPage
          themes={themes}
          onSelect={handleThemeSelect}
          onAddTheme={handleAddTheme}
          onDeleteTheme={handleDeleteTheme}
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
          onAddContent={handleAddContent}
          onDeleteContent={handleDeleteContent}
        />
      )}
    </div>
  );
};

export default App;
