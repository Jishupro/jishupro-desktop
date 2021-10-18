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
  const [isSettingPage, setIsSettingPage] = useState<boolean>(true);

  const onPostersSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const pdfFiles = e.target.files;
    const pdfUrls = [];
    for (let i = 0; i < pdfFiles.length; i++) {
      const pdfUrl = URL.createObjectURL(pdfFiles[i]);
      pdfUrls.push(pdfUrl);
    }
    setPosters(pdfUrls);
  };

  const fullScreen = () => {
    const screenElm = document.getElementById("screen");
    const fullScreenElm = document.fullscreenElement;
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
      {!isSettingPage && posters ? (
        // ポスター表示画面
        <>
          <div id="screen">
            <div className="flex justify-between">
              <button
                className="px-3 py-1 bg-blue-500 text-white text-lg"
                onClick={setPrevPoster}
              >
                ＜
              </button>
              <button
                className="px-3 py-1 bg-blue-500 text-white text-lg"
                onClick={setNextPoster}
              >
                ＞
              </button>
            </div>
            <PDFViewer file={posters[posterIndex]} onLoadSuccess={fullScreen} />
            <button
              className="px-5 py-2 text-xl text-white bg-blue-500"
              onClick={() => setIsSettingPage(true)}
            >
              設定画面に戻る
            </button>
          </div>
        </>
      ) : (
        // ポスター設定画面
        <div className="bg-gray-100 border max-w-3xl mx-auto my-10 px-7 py-5 w-full">
          <h2 className="text-2xl font-bold">ポスターを設定する</h2>
          <div className="my-5">
            <input type="file" multiple onChange={onPostersSelected} />
            <p className="text-gray-500">※複数選択可能です。</p>
          </div>
          <button
            className={`px-5 py-2 rounded text-xl text-white ${
              !posters ? "bg-gray-500" : "bg-blue-500"
            }`}
            disabled={!posters}
            onClick={() => setIsSettingPage(false)}
          >
            全画面で表示する
          </button>
        </div>
      )}
    </>
  );
};

export default Index;
