"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import postApi from "../../lib/postApi";

const limit = 10;

export default function SearchResult() {
    const router = useRouter();
    const searchValue = router.query.q;

    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [offset, setOffset] = useState(0);
    const [showMore, setShowMore] = useState(true);
    const [queryText, setQueryText] = useState("");

    useEffect(() => {
        if (searchValue) {
            window.scrollTo(0, 0);
            fetchNews(true);
        }
    }, [searchValue]);

    const fetchNews = async (reset = false) => {
        if (!searchValue) return;

        if (reset) {
            setIsLoading(true);
            setOffset(0);
            setNews([]);
            setShowMore(true);
        } else {
            setIsLoadingData(true);
        }

        const formData = {
            keywords: searchValue,
            start_date: "",
            end_date: "",
            category_id: "",
            limit,
            offset: reset ? 0 : offset,
        };

        try {
            const data = await postApi("archive", formData);

            if (reset) setIsLoading(false);
            else setIsLoadingData(false);

            if (data.data.length > 0) {
                setNews((prev) => (reset ? data.data : [...prev, ...data.data]));
                setOffset((prev) => prev + data.data.length);
            } else {
                if (reset) setNews(null);
                setShowMore(false);
            }

            // setTimeout(() => {
            //     ForLazyLoaderImg(false);
            // }, 1000);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setIsLoadingData(false);
        }
    };

    const handleLoadMore = (e) => {
        e.preventDefault();
        fetchNews(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const txt = queryText.trim();
        if (txt) {
            setQueryText("");
            router.push(`/search?q=${txt}`);
        }
    };


    return (
        <main>
            <Head>
                <title>খুঁজুন</title>
                <meta name="description" content="খুঁজুন :: NewsPortal" />
                <meta name="keywords" content="খুঁজুন :: NewsPortal" />
                <meta property="og:title" content="খুঁজুন :: NewsPortal" />
                <meta property="og:description" content="খুঁজুন :: NewsPortal" />
            </Head>

            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mt-3">
                        <div className="CatTitle">
                            <h1 className="text-center"> <a href={`/search`} >
                                <span>খুঁজুন</span>
                            </a></h1>
                        </div>
                    </div>
                </div>

                <div className="row searchResult">
                    <div className="col-sm-12 d-flex justify-content-center my-5">
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-auto">
                                <input
                                    type="text"
                                    name="q"
                                    value={queryText}
                                    onChange={(e) => setQueryText(e.target.value)}
                                    placeholder="এখানে লিখুন..."
                                    className="form-control"
                                    required
                                />

                            </div>
                            <div className="col-auto">
                                <button type="submit" className="searchButton mb-3">
                                    খুঁজুন
                                    {isLoading && (
                                        // <img src="/media/common/loading.gif" alt="loading" style={{ width: "28px", marginLeft: "12px" }} />
                                        <span>...</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {!isLoading && news === null && (
                    <h1 className="warningHeader">
                        <span>দুঃখিত,</span> কোন খবর খুঁজে পাওয়া যায়নি।
                    </h1>
                )}

                {!isLoading && news && news.length > 0 && (
                    <>
                        <div className="row archiveSection">
                            {news.map((nc) => (
                                <div className="col-lg-6 col-sm-12" key={nc.ContentID}>
                                    <div className="archiveListNews">
                                        <Link href={`/details/${nc.Slug}/${nc.ContentID}`} >
                                            <div className="row">
                                                <div className="col-sm-4 col-5 card-video-part">
                                                    <div className="DImgZoomBlock">
                                                        <picture>
                                                            <img
                                                                // src={process.env.NEXT_PUBLIC_LAZYL_IMG}
                                                                src={process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageSmPath}
                                                                alt={nc.ContentHeading}
                                                            />
                                                        </picture>
                                                        {nc.ShowVideo === 1 && (
                                                            <div className="video-icon">
                                                                <i className="fa-solid fa-play"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-sm-8 col-7">
                                                    <div className="Desc">
                                                        <h3 className="catTitle2">{nc.CategoryName}</h3>
                                                        <h3 className="Title BGTitle">
                                                            {nc.ContentSubHeading ? <span className="subHeading">{nc.ContentSubHeading} / </span> : ""}
                                                            {nc.DetailsHeading}
                                                        </h3>
                                                        <div className="Brief">
                                                            <p>{nc.ContentBrief}</p>
                                                        </div>
                                                    </div>
                                                    {/* <p className="pDate">{formatDateToBengali(nc.created_at)}</p> */}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {showMore && (
                            // <div id="btnDiv" className="text-center mt-3 mb-4">
                            //     <button onClick={handleLoadMore} id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG">
                            //         আরো খবর...
                            //         {isLoadingData && (
                            //             <img src="/media/common/loading.gif" alt="loading" style={{ width: "28px", marginLeft: "12px" }} />
                            //         )}
                            //     </button>
                            // </div>
                            <div className="col-12 text-center my-4 loadMorebtn">
                                <button className="btn btn-primary" onClick={handleLoadMore} disabled={isLoadingData}>
                                    {isLoadingData ? "লোড হচ্ছে..." : "আরো দেখুন"}
                                </button>
                            </div>
                        )}

                    </>
                )}
            </div>
        </main>
    );
}
