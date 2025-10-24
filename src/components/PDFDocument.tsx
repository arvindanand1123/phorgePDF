import { useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PDFDocumentViewerProps {
  pdfUrl: string;
  numPages: number;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  onPageChange: (page: number) => void;
}

export default function PDFDocumentViewer({
  pdfUrl,
  numPages,
  onDocumentLoadSuccess,
  onPageChange,
}: PDFDocumentViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const pages = containerRef.current.querySelectorAll('.react-pdf__Page');
      const container = containerRef.current;
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const centerY = containerTop + containerHeight / 2;

      let closestPage = 1;
      let closestDistance = Infinity;

      pages.forEach((page, index) => {
        const pageElement = page as HTMLElement;
        const pageTop = pageElement.offsetTop - container.offsetTop;
        const pageHeight = pageElement.offsetHeight;
        const pageCenter = pageTop + pageHeight / 2;
        const distance = Math.abs(centerY - pageCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestPage = index + 1;
        }
      });

      onPageChange(closestPage);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Set initial page when document loads
      setTimeout(handleScroll, 100);

      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [numPages, onPageChange]);


  return (
    <div className="pdf-document" ref={containerRef}>
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={true}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
}
