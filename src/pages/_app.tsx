import "~/styles/style.css";
import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import { ReactElement } from "react";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return <Component {...pageProps} />;
};

export default MyApp;
