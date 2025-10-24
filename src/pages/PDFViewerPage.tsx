import { useState } from 'react';
import PDFControls from '../components/PDFControls';
import PDFDocumentViewer from '../components/PDFDocument';

interface PDFViewerPageProps {
  pdfUrl: string;
  onBack: () => void;
}

export default function PDFViewerPage({ pdfUrl, onBack }: PDFViewerPageProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pdf-viewer">
      <PDFControls
        currentPage={currentPage}
        numPages={numPages}
        onBack={onBack}
      />
      <PDFDocumentViewer
        pdfUrl={pdfUrl}
        numPages={numPages}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
