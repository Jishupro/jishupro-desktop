import { useState } from "react";
import dynamic from "next/dynamic";
const PDFViewer = dynamic(() => import("~/components/pdfViewer"), {
  ssr: false,
});

const Index: React.VFC = () => {
  return (
    <>
      <div className="flex">
        <PDFViewer file={`posters/poster1.pdf`} />
        <PDFViewer file={`posters/poster2.pdf`} />
      </div>
    </>
  );
};

export default Index;
