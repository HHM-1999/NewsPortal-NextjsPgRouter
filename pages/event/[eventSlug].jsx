// pages/event/[eventSlug].jsx
"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import NotFound from "../not-found";
import getApi from "../../lib/getApi";
import postApi from "../../lib/postApi";

const limit = 6;

export async function getServerSideProps(context) {
  try {
    const { eventSlug } = context.params;

    // First API call: event details
    const eventDetails = await getApi(`latest-event`);
    const eventInfo = eventDetails?.event || null;
    // console.log(eventInfo);

    if (!eventInfo) {
      return { notFound: true };
    }

    // First batch of event content (POST)
    const formData = {
      slug: eventSlug,
      limit,
      offset: 0,
    };
    const contentResponse = await postApi("event-content", formData);
    const contentList = contentResponse?.data || [];
    const hasMore = contentList.length === limit;

    return {
      props: {
        eventInfo,
        eventSlug,
        initialContent: contentList,
        hasMore,
      },
    };
  } catch (error) {
    console.error("Event page server error:", error);
    return { notFound: true };
  }
}

const EventPage = ({ eventInfo, eventSlug, initialContent, hasMore: initialHasMore }) => {
  const router = useRouter();

  const [contentList, setContentList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
    setInitialLoading(true);

    const timer = setTimeout(() => {
      setContentList(initialContent);
      setOffset(initialContent.length);
      setHasMore(initialHasMore);
      setTransitioning(false);
      setInitialLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [router.asPath, initialContent, initialHasMore]);

  const handleLoadMore = () => {
    setLoading(true);

    const formData = {
      slug: eventSlug,
      limit,
      offset,
    };

    postApi("event-content", formData)
      .then((res) => {
        const newData = res?.data || [];
        setTimeout(() => {
          setContentList((prev) => [...prev, ...newData]);
          setOffset((prev) => prev + newData.length);
          if (newData.length < limit) setHasMore(false);
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Load more error:", err);
        setLoading(false);
      });
  };

  if (!eventInfo) return <NotFound />;

  return (
    <>
      <Head>
        <title>{eventInfo?.EventTitle}</title>
        <meta name="description" content={eventInfo?.EventTitle || ""} />
        <meta property="og:title" content={eventInfo?.EventTitle} />
        <meta property="og:description" content={eventInfo?.EventTitle || ""} />
      </Head>

      <div className="container">
        <div className="row">
          <div className="col-lg-12 mt-3">
            <h1 className="text-center">{eventInfo?.EventTitle}</h1>
          </div>
        </div>

        {(transitioning || initialLoading) ? (
          <div className="row">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div className="col-lg-6" key={`skeleton-${idx}`}>
                <div className="card mb-3 mt-3">
                  <Skeleton height={250} width="100%" />
                  <div className="card-body">
                    <h5><Skeleton width="80%" height={20} /></h5>
                    <p><Skeleton count={3} /></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="row">
              {contentList.map((item, idx) => (
                <div className="col-lg-6" key={`content-${idx}`}>
                  <Link href={`/details/${item.Slug}/${item.ContentID}`}>
                    <div className="card mb-3 mt-3">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMG_PATH + item.ImageBgPath}`}
                        className="card-img-top img-fluid"
                        alt={item.DetailsHeading}
                        title={item.DetailsHeading}
                        width={400}
                        height={500}
                      />
                      <div className="card-body">
                        <h5>{item.DetailsHeading}</h5>
                        <p>{item.ContentBrief}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="col-12 text-center my-4 loadMorebtn">
                <button
                  className="btn btn-primary"
                  onClick={handleLoadMore}
                  disabled={loading}
                >
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

export default EventPage;
