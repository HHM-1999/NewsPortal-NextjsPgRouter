import Head from "next/head";
import getApi from "../lib/getApi";
import postApi from "../lib/postApi";
import dynamic from "next/dynamic";
import NotFound from "./not-found";
import Link from "next/link";

const LoadMoreNews = dynamic(() => import("../Components/Category/Loadmore"), { ssr: false });
const limit = 8;

export async function getServerSideProps(context) {
  try {
    const { catSlug } = context.params;

    const CategoryList = await getApi(`category/${catSlug}`);
    const category = CategoryList?.category;
   // ✅ Get subcategories
  
    const subCategories = category?.subCategories || [];
    // console.log(subCategories);

    if (!category) return { notFound: true };

    const catID = category.CategoryID;

    const leadNews = await getApi(`inner-category-content/${catID}/6`);
    const topContentIds = leadNews?.inner_category_content?.map((el) => el.ContentID) || [];

    const formData = {
      top_content_ids: topContentIds,
      category_id: catID,
      limit,
      offset: 0,
    };

    const newsResponse = await postApi("inner-category-content-more", formData);
    const initialNews = newsResponse?.data || [];
    const hasMore = initialNews.length === limit;

 

    return {
      props: {
        category,
        subCategories,
        topContentIds,
        initialNews,
        hasMore,
      },
    };
  } catch (error) {
    console.error("Category page error:", error);
    return { notFound: true };
  }
}

export default function CategoryPage({ category, subCategories, topContentIds, initialNews, hasMore }) {
  if (!category) return <NotFound />;

  return (
    <>
      <Head>
        <title>{category?.CategoryName}</title>
        <meta name="description" content={category?.CategoryName} />
        <meta name="keywords" content={category?.CategoryName} />
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

          {/* ✅ Subcategory Navigation */}
          {subCategories.length > 0 && (
            <div className="col-12 mt-3">
              <div className="subcat-nav d-flex flex-wrap justify-content-center gap-2">
                {subCategories.map((subcat) => (
                  <Link
                    key={subcat.CategoryID}
                    href={`/${category.Slug}/${subcat.Slug}`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    {subcat.CategoryName}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ✅ Load More Component */}
        <LoadMoreNews
          categoryId={category.CategoryID}
          topContentIds={topContentIds}
          initialNews={initialNews}
          hasMore={hasMore}
        />
      </div>
    </>
  );
}
