import Head from "next/head";
import "~/styles/style.css";
import { AppProps } from "next/app";
import { ReactElement } from "react";
import { RecoilRoot } from "recoil";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
};

export default MyApp;
