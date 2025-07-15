"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import getApi from "../lib/getApi";
import postApi from "../lib/postApi";
import Image from "next/image";
import Link from "next/link";
import NotFound from "./not-found";

const limit = 8;

export async function getServerSideProps(context) {
  try {
    const { catSlug } = context.params;
    const CategoryList = await getApi(`category/${catSlug}`);
    const category = CategoryList?.category;

    if (!category) {
      return { notFound: true };
    }

    const catID = category.CategoryID;

    const leadNews = await getApi(`inner-category-content/${catID}/6`);
    const topContentIds = leadNews?.inner_category_content?.map((el) => el.ContentID) || [];

    const formData = {
      top_content_ids: topContentIds,
      category_id: catID,
      limit: 8,
      offset: 0,
    };

    const newsResponse = await postApi(`inner-category-content-more`, formData);
    const newsList = newsResponse?.data || [];
    const hasMore = newsList.length === 8;

    return {
      props: {
        category,
        newsList,
        topContentIds,
        hasMore,
      },
    };
  } catch (error) {
    console.error("CategoryPage server error:", error);
    return { notFound: true };
  }
}

const CategoryPage = ({ category, newsList: initialNews, topContentIds, hasMore: initialHasMore }) => {
  const router = useRouter();
  const [newsList, setNewsList] = useState(initialNews);
  const [offset, setOffset] = useState(initialNews.length);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // useEffect(() => {
  //   setNewsList(initialNews);
  //   setOffset(initialNews.length);
  //   setHasMore(initialHasMore);
  // }, [router.asPath]);
  useEffect(() => {
    setTransitioning(true);
    const timer = setTimeout(() => {
      setNewsList(initialNews);
      setOffset(initialNews.length);
      setHasMore(initialHasMore);
      setTransitioning(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [router.asPath]);

  const handleLoadMore = () => {
    setLoading(true);

    const formData = {
      top_content_ids: topContentIds,
      category_id: category.CategoryID,
      limit,
      offset,
    };

    postApi("inner-category-content-more", formData)
      .then((res) => {
        const newData = res?.data || [];
        setNewsList((prev) => [...prev, ...newData]);
        setOffset((prev) => prev + newData.length);
        if (newData.length < limit) setHasMore(false);
      })
      .catch((err) => console.error("Load more error:", err))
      .finally(() => setLoading(false));
  };

  if (!category) return <NotFound />;

  return (
    <>
      <Head>
        <title>{category?.CategoryName}</title>
        <meta property="og:title" content={category?.CategoryName} />
        <meta property="og:description" content={category?.CategoryName} />
      </Head>

      <div className="container">
        <div className="row">
          <div className="col-lg-12 mt-3">
            <div className="CatTitle">
              <h1 className="text-center">{category?.CategoryName}</h1>
            </div>
          </div>
        </div>
        {transitioning ? (
          <div className="text-center my-5">
            <div className="loader-section">
              <img src="/loading.gif" alt="Loading" title="Loading ....." />
            </div>
          </div>
        ) : (
          <>
            <div className="row">
              {newsList.map((nc, idx) => (
                <div className="col-lg-6" key={idx}>
                  <Link href={`/details/${nc.Slug}/${nc.ContentID}`}>
                    <div className="card mb-3 mt-3">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`}
                        className="card-img-top img-fluid"
                        width={400}
                        height={500}
                        alt={nc.DetailsHeading}
                        title={nc.DetailsHeading}
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

export default CategoryPage;
