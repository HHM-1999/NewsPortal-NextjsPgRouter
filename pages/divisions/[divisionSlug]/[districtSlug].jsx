"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import NotFound from "../../not-found";
import postApi from "../../../lib/postApi";
import { formatDateToBengali } from "../../../lib/formatDateToBengali";


const limit = 10;

export async function getServerSideProps(context) {
    try {
        const { districtSlug } = context.params;
        const offset = 0;
        const formData = { districtSlug, limit, offset };
        const data = await postApi('district-contents', formData);

        const districtName = data.districtNameBn || null;
        const initialContents = data.contents || [];
        const hasMore = initialContents.length === limit;

        return {
            props: {
                districtName,
                districtSlug,
                initialContents,
                hasMore,
            },
        };
    } catch (error) {
        console.error("District page server error:", error);
        return { notFound: true };
    }
}

const DistrictSlugPage = ({ districtName, districtSlug, initialContents, hasMore: initialHasMore }) => {
    const [districtContentList, setDistrictContentList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setDistrictContentList(initialContents);
        setOffset(initialContents.length);
        setHasMore(initialHasMore);
    }, [initialContents, initialHasMore]);

    const handleLoadMore = async () => {
        setLoading(true);

        const formData = {
            districtSlug,
            limit,
            offset,
        };

        try {
            const data = await postApi('district-contents', formData);
            const newItems = data.contents || [];

            setDistrictContentList((prev) => [...prev, ...newItems]);
            setOffset((prev) => prev + newItems.length);
            if (newItems.length < limit) setHasMore(false);

            //   setTimeout(() => ForLazyLoaderImg(false), 1000);
        } catch (error) {
            console.error("Error loading more district news:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!districtName) return <NotFound />;

    return (
        <>
            <Head>
                <title>{districtName}</title>
                <meta name="title" content={districtName} />
                <meta name="description" content={districtName} />
                <meta name="keywords" content={districtName} />
            </Head>

            <main>
                <div className="container">
                    <div className="TopHomeSection"></div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="CatTitle mt-3">
                                <h1 className="text-center">{districtName}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 border-right-inner1">
                            <div className="DivisionAllNews mt-3">
                                <div className="row">
                                    {districtContentList.map((nc) => (
                                        <div className="col-lg-6 col-sm-12" key={nc.ContentID}>
                                            <div className="Division-panel">
                                                <div className="DistrictListNews">
                                                    <Link href={`/details/country/${nc.ContentID}`}>
                                                        <div className="row">
                                                            <div className="col-lg-5 col-sm-4 col-5 card-video-part">
                                                                <div className="DImgZoomBlock">
                                                                    <Image
                                                                        // src={process.env.NEXT_PUBLIC_LAZYL_IMG}
                                                                        src={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageSmPath}`}
                                                                        alt={nc.DetailsHeading}
                                                                        title={nc.DetailsHeading}
                                                                        width={200}
                                                                        height={120}
                                                                    />
                                                                    {nc.ShowVideo === 1 && (
                                                                        <div className="card-video-icon">
                                                                            <i className="fa-solid fa-play"></i>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-7 col-sm-8 col-7">
                                                                <div className="Desc">
                                                                    <h3 className="Title">{nc.DetailsHeading}</h3>
                                                                </div>
                                                                <p className="pDate">{formatDateToBengali(nc.created_at)}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {hasMore && (
                                <div className="col-12 text-center my-4 loadMorebtn">
                                <button className="btn btn-primary" onClick={handleLoadMore} disabled={loading}>
                                  {loading ? "লোড হচ্ছে..." : "আরো দেখুন"}
                                </button>
                              </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default DistrictSlugPage;