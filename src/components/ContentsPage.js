// components/ContentsPage.js
import React, { useState, useEffect } from "react";
import "./ContentsPage.css";
import data from "../data.json";
import backIcon from "../images/back-icon.png";
import deleteIcon from "../images/delete-icon.png";

const ContentPage = ({ subthemeId, onBack, onAddContent, onDeleteContent }) => {
  const initialContents = data.contents.filter(
    (item) => item.subthemeId === subthemeId
  );
  const [contents, setContents] = useState(initialContents);

  useEffect(() => {
    const storedContents = localStorage.getItem(`contents-${subthemeId}`);
    if (storedContents) {
      setContents(JSON.parse(storedContents));
    }
  }, [subthemeId]);

  useEffect(() => {
    localStorage.setItem(`contents-${subthemeId}`, JSON.stringify(contents));
  }, [contents, subthemeId]);

  const handleAddNewContent = (newContent) => {
    onAddContent({
      id: Date.now(),
      title: newContent,
      subthemeId: subthemeId,
    });
  };

  const handleDeleteContent = (contentToDelete) => {
    onDeleteContent(contentToDelete.id);
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
        {contents.length === 0 ? (
          <p>Нет содержания для отображения.</p>
        ) : (
          contents.map((content) => (
            <div key={content.id} className="content-item">
              <span className="content-title">{content.title}</span>
              <button
                className="delete-button"
                onClick={() => handleDeleteContent(content)}
              >
                <img src={deleteIcon} alt="Удалить" className="delete-icon" />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="add-content-container">
        <input
          type="text"
          value=""
          onChange={(e) => handleAddNewContent(e.target.value)}
          placeholder="Добавить новое содержание"
          className="new-content-input"
        />
        <button onClick={() => handleAddNewContent("")} className="add-button">
          Добавить
        </button>
      </div>
    </div>
  );
};

export default ContentPage;
