import { useState } from "react";
import "./App.css";

function App() {
  const handleSelectFile = () => {
    // TODO: Implement file selection logic
    console.log("Select file clicked");
  };

  return (
    <main className="container">
      <div className="file-selector">
        <button onClick={handleSelectFile} className="select-file-button">
          Select File
        </button>
      </div>
    </main>
  );
}

export default App;
