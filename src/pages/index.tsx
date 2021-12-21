import { useRouter } from "next/dist/client/router";
import { ChangeEvent } from "react";
import "react-awesome-slider/dist/styles.css";
import { useRecoilState } from "recoil";
import { postersState } from "~/recoil/atoms";

const Index: React.VFC = () => {
  const [posters, setPosters] = useRecoilState<string[]>(postersState); // 選択したポスター
  const router = useRouter();

  // ポスター設定処理
  const onPostersSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const pdfFiles = e.target.files;
    const pdfUrls = [];
    for (let i = 0; i < pdfFiles.length; i++) {
      const pdfUrl = URL.createObjectURL(pdfFiles[i]);
      pdfUrls.push(pdfUrl);
    }
    setPosters(pdfUrls);
  };

  return (
    <>
      <div className="bg-gray-100 border max-w-3xl mx-auto my-10 px-7 py-5 w-full">
        <h2 className="text-2xl font-bold">ポスターを設定する</h2>
        <div className="my-5">
          <input type="file" multiple onChange={onPostersSelected} />
          <p className="text-gray-500">※複数選択可能です。</p>
        </div>
        <button
          className={`px-5 py-2 rounded text-xl text-white ${
            posters.length == 0 ? "bg-gray-500" : "bg-blue-500"
          }`}
          disabled={posters.length == 0}
          onClick={() => router.push("/posters")}
        >
          全画面で表示する
        </button>
      </div>
    </>
  );
};

export default Index;
