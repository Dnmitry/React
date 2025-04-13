// ThemesPage.js
import React, { useState } from "react";
import "./ThemesPage.css"; // Импорт стилей
import backIcon from "../images/back-icon.png"; // Путь к изображению
import deleteIcon from "../images/delete-icon.png"; // Путь к изображению удаления

const ThemesPage = ({
  themes,
  onSelect,
  onBack,
  onAddTheme,
  onDeleteTheme,
}) => {
  const [newTheme, setNewTheme] = useState("");

  const handleAddTheme = () => {
    if (newTheme.trim() !== "") {
      const newThemeItem = {
        id: Date.now(), // Используем уникальный идентификатор
        title: newTheme,
      };
      onAddTheme(newThemeItem);
      setNewTheme("");
    }
  };

  return (
    <div className="themes-container">
      <h2 className="subpage-title">Темы</h2>
      <div className="themes-list">
        {themes.length === 0 ? (
          <p>Нет тем для отображения.</p>
        ) : (
          themes.map((theme) => (
            <div key={theme.id} className="theme-item">
              <span onClick={() => onSelect(theme.id)}>{theme.title}</span>
              <button
                className="delete-button"
                onClick={() => onDeleteTheme(theme.id)}
              >
                <img src={deleteIcon} alt="Удалить" className="delete-icon" />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="add-theme-container">
        <input
          type="text"
          value={newTheme}
          onChange={(e) => setNewTheme(e.target.value)}
          placeholder="Введите название новой темы"
          className="add-theme-input"
        />
        <button className="add-theme-button" onClick={handleAddTheme}>
          Добавить тему
        </button>
      </div>
    </div>
  );
};

export default ThemesPage;
