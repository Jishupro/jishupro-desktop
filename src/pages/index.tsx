import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import dynamic from "next/dynamic";
const PDFViewer = dynamic(() => import("~/components/pdfViewer"), {
  ssr: false,
});

const Index: React.VFC = () => {
  const posters = ["poster1", "poster2"];
  const [posterIndex, setPosterIndex] = useState<number>(0);
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
