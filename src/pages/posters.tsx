import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import dynamic from "next/dynamic";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { useRouter } from "next/dist/client/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { fullScreenState, postersState } from "~/recoil/atoms";

const PDFViewer = dynamic(() => import("~/components/pdfViewer"), {
  ssr: false,
});

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT || "http://localhost:8000";

const Index: React.VFC = () => {
  const router = useRouter();
  const posters = useRecoilValue<string[]>(postersState); // 表示するポスター
  const [posterIndex, setPosterIndex] = useState<number>(0); // 表示中のポスターのindex
  const [isFullScreen, setIsFullScreen] =
    useRecoilState<boolean>(fullScreenState);

  // フルスクリーン化
  const fullScreen = () => {
    const screenElm = document.getElementById("screen");
    if (!isFullScreen && posters) {
      screenElm.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  // フルスクリーン解除
  const exitFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // 次のポスターを表示
  const setNextPoster = () => {
    setPosterIndex((prev) => (prev + 1) % posters.length);
  };

  // 前のポスターを表示
  const setPrevPoster = () => {
    setPosterIndex((prev) => (prev + posters.length - 1) % posters.length);
  };

  // ポスター切り替え
  const changePage = (data) => {
    console.log("moved", data);
    if (data.action == "prev") {
      // 前のポスターへ
      setPrevPoster();
    } else if (data.action == "next") {
      // 次のポスターへ
      setNextPoster();
    }
  };

  // マウント時にsocket接続
  useEffect(() => {
    fullScreen();
    const socket = socketIOClient(ENDPOINT);
    socket.on("connected", () => console.log("connected"));
    socket.on("moved", changePage); // movedイベント発火時の処理
    return () => {
      exitFullScreen();
      socket.off();
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div id="screen" className="h-full">
        <AwesomeSlider selected={posterIndex} className="h-[90%]">
          {posters.map((poster, index) => (
            <div key={poster}>
              <PDFViewer file={poster} />
            </div>
          ))}
        </AwesomeSlider>
        <button
          className="px-5 py-2 text-xl text-white bg-blue-500"
          onClick={() => router.push("/")}
        >
          設定画面に戻る
        </button>
        <button
          className="px-5 py-2 text-xl text-white bg-blue-500"
          onClick={setPrevPoster}
        >
          戻る
        </button>
        <button
          className="px-5 py-2 text-xl text-white bg-blue-500"
          onClick={setNextPoster}
        >
          進む
        </button>
      </div>
    </>
  );
};

export default Index;
