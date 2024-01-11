import { useEffect } from "react";
import App from "next/app";
import localFont from "next/font/local";
import clsx from "clsx";
import Aos from "aos";
import Layout from "@common/Layout/Layout";

import "styles/global.scss";
import "styles/index.scss";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

const openSans = localFont({
  src: [
    {
      path: "../../public/font/OpenSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/OpenSans-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/OpenSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});

const apoc = localFont({
  src: [
    {
      path: "../../public/font/Apoc-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/Apoc-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-apoc",
});

const MyApp = ({ Component, pageProps }: any) => {
  const getLayout = Component.getLayout || (page => (
      <Layout {...pageProps}>{page}</Layout>
    ));

  useEffect(() => {
    Aos.init({ duration: 1500, once: true });
  }, []);

  return (
    <main className={clsx(openSans.variable, apoc.variable, "font-sans")}>
      {getLayout(<Component {...pageProps} />)}
    </main>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return {
    ...appProps,
  };
};

export default MyApp;
