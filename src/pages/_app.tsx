import Layout from "@common/Layout/Layout";
import Aos from "aos";
import clsx from "clsx";
import App from "next/app";
import { useEffect } from "react";
import { useUserStore } from "store/storeUser";
import Cookies from "universal-cookie";
import { apoc, openSans, roboto } from "utils/AppConfig";
import { storageKey } from "utils/storageKey";

// import 'antd/dist/reset.css';
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import "styles/global.scss";
import "styles/index.scss";

const cookies = new Cookies();

const MyApp = ({ Component, pageProps }: any) => {
  const getLayout = Component.getLayout || (page => (
    <Layout {...pageProps}>{page}</Layout>
  ));
  const [updateUserStore] = useUserStore((state) => [state.addUserInfo]);

  useEffect(() => {
    Aos.init({ duration: 1500, once: true });
    checkToken();
  }, []);

  const checkToken = () => {
    const profile = cookies.get(storageKey.PROFILE);
    if (profile) {
      updateUserStore(profile);
    }
  }

  return (
    <main className={clsx(openSans.variable, apoc.variable, roboto.variable, "font-sans")}>
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
