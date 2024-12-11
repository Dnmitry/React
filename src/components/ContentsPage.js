import React, { useState } from "react";
import "./ContentsPage.css"; // Импортируйте CSS файл
import data from "../data.json"; // Импорт данных из data.json
import backIcon from "../images/back-icon.png"; // Путь к изображению иконки "Назад"

const ContentPage = ({ subthemeId, onBack }) => {
  const contents = data.contents.filter(
    (item) => item.subthemeId === subthemeId
  );
  const [selectedContent, setSelectedContent] = useState(null); // Хранит выбранное содержание

  const handleContentSelect = (content) => {
    setSelectedContent(content); // Устанавливаем выбранное содержимое
  };

  return (
    <div className="contents-container">
      <h2 className="contentpage-title">
        <button className="back-button" onClick={onBack}>
          <img src={backIcon} alt="Назад" className="back-icon" />
        </button>
        Виды
      </h2>
      <div className="contents-list">
        {Array.isArray(contents) && contents.length > 0 ? (
          contents.map((content) => (
            <div
              key={content.id}
              className="content-item" // Назначьте стиль ячейки
              onClick={() => handleContentSelect(content)} // Устанавливаем выбранное содержание
              style={{ cursor: "pointer" }} // Указатель на элемент
            >
              {content.title} {/* Название части содержания */}
            </div>
          ))
        ) : (
          <p>Нет доступных частей для данной подтемы.</p> // Сообщение, если нет доступных частей
        )}
      </div>
    </div>
  );
};

export default ContentPage;
