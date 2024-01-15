import Subcribe from '@common/Subcribe/Subcribe';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppConfig } from 'utils/AppConfig';
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';
import ScrollTop from '../ScrollTop/ScrollTop';

const Header = dynamic(() => import('../Header/Header'), { ssr: false })

interface ILayoutProps {
  title?: string;
  children: ReactNode;
  video?: string;
  image?: string;
  description?: string;
  canonical?: string
  typeHeader?: number
};

export default function Layout({ title, children, video, image, description, canonical }: ILayoutProps) {
  return (
    <div className="app-wrapper">
      <Head>
        <meta charSet="utf-8" />
        <title>{title || 'CyberHub'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#59B858" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:title" content={title || 'CyberHub VN'} />
        <meta property="title" content={title || 'CyberHub VN'} />
        <meta property="og:site_name" content="CyberHub" />
        <meta property="site_name" content="CyberHub" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />
        <meta property="image" content={image || "/imgs/logo2.png"} />
        <meta property="og:image" content={image || "/imgs/logo2.png"} />
        <meta name="keywords" content="" />
        <meta name="generator" content="CyberHub" />
        <meta property="og:description" content={description || AppConfig.description} />
        <meta property="description" content={description || AppConfig.description} />
        <link rel="icon" type="image/png" href="/imgs/logo2.png" />
        {!!video && <meta property='og:video' content={video} />}
        {!!video && <meta property='video' content={video} />}

        <NextSeo
          title={title}
          description={description || AppConfig.description}
          canonical={canonical}
          openGraph={{
            title: title,
            url: canonical,
            description: AppConfig.description,
            locale: AppConfig.locale,
            site_name: AppConfig.site_name,
          }}
        />
      </Head>

      <main className='relative text-sm'>
        <Header />
        <div className='mt-16 lg:mt-0'>
          {children}
        </div>
        <Subcribe />
        <Footer />
      </main>
      <Loading />
      <ScrollTop />
      <ToastContainer
        hideProgressBar
        autoClose={1000}
      />
    </div>
  )
}
