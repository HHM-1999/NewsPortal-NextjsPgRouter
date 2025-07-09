// @refresh reset
import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
    return (
        <Html >
            <Head >
              <link rel="icon" href="/favicon.ico" />
                <meta name="robots" content="noindex, nofollow" />

                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT"
                    crossOrigin="anonymous"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}