import { useState } from "react";
import { open } from '@tauri-apps/plugin-dialog';
import "./App.css";

function App() {
  const handleSelectFile = async () => {
    try {
      const selected = await open({
        multiple: false,
        filters: [{
          name: 'PDF',
          extensions: ['pdf']
        }]
      });

      if (selected) {
        console.log("Selected file:", selected);
      }
    } catch (error) {
      console.error("Error selecting file:", error);
    }
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
