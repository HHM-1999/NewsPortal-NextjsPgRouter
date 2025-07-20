// @refresh reset
import { Head, Html, Main, NextScript } from 'next/document'


export default function Document() {
    return (
        <Html >
            <Head >
                <link rel="icon" href="/favicon.ico" />
                <style data-next-hide-fouc="true"></style>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="News Portal - Stay updated with the latest news in Bangladesh and around the world. Explore national, international, sports, entertainment, and feature news in Bengali." />
                <meta name="keywords" content="News, Bangladesh, International News, Sports News, Entertainment News, Feature News, Bengali News" />
                <meta name="author" content="News Portal Team" />
                <meta name="robots" content="noindex, nofollow" />

                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT"
                    crossOrigin="anonymous"
                />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerPolicy="no-referrer" />

            </Head>
            <body>
                <Main />
                <NextScript />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js" integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/fontawesome.min.js" integrity="sha512-j12pXc2gXZL/JZw5Mhi6LC7lkiXL0e2h+9ZWpqhniz0DkDrO01VNlBrG3LkPBn6DgG2b8CDjzJT+lxfocsS1Vw==" crossorigin="anonymous" referrerPolicy="no-referrer"></script>
            </body>
        </Html>
    )
}