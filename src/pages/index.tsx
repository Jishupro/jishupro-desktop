import { useEffect, useState, ChangeEvent } from "react";
import socketIOClient from "socket.io-client";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("~/components/pdfViewer"), {
  ssr: false,
});

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT || "http://localhost:3001";

const Index: React.VFC = () => {
  const [posters, setPosters] = useState<string[]>(null);
  const [posterIndex, setPosterIndex] = useState<number>(0);

  useEffect(() => {
    if (posters) fullScreen();
  }, [posters]);

  const onPostersSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const pdfFiles = e.target.files;
    const pdfUrls = [];
    for (let i = 0; i < pdfFiles.length; i++) {
      const pdfUrl = URL.createObjectURL(pdfFiles[i]);
      pdfUrls.push(pdfUrl);
    }
    await setPosters(pdfUrls);
  };

  const fullScreen = () => {
    const screenElm = document.getElementById("screen");
    const fullScreenElm = document.fullscreenElement;
    console.log(fullScreenElm, posters);
    if (!fullScreenElm && posters) {
      console.log("full");
      screenElm.requestFullscreen();
    }
  };

  const setNextPoster = () => {
    setPosterIndex((prev) => (prev + 1) % posters.length);
  };

  const setPrevPoster = () => {
    setPosterIndex((prev) => (prev + posters.length - 1) % posters.length);
  };

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
      {posters ? (
        <>
          <div className="flex space-x-3">
            <button
              className="px-3 py-1 bg-blue-500 text-white text-lg"
              onClick={setPrevPoster}
            >
              前へ
            </button>
            <button
              className="px-3 py-1 bg-blue-500 text-white text-lg"
              onClick={setNextPoster}
            >
              次へ
            </button>
          </div>
          <div id="screen">
            {/* <PDFViewer file={posters[posterIndex]} onLoadSuccess={fullScreen} /> */}
            <iframe className="h-screen w-screen" src={posters[posterIndex]} />
          </div>
        </>
      ) : (
        <input type="file" multiple onChange={onPostersSelected} />
      )}
    </>
  );
};

export default Index;
