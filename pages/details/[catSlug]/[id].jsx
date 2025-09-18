"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

import DynamicMetadataClient from "../../../Components/Details/DynamicMetadataClient";
import getApi from "../../../lib/getApi";
import SocialShare from "./SocialShare";
import { FaTag } from "react-icons/fa";

// ✅ SSG setup
export async function getStaticPaths() {
  try {
    // Pre-build a limited set of pages (e.g. latest 50 articles)
    const response = await getApi("content-list?limit=50");
    const contents = response?.data || [];

    const paths = contents.map((item) => ({
      params: { id: String(item.ContentID) },
    }));

    return {
      paths,
      fallback: "blocking", // Generate missing pages on first request
    };
  } catch (error) {
    console.error("Error generating static paths:", error?.message);
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps(context) {
  const { id } = context.params;

  try {
    const response = await getApi(`content-details/${id}`);
    const data = response?.data || [];

    if (!data || data.length === 0) {
      return { notFound: true };
    }

    const catID = data[0]?.CategoryID;
    const latestRes = await getApi(`category-latest-content/${catID}/4`);
    const popularRes = await getApi(`category-popular-content/${catID}/4`);

    return {
      props: {
        data,
        latestData: latestRes?.data || [],
        popularData: popularRes?.data?.slice(0, 4) || [],
        catName: data[0]?.CategoryName,
      },
      revalidate: 60, // ISR: re-generate every 60 seconds
    };
  } catch (error) {
    console.error("SSG ERROR for content ID", id, error?.message);
    return { notFound: true };
  }
}

const NewsDetailsPage = ({ data, latestData, catName, popularData }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="loader-section">
        <img src="/loading.gif" alt="Loading" title="Loading ....." />
      </div>
    );
  }

  const firstContentItem = data[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: firstContentItem?.DetailsHeading,
    image: [`${process.env.NEXT_PUBLIC_IMG_PATH}/${firstContentItem?.ImageSmPath}`],
    datePublished: "",
    author: [{ "@type": "News Article", name: "NewsPortal" }],
    publisher: { "@type": "News Article", name: "NewsPortal" },
  };
  return (
    <>
      <Head>
        <title>{firstContentItem?.DetailsHeading || "Details - NewsPortal"}</title>
        <meta name="description" content={firstContentItem?.DetailsHeading || "Read full news on NewsPortal."} />
        <meta property="og:title" content={firstContentItem?.DetailsHeading || "NewsPortal News"} />
        <meta property="og:description" content={firstContentItem?.DetailsHeading || "NewsPortal - Trusted News"} />
        <meta property="og:image" content={`https://assets.deshkalnews.com/${firstContentItem?.ImageSmPath}`} />
        <meta property="og:url" content={`https://deshkalnews.com/details/${firstContentItem?.CategorySlug}/${firstContentItem?.ContentID}`} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <div className="container" style={{ padding: "20px" }}>
        <DynamicMetadataClient />
        {data.map((nc) => (
          <div className="row BorderBottom" key={nc.ContentID}>
            <div className="col-lg-8 col-12">
              <div className="newsDetail" id={nc.ContentID} data-title={nc.DetailsHeading} data-image={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`}>
                {/* Category name */}
                <h2 className="catnameDetails">
                  {isLoading ? <Skeleton width={150} height={20} /> : `${nc.CategoryName} ::`}
                </h2>

                {/* Details Heading */}
                <h1 className="content-Heading">
                  {isLoading ? <Skeleton height={32} width="80%" /> : nc.DetailsHeading}
                </h1>

                {/* Writer Section */}
                {isLoading ? (
                  <Skeleton width={180} height={18} />
                ) : nc.content_contributors?.length > 0 && nc.content_contributors[0].WriterName ? (
                  <Link href={`/writers/${nc.content_contributors[0].Slug}`}>
                    <div className="writer-section">
                      <p className="writer-name2">
                        <strong>লেখক:</strong> <span>{nc.content_contributors[0].WriterName}</span>
                      </p>
                    </div>
                  </Link>
                ) : nc.WriterName ? (
                  <div className="writer-section">
                    <p className="writer-name">
                      <strong>লেখক:</strong> {nc.WriterName}
                    </p>
                  </div>
                ) : null}

                {/* Publish Date */}
                <div className="publish-date">
                  {isLoading ? (
                    <Skeleton width={120} height={16} />
                  ) : nc.PublishDate ? (
                    `প্রকাশিত: ${new Date(nc.PublishDate).toLocaleDateString("bn-BD", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`
                  ) : null}
                </div>

                {/* Social Share */}
                {isLoading ? (
                  <Skeleton height={30} width={200} />
                ) : (
                  <SocialShare title={nc.DetailsHeading} contentID={nc.ContentID} />
                )}

                {/* Image or Video */}
                {nc.VideoID && nc.ShowVideo === 1 ? (
                  <div className="col-sm-12 video-container mt-2">
                    {/* ... video iframe logic unchanged ... */}
                  </div>
                ) : isLoading ? (
                  <Skeleton height={250} width="100%" />
                ) : (
                  <picture>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`}
                      alt={nc.DetailsHeading}
                      title={nc.DetailsHeading}
                      width={400}
                      height={250}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        position: "relative",
                      }}
                    />
                  </picture>
                )}

                {/* Content */}
                <div className="Content-Details" dangerouslySetInnerHTML={{ __html: nc.ContentDetails }} style={{ marginTop: "20px" }} />

                {/* Tags */}
                {nc.Tags && nc.Tags.length > 0 && (
                  <div className="RelatedTags d-print-none">
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="Subject"><FaTag /> সম্পর্কিত বিষয়: </p>
                        {nc.Tags.split(',').map((tag) => (
                          <div className="TagList" key={tag}>
                            <Link href={`/tags/${tag}`}><p>{tag}</p></Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 col-12">
              <div className="latest-sidebar">
                <h4 className="mb-3 mt-5">{catName} এর সর্বশেষ খবর</h4>
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div className="row mb-3" key={i}>
                      <div className="col-lg-5 col-5"><Skeleton height={80} /></div>
                      <div className="col-lg-7 col-7"><Skeleton count={2} /></div>
                    </div>
                  ))
                ) : (
                  latestData.map((item) => (
                    <Link href={`/details/${item.Slug}/${item.ContentID}`} key={item.ContentID}>
                      <div className="row mb-3">
                        <div className="col-lg-5 col-5">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMG_PATH + item.ImageSmPath}`}
                            width={120}
                            height={80}
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                            alt={item.DetailsHeading}
                          />
                        </div>
                        <div className="col-lg-7 col-7">
                          {item.DetailsHeading.length > 60 ? item.DetailsHeading.slice(0, 40) + "..." : item.DetailsHeading}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>

              <div className="latest-sidebar">
                <h4 className="mb-3 mt-5">{catName} এর জনপ্রিয় খবর</h4>
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div className="row mb-3" key={i}>
                      <div className="col-lg-5 col-5"><Skeleton height={80} /></div>
                      <div className="col-lg-7 col-7"><Skeleton count={2} /></div>
                    </div>
                  ))
                ) : (
                  popularData.map((item) => (
                    <Link href={`/details/${item.Slug}/${item.ContentID}`} key={item.ContentID}>
                      <div className="row mb-3">
                        <div className="col-lg-5 col-5">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMG_PATH + item.ImageSmPath}`}
                            width={120}
                            height={80}
                            style={{ width: "100%", height: "auto", objectFit: "cover" }}
                            alt={item.DetailsHeading}
                          />
                        </div>
                        <div className="col-lg-7 col-7">
                          {item.DetailsHeading.length > 60 ? item.DetailsHeading.slice(0, 40) + "..." : item.DetailsHeading}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewsDetailsPage;
