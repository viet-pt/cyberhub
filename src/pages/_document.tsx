import Document, { Head, Html, Main, NextScript } from 'next/document';
import { AppConfig } from 'utils/AppConfig';

const GA_ID = process.env.GA_ID;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head />

        {/* Google analytic */}
        {/* <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} /> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
          `,
          }}
        />

        {/* <CustomNextHead /> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
