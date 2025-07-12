import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import getApi from '../lib/getApi';
import postApi from '../lib/postApi';
import Image from 'next/image';
import Link from 'next/link';
import NotFound from './not-found';
import Head from 'next/head';

const limit = 8;
const leadNewsLimit = 6;

const CategoryPage = () => {
    const router = useRouter();
    const { catSlug } = router.query;

    const [category, setCategory] = useState(null);
    const [topContentIds, setTopContentIds] = useState([]);
    const [newsList, setNewsList] = useState([]);
    const [offset, setOffset] = useState(limit);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);

    // Fetch initial data
    useEffect(() => {
        if (!catSlug) return;

        const fetchData = async () => {
            try {
                const CategoryList = await getApi(`category/${catSlug}`);
                const cat = CategoryList?.category;
                if (!cat) return;

                setCategory(cat);
                const catID = cat.CategoryID;

                const leadNews = await getApi(`inner-category-content/${catID}/${leadNewsLimit}`);
                const topIds = leadNews.inner_category_content.map(el => el.ContentID);
                setTopContentIds(topIds);

                const formData = {
                    top_content_ids: topIds,
                    category_id: catID,
                    limit,
                    offset: 0,
                };

                const news = await postApi(`inner-category-content-more`, formData);
                setNewsList(news.data || []);
                setHasMore((news.data || []).length === limit);
            } catch (err) {
                console.error("Error loading category data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [catSlug]);

    // Load More Handler
    const handleLoadMore = async () => {
        if (!category) return;
        setLoading(true);

        try {
            const formData = {
                top_content_ids: topContentIds,
                category_id: category.CategoryID,
                limit,
                offset,
            };

            const news = await postApi(`inner-category-content-more`, formData);
            const newData = news.data || [];

            setNewsList(prev => [...prev, ...newData]);
            setOffset(prev => prev + limit);

            if (newData.length < limit) setHasMore(false);
        } catch (error) {
            console.error("Load more error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && newsList.length === 0) return <div className='loader-section'>
    <img src={"/loading.gif"} alt="Loading" title="Loading ....." />
  </div>;
    if (!category) return <NotFound />;

    return (
        <>
            <Head>
                <title>{category?.CategoryName}</title>
                <meta property="og:title" content={category?.CategoryName} />
                <meta property="og:description" content={category?.CategoryName} />
                {/* <meta property="og:url" content={`https://yourdomain.com/news/${news.slug}`} /> */}
            </Head>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mt-3">
                        <div className="CatTitle">
                            <h1 className='text-center'>{category?.CategoryName}</h1>
                        </div>
                    </div>
                </div>
                {/* <h1 className="text-center mt-3">{category.CategoryName}</h1> */}

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

                {/* Load More Button */}
                {hasMore && (
                    <div className="col-12 text-center my-4 loadMorebtn">
                        <button className="btn btn-primary" onClick={handleLoadMore} disabled={loading}>
                            {loading ? 'Loading...' : 'আরো দেখুন'}
                        </button>
                    </div>
                )}
            </div></>

    );
};

export default CategoryPage;
