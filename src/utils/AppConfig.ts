import localFont from "next/font/local";

export const AppConfig = {
  site_name: 'CyberHub',
  title: 'CyberHub',
  description: 'CyberHub description',
  locale: 'en',
};

export const openSans = localFont({
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

export const apoc = localFont({
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

export const roboto = localFont({
  src: [
    {
      path: "../../public/font/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
});
