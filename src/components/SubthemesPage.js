// SubthemesPage.js
import React from "react";
import "./SubthemesPage.css"; // Импорт стилей
import backIcon from "../images/back-icon.png"; // Путь к изображению

const SubthemesPage = ({ subthemes, onSelect, onBack }) => {
  return (
    <div className="subthemes-container">
      <h2 className="subpage-title">
        <button className="back-button" onClick={onBack}>
          <img src={backIcon} alt="Назад" className="back-icon" />
        </button>
        Подтемы
      </h2>
      <div className="subthemes-list">
        {subthemes.map((subtheme) => (
          <div
            key={subtheme.id}
            className="subtheme-item"
            onClick={() => onSelect(subtheme.id)}
          >
            {subtheme.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubthemesPage;
