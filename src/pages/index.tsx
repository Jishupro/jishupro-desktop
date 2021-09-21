import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("~/components/pdfViewer"), {
  ssr: false,
});

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT || "http://localhost:3001";

const Index: React.VFC = () => {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("connected", (data) => console.log("connected"));
    socket.on("moved", (data) => console.log("moved"));
    return () => {
      socket.disconnect();
    };
  }, []);

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
