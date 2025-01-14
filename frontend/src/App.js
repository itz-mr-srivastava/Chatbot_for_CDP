// Frontend: React Chatbot UI

import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setError(null);
    setLoading(true);
    setResponse(null);

    try {
      const res = await axios.post("http://localhost:5000/ask", { question });
      setResponse(res.data);
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred while fetching the response."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Support Agent Chatbot</h1>
      <div className="chat-container">
        <textarea
          className="question-input"
          placeholder="Ask a question about Segment, mParticle, Lytics, or Zeotap..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <button
          className="ask-button"
          onClick={handleAskQuestion}
          disabled={loading}
        >
          {loading ? "Loading..." : "Ask Question"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {response && (
        <div className="response-container">
          <h2>Response</h2>
          <p><strong>Question:</strong> {response.question}</p>
          <p><strong>Query Type:</strong> {response.queryType}</p>
          <p><strong>Answer:</strong> {response.answer}</p>
        </div>
      )}
    </div>
  );
};

export default App;
