import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.js";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type Props = {
  file: string;
  pageNumber?: number;
};

/**
 * タイトルコンポーネント
 * @param page 内容
 */

const PDFViewer: React.VFC<Props> = ({ pageNumber = 1, file }) => {
  return (
    <Document file={file}>
      <Page pageNumber={pageNumber} />
    </Document>
  );
};

export default PDFViewer;