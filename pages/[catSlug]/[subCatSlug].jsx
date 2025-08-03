"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import getApi from "../../lib/getApi";
import postApi from "../../lib/postApi";
import NotFound from "../not-found";

const limit = 6;

export async function getServerSideProps(context) {
  try {
    const { catSlug, subCatSlug } = context.params;
    const CategoryList = await getApi(`category/${catSlug}`);
    const category = CategoryList?.category;
    const SubCategoryList = await getApi(`sub-categorys/${catSlug}/${subCatSlug}`);
    const Subcategory = SubCategoryList?.subCategories;
    const subCatId = Subcategory?.CategoryID;
    const catID = category.CategoryID;

    const leadNews = await getApi(`inner-sub-category-content/${subCatId}/10`);
    const leadNewsList = leadNews?.inner_subcategory_content || [];
    const SubtopContentIds = leadNews?.inner_subcategory_content?.map((el) => el.ContentID) || [];

    const formData = {
      top_content_ids: SubtopContentIds,
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
        catSlug,
        Subcategory,
        newsList,
        SubtopContentIds,
        hasMore,
        catID,
        leadNewsList,
      },
    };
  } catch (error) {
    console.error("SubCategoryPage server error:", error);
    return { notFound: true };
  }
}

const SubCategoryPage = ({
  catID,
  leadNewsList,
  Subcategory,
  newsList: initialNews,
  SubtopContentIds,
  hasMore: initialHasMore,
}) => {
  const router = useRouter();

  const [newsList, setNewsList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
    setInitialLoading(true);

    const timer = setTimeout(() => {
      setNewsList(initialNews);
      setOffset(initialNews.length);
      setHasMore(initialHasMore);
      setTransitioning(false);
      setInitialLoading(false);
    }, 500); // 0.5 seconds delay on initial load

    return () => clearTimeout(timer);
  }, [router.asPath, initialNews, initialHasMore]);

  const handleLoadMore = () => {
    setLoading(true);

    const formData = {
      top_content_ids: SubtopContentIds,
      category_id: catID,
      limit,
      offset,
    };

    postApi("inner-category-content-more", formData)
      .then((res) => {
        const newData = res?.data || [];
        setTimeout(() => {
          setNewsList((prev) => [...prev, ...newData]);
          setOffset((prev) => prev + newData.length);
          if (newData.length < limit) setHasMore(false);
          setLoading(false);
        }, 2000); // 2 seconds delay on load more
      })
      .catch((err) => {
        console.error("Load more error:", err);
        setLoading(false);
      });
  };

  if (!Subcategory) return <NotFound />;

  return (
    <>
      <Head>
        <title>{Subcategory?.CategoryName}</title>
        <meta name="description" content={Subcategory?.CategoryName} />
        <meta name="keywords" content={Subcategory?.CategoryName} />
        <meta property="og:title" content={Subcategory?.CategoryName} />
        <meta property="og:description" content={Subcategory?.CategoryName} />
      </Head>

      <div className="container">
        <div className="row">
          <div className="col-lg-12 mt-3">
            <div className="CatTitle">
              <h1 className="text-center">{Subcategory?.CategoryName}</h1>
            </div>
          </div>
        </div>

        {(transitioning || initialLoading) ? (
          <div className="row">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div className="col-lg-6" key={`skeleton-initial-${idx}`}>
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
              {leadNewsList.map((nc, idx) => (
                <div className="col-lg-6" key={`lead-${idx}`}>
                  <Link href={`/details/${nc.Slug}/${nc.ContentID}`}>
                    <div className="card mb-3 mt-3">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`}
                        className="card-img-top img-fluid"
                        alt={nc.DetailsHeading}
                        title={nc.DetailsHeading}
                        width={400}
                        height={500}
                      />
                      <div className="card-body">
                        <h5>{nc.DetailsHeading}</h5>
                        <p>{nc.ContentBrief}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              {newsList.map((nc, idx) => (
                <div className="col-lg-6" key={`news-${idx}`}>
                  <Link href={`/details/${nc.Slug}/${nc.ContentID}`}>
                    <div className="card mb-3 mt-3">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`}
                        className="card-img-top img-fluid"
                        alt={nc.DetailsHeading}
                        title={nc.DetailsHeading}
                        width={400}
                        height={500}
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

export default SubCategoryPage;
