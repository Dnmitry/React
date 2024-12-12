import React, { useState } from "react";
import "./ContentsPage.css"; // Import the CSS file
import data from "../data.json"; // Import data from data.json
import backIcon from "../images/back-icon.png";
import deleteIcon from "../images/delete-icon.png"; // Path to the delete icon image

const ContentPage = ({ subthemeId, onBack }) => {
  const initialContents = data.contents.filter(
    (item) => item.subthemeId === subthemeId
  );
  const [contents, setContents] = useState(initialContents); // Holds the content
  const [selectedContent, setSelectedContent] = useState(null); // Holds the selected content
  const [newContent, setNewContent] = useState(""); // Holds the new content

  const handleContentSelect = (content) => {
    setSelectedContent(content); // Set the selected content
  };

  const handleAddNewContent = () => {
    if (newContent.trim() === "") return; // Prevent adding empty content
    const newContentItem = {
      id: Date.now(), // Generate a unique ID for the new content
      title: newContent,
      subthemeId: subthemeId,
    };
    setContents([...contents, newContentItem]);
    setNewContent(""); // Clear the input field
  };

  const handleDeleteContent = (contentToDelete) => {
    setContents(
      contents.filter((content) => content.id !== contentToDelete.id)
    );
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
              <span
                onClick={() => handleContentSelect(content)}
                className="content-title"
              >
                {content.title}
              </span>
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
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Добавить новое содержание"
          className="new-content-input"
        />
        <button onClick={handleAddNewContent} className="add-button">
          Добавить
        </button>
      </div>
    </div>
  );
};

export default ContentPage;
