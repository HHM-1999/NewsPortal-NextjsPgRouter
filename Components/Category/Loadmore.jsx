"use client";

import { useState } from "react";
import postApi from "../../lib/postApi";
import Image from "next/image";
import Link from "next/link";

const limit = 8;

export default function LoadMoreNews({ categoryId, topContentIds, initialNews, hasMore }) {
  const [newsList, setNewsList] = useState(initialNews);
  const [offset, setOffset] = useState(initialNews.length);
  const [loading, setLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(hasMore);

  const handleLoadMore = async () => {
    setLoading(true);

    const formData = {
      category_id: categoryId,
      top_content_ids: topContentIds,
      limit,
      offset,
    };

    try {
      const res = await postApi("inner-category-content-more", formData);
      const moreNews = res?.data || [];

      setNewsList((prev) => [...prev, ...moreNews]);
      setOffset((prev) => prev + moreNews.length);
      if (moreNews.length < limit) setCanLoadMore(false);
    } catch (err) {
      console.error("Error loading more:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="row">
        {newsList.map((nc, idx) => (
          <div className="col-lg-6" key={idx}>
            <Link href={`/details/${nc.Slug}/${nc.ContentID}`}>
              <div className="card mb-3 mt-3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_PATH}${nc.ImageBgPath}`}
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

      {canLoadMore && (
        <div className="col-12 text-center my-4 loadMorebtn">
          <button className="btn btn-primary" onClick={handleLoadMore} disabled={loading}>
            {loading ? "লোড হচ্ছে..." : "আরো দেখুন"}
          </button>
        </div>
      )}
    </>
  );
}
