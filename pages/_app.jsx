import "./globals.css";
import Header from './Components/Header.jsx'
import { Tiro_Bangla } from 'next/font/google';
import Footer from "./Components/Footer";
import Head from "next/head";


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
            </Head>
            <Header />
            <div>
                <Component {...pageProps} />
            </div>
            <Footer />
        </main>


    )
}