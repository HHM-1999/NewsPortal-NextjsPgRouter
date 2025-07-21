"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import postApi from "../../lib/postApi";

export default function ArchiveClient({ initialData = [], initialCatList = [] }) {
    const [archivedata, setArchivedata] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [offset, setOffset] = useState(initialData.length);
    const [hasMore, setHasMore] = useState(initialData.length === 12);

    const fetchArchive = (params, append = false) => {
        setLoading(true);
        const adjustedParams = { ...params };

        // Adjust end date for full day
        if (adjustedParams.end_date) {
            const end = new Date(adjustedParams.end_date);
            end.setHours(23, 59, 59, 999);
            adjustedParams.end_date = end.toISOString();
        }

        postApi("archive", adjustedParams)
            .then((res) => {
                let newData = res?.data || [];

                // Filter by date range (safety)
                if (adjustedParams.start_date) {
                    const startTime = new Date(adjustedParams.start_date).getTime();
                    const endTime = adjustedParams.end_date
                        ? new Date(adjustedParams.end_date).getTime()
                        : null;

                    newData = newData.filter((item) => {
                        const itemTime = new Date(item.created_at).getTime();
                        return endTime
                            ? itemTime >= startTime && itemTime <= endTime
                            : itemTime >= startTime;
                    });
                }

                if (append) {
                    setArchivedata((prev) => [...prev, ...newData]);
                    setOffset((prev) => prev + newData.length);
                } else {
                    setArchivedata(newData);
                    setOffset(newData.length);
                }

                setHasMore(newData.length === 12 && newData.length > 0);
            })
            .catch((err) => {
                console.error("Archive fetch error:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        fetchArchive(
            {
                start_date: startDate,
                end_date: endDate,
                category_id: categoryId,
                limit: 12,
                offset: 0,
            },
            false
        );
    };

    const handleLoadMore = () => {
        fetchArchive(
            {
                start_date: startDate,
                end_date: endDate,
                category_id: categoryId,
                limit: 12,
                offset: offset,
            },
            true
        );
    };

    return (
        <div>
            <form className="form-inline" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="row">
                            <div className="col-sm-4 my-2">
                                <label htmlFor="start_date">তারিখ হতে:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="start_date"
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        if (endDate && e.target.value > endDate) {
                                            setEndDate(e.target.value);
                                        }
                                    }}
                                />
                            </div>
                            <div className="col-sm-4 my-2">
                                <label htmlFor="end_date">তারিখ পর্যন্ত:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="end_date"
                                    min={startDate}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                            <div className="col-sm-4 my-2">
                                <label htmlFor="category_id">বিভাগ:</label>
                                <select
                                    id="category_id"
                                    className="form-control"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    <option value="">সকল খবর</option>
                                    {initialCatList.map((cat) => (
                                        <option key={cat.CategoryID} value={cat.CategoryID}>
                                            {cat.CategoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center my-4">
                    <button type="submit" className="btn btn-primary">
                        খুঁজুন
                    </button>
                </div>
            </form>

            {/* Results */}
            <div className="category-area">
                <div className="row">
                    {loading && archivedata.length === 0 ? (
                        <p className="text-center">লোড হচ্ছে...</p>
                    ) : archivedata.length === 0 ? (
                        <p className="text-center">কোনো তথ্য পাওয়া যায়নি।</p>
                    ) : (
                        archivedata.map((nc, idx) => (
                            <div className="col-lg-6" key={idx}>
                                <Link href={`/details/${nc.Slug}/${nc.ContentID}`}>
                                    <div className="card mb-3 mt-3">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMG_PATH}${nc.ImageBgPath}`}
                                            alt={nc.DetailsHeading}
                                            title={nc.DetailsHeading}
                                            width={400}
                                            height={250}
                                            className="card-img-top img-fluid"
                                        />
                                        <div className="card-body">
                                            <h5>{nc.DetailsHeading}</h5>
                                            <p>{nc.ContentBrief}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Load More */}
            {hasMore && archivedata.length > 0 && (
                <div className="col-12 text-center my-4 loadMorebtn">
                    <button className="btn btn-primary" onClick={handleLoadMore} disabled={loading}>
                        {loading ? 'লোড হচ্ছে...' : 'আরো দেখুন'}
                    </button>
                </div>
            )}

            {!hasMore && archivedata.length > 0 && (
                <p className="text-center my-4">সব খবর দেখানো হয়েছে।</p>
            )}
        </div>
    );
}
