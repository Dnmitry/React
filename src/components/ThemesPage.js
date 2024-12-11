// ThemesPage.js
// ThemesPage.js
import React from "react";
import "./ThemesPage.css"; // Импортируйте CSS файл

const ThemesPage = ({ themes, onSelect }) => {
  return (
    <div className="themes-container">
      <h2 className="themespage-title">Гайды</h2> {/* Исправлено имя класса */}
      {themes.map((theme) => (
        <div
          key={theme.id}
          className="theme-item"
          onClick={() => onSelect(theme.id)}
        >
          {theme.title} {/* Отображение названия темы */}
        </div>
      ))}
    </div>
  );
};

export default ThemesPage;
