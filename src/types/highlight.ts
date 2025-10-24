export interface Highlight {
  id: string;
  pageNumber: number;
  text: string;
  rects: DOMRect[];
  color: string;
}

export interface HighlightPosition {
  pageNumber: number;
  startOffset: number;
  endOffset: number;
  text: string;
}
