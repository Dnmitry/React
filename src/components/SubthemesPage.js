import React, { useState } from "react";
import "./SubthemesPage.css"; // Импорт стилей
import backIcon from "../images/back-icon.png"; // Путь к изображению
import deleteIcon from "../images/delete-icon.png"; // Путь к изображению удаления

const SubthemesPage = ({
  subthemes,
  onSelect,
  onBack,
  onAddSubtheme,
  onDeleteSubtheme,
}) => {
  const [newSubtheme, setNewSubtheme] = useState("");

  const handleAddSubtheme = () => {
    if (newSubtheme.trim() !== "") {
      const newSubthemeItem = {
        id: Date.now(), // Используем уникальный идентификатор
        title: newSubtheme,
        themeId: subthemes[0]?.themeId, // Если у вас есть themeId, добавьте его
      };
      onAddSubtheme(newSubthemeItem);
      setNewSubtheme("");
    }
  };

  return (
    <div className="subthemes-container">
      <h2 className="subpage-title">
        <button className="back-button" onClick={onBack}>
          <img src={backIcon} alt="Назад" className="back-icon" />
        </button>
        Подтемы
      </h2>
      <div className="subthemes-list">
        {subthemes.length === 0 ? (
          <p>Нет подтем для отображения.</p>
        ) : (
          subthemes.map((subtheme) => (
            <div key={subtheme.id} className="subtheme-item">
              <span onClick={() => onSelect(subtheme.id)}>
                {subtheme.title}
              </span>
              <button
                className="delete-button"
                onClick={() => onDeleteSubtheme(subtheme.id)}
              >
                <img src={deleteIcon} alt="Удалить" className="delete-icon" />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="add-subtheme-container">
        <input
          type="text"
          value={newSubtheme}
          onChange={(e) => setNewSubtheme(e.target.value)}
          placeholder="Введите название новой подтемы"
          className="add-subtheme-input"
        />
        <button className="add-subtheme-button" onClick={handleAddSubtheme}>
          Добавить подтему
        </button>
      </div>
    </div>
  );
};

export default SubthemesPage;
