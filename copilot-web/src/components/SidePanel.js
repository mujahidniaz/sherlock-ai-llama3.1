import axios from "axios";
import React, { useState } from "react";
import AnimatedHeartbeat from "./AnimatedHeartbeat";

const SidePanel = ({
  useKnowledgeBase,
  setUseKnowledgeBase,
  relevantDocuments,
  setRelevantDocuments,
  chatHistoryMessages,
  setChatHistoryMessages,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleLoadData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification(null);

    try {
      const response = await axios.post("http://localhost:8000/add_documents");
      setNotification({ type: "success", message: response.data.status });
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error || "An error occurred"
        : "Failed to load data";
      setNotification({ type: "error", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="side-panel">
      <div className="logo-container">
        <img
          src="img/logo.png"
          alt="Sherlock Logo"
          className="logo"
          width="300"
        />
      </div>

      <AnimatedHeartbeat />

      <div className="features">
        <div className="toggle-container">
          <span className="toggle-label">Use Knowledge Base</span>
          <div
            className={`toggle-button ${useKnowledgeBase ? "active" : ""}`}
            onClick={() => setUseKnowledgeBase(!useKnowledgeBase)}
          >
            <div className="toggle-switch"></div>
          </div>
        </div>
        <button
          className={`load-data-button ${isLoading ? "disabled" : ""}`}
          onClick={handleLoadData}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Reload Knowledge Base"}
        </button>
        <h3>Chat Settings:</h3>
        <div className="input-container">
          <label htmlFor="relevantDocs">
            Relevant Documents to Include (No of Docs):
          </label>
          <input
            type="number"
            id="relevantDocs"
            value={relevantDocuments}
            onChange={(e) =>
              setRelevantDocuments(Math.max(1, parseInt(e.target.value) || 1))
            }
            min="1"
          />
        </div>

        <div className="input-container">
          <label htmlFor="chatHistory">Send Last Messages as History:</label>
          <input
            type="number"
            id="chatHistory"
            value={chatHistoryMessages}
            onChange={(e) =>
              setChatHistoryMessages(Math.max(1, parseInt(e.target.value) || 1))
            }
            min="0"
          />
        </div>
      </div>

      {notification && (
        <div className={`notification ${notification.type}`}>
          <p>{notification.message}</p>
        </div>
      )}
    </div>
  );
};

export default SidePanel;
