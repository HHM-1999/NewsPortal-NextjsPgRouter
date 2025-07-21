
import { Tiro_Bangla } from 'next/font/google';
import Head from 'next/head';
import Footer from "../Components/Footer";
import Header from '../Components/Header';
import BackToTopButton from '../Components/common/BackToTopButton';
import "./globals.css";
const tiroBangla = Tiro_Bangla({
    variable: "--font-tiro-bangla",
    subsets: ["bengali"],
    weight: ["400"], // Tiro Bangla only has weight 400
});
export default function App({ Component, pageProps }) {
    return (

        <main className={`${tiroBangla.variable}`} >
            <Head>
                <title>News Portal</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <Component {...pageProps} />
            <Footer />
            <BackToTopButton />

        </main>


    )
}