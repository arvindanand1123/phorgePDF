import { useState } from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { invoke } from '@tauri-apps/api/core';
import { convertFileSrc } from '@tauri-apps/api/core';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import "./App.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);

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
        const response = await invoke<string>('load_pdf', { filePath: selected });
        console.log("Response from Rust:", response);
        const url = convertFileSrc(selected);
        setPdfUrl(url);
      }
    } catch (error) {
      console.error("Error selecting file:", error);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <main className="container">
      {!pdfUrl ? (
        <div className="file-selector">
          <button onClick={handleSelectFile} className="select-file-button">
            Select File
          </button>
        </div>
      ) : (
        <div className="pdf-viewer">
          <div className="pdf-controls">
            <button onClick={() => setPdfUrl(null)} className="back-button">
              Back
            </button>
            <span className="page-info">Pages: {numPages}</span>
          </div>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="pdf-document"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        </div>
      )}
    </main>
  );
}

export default App;
