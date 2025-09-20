"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getApi from "../../lib/getApi";
import postApi from "../../lib/postApi";
import NotFound from "../not-found";

const limit = 8;

export async function getServerSideProps(context) {
    try {
        const { writerTitle } = context.params;
        const WriterList = await getApi(`writers/${decodeURIComponent(writerTitle)}`);
        const Writers = WriterList?.writers;

        if (!Writers || Writers.length === 0) {
            return { notFound: true };
        }

        const formData = {
            slug: decodeURIComponent(writerTitle),
            limit,
            offset: 0,
        };


        const newsResponse = await postApi(`writers-contents`, formData);
        // console.log("newsResponse:", newsResponse);

        const newsList = newsResponse?.writers_content || [];
        const hasMore = newsList.length === limit;

        return {
            props: {
                Writers,
                newsList,
                hasMore,
            },
        };
    } catch (error) {
        console.error("TagPage server error:", error);
        return { notFound: true };
    }
}

const TagPage = ({ Writers, newsList: initialNews, hasMore: initialHasMore }) => {
    const router = useRouter();
    const { writerTitle } = router.query;

    const [newsList, setNewsList] = useState(initialNews);
    const [offset, setOffset] = useState(initialNews.length);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [loading, setLoading] = useState(false);
    const [transitioning, setTransitioning] = useState(false);

    useEffect(() => {
        setTransitioning(true);
        const timer = setTimeout(() => {
            setNewsList(initialNews);
            // console.log(initialNews);

            setOffset(initialNews.length);
            setHasMore(initialHasMore);
            setTransitioning(false);
        }, 200);
        return () => clearTimeout(timer);
    }, [router.asPath]);

    const handleLoadMore = async () => {
        if (!writerTitle) return;

        setLoading(true);
        const formData = {
            slug: decodeURIComponent(writerTitle),
            limit,
            offset,
        };
        // console.log(formData);


        try {
            const res = await postApi("tag-content", formData);
            const newData = res?.writers_content || [];
            setNewsList((prev) => [...prev, ...newData]);
            setOffset((prev) => prev + newData.length);
            if (newData.length < limit) setHasMore(false);
        } catch (err) {
            console.error("Load more error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!Writers || Writers.length === 0) return <NotFound />;

    const WriterTitle = Writers[0]?.WriterName || decodeURIComponent(writerTitle);

    return (
        <>
            <Head>
                <title>{WriterTitle}</title>
                <meta property="og:title" content={WriterTitle} />
                <meta property="og:description" content={WriterTitle} />
            </Head>

            <div className="container mt-5">
                <div className="DTagName">
                    <i class="fa-solid fa-pen"></i>
                    <h1>{WriterTitle}</h1>
                </div>
            </div>

            <div className="container">
                {transitioning ? (
                    <div className="text-center my-5">
                        <img src="/loading.gif" alt="Loading" title="Loading ....." />
                    </div>
                ) : (
                    <>
                        <div className="row">
                            {newsList.map((nc, idx) => (
                                <div className="col-lg-6" key={idx}>
                                    <Link href={`/details/${nc.Slug}/${nc.ContentID}`}>
                                        <div className="card mb-3 mt-3">
                                            <Image
                                                src={
                                                    nc.ImageBgPath
                                                        ? `${process.env.NEXT_PUBLIC_IMG_PATH}${nc.ImageBgPath}`
                                                        : "/no-image.jpg"
                                                }
                                                className="card-img-top img-fluid"
                                                alt={nc.DetailsHeading}
                                                title={nc.DetailsHeading}
                                                width={400}
                                                height={250}
                                                loading="lazy"
                                            />
                                            <div className="card-body">
                                                <h5>{nc.DetailsHeading}</h5>
                                                <p>{nc.ContentBrief}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {hasMore && (
                            <div className="col-12 text-center my-4 loadMorebtn">
                                <button className="btn btn-primary" onClick={handleLoadMore} disabled={loading}>
                                    {loading ? "লোড হচ্ছে..." : "আরো দেখুন"}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default TagPage;
