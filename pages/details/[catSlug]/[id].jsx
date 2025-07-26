import Head from "next/head";
import DynamicMetadataClient from "../../../Components/Details/DynamicMetadataClient"; // make sure it's client if needed
import getApi from "../../../lib/getApi";
// import SkeletonSection from "../../../Components/common/SkeletonSection";
import Image from "next/image";
import SocialShare from "./SocialShare";
// import NotFound from "../../not-found";
import Link from "next/link";
import { FaTag } from "react-icons/fa";

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    // Get news content details
    const response = await getApi(`content-details/${id}`);
    const data = response?.data || [];

    if (!data || data.length === 0) {
      return {
        notFound: true,
      };
    }

    const catID = data[0]?.CategoryID;

    // console.log(catID);

    // Fetch latest content under category
    const latestRes = await getApi(`category-latest-content/${catID}/4`);
    const latestData = latestRes?.data || [];

    // Fetch popular content under category
    const popularRes = await getApi(`category-popular-content/${catID}/4`);
    const popularData = (popularRes?.data || []).slice(0, 4);
    const catName = data[0]?.CategoryName


    return {
      props: {
        data,
        latestData,
        popularData,
        catName,
        popularData,
      },
    };
  } catch (error) {
    console.error("SSR ERROR for content ID", id, error?.message);
    return {
      notFound: true,
    };
  }
}


const NewsDetailsPage = ({ data, latestData, catName, popularData }) => {
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
    datePublished: "", // optional
    author: [{ "@type": "News Article", name: "NewsPortal" }],
    publisher: {
      "@type": "News Article",
      name: "NewsPortal",
    },
  };

  return (
    <>
      <Head>
        <title>{firstContentItem?.DetailsHeading || "Details - NewsPortal"}</title>
        <meta
          name="description"
          content={firstContentItem?.DetailsHeading || "Read full news on NewsPortal."}
        />
        <meta property="og:title" content={firstContentItem?.DetailsHeading || "NewsPortal News"} />
        <meta
          property="og:description"
          content={firstContentItem?.DetailsHeading || "NewsPortal - Trusted News"}
        />
        <meta
          property="og:image"
          content={`https://assets.deshkalnews.com/${firstContentItem?.ImageSmPath}`}
        />
        <meta
          property="og:url"
          content={`https://deshkalnews.com/details/${firstContentItem?.CategorySlug}/${firstContentItem?.ContentID}`}
        />
        <meta property="og:type" content="article" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>


      <div className="container" style={{ padding: "20px" }}>
        <DynamicMetadataClient />
        {data.map((nc) => (
          <div className="row BorderBottom" key={nc.ContentID}>
            <div className="col-lg-8 col-12" >
              <div
                className="newsDetail"
                key={nc.ContentID}
                id={nc.ContentID}
                data-title={nc.DetailsHeading}
                data-image={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`}
              >
                <h2 className="catnameDetails">{nc.CategoryName}  ::</h2>
                <h1 className="content-Heading">{nc.DetailsHeading}</h1>
                {/* writer section  */}
                {nc.content_contributors && nc.content_contributors.length > 0 ? (
                  nc.content_contributors[0].WriterName && (
                    <Link href={`/writers/${nc.content_contributors[0].Slug}`}>
                      <div className="writer-section">
                        <p className="writer-name2">
                          <strong>লেখক:</strong> <span>{nc.content_contributors[0].WriterName}</span>
                        </p>
                      </div>
                    </Link>
                  )
                ) : (
                  nc.WriterName && (
                    <div className="writer-section">
                      <p className="writer-name">
                        <strong>লেখক:</strong> {nc.WriterName}
                      </p>
                    </div>
                  )
                )}



                <SocialShare title={nc.DetailsHeading} contentID={nc.ContentID} />

                {nc.VideoID && nc.ShowVideo === 1 ? (
                  <div className="col-sm-12 video-container mt-2">
                    {nc.VideoType === "youtube" ? (
                      <iframe
                        className="embed-responsive-item"
                        title="youtube-video"
                        src={`https://www.youtube.com/embed/${nc.VideoID}?autoplay=0`}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    ) : nc.VideoType === "vimeo" ? (
                      <iframe
                        title="vimeo-video"
                        src={`https://player.vimeo.com/video/${nc.VideoID}`}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    ) : nc.VideoType === "facebook" ? (
                      <iframe
                        title="facebook-video"
                        src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F${nc.VideoID}%2F&show_text=0&width=560`}
                        width="560"
                        height="315"
                        style={{ border: "none", overflow: "hidden" }}
                        scrolling="no"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    ) : nc.VideoType === "instagram" ? (
                      <iframe
                        className="embed-responsive-item"
                        title="instagram-video"
                        src={`//instagram.com/p/${nc.VideoID}/embed`}
                        width="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency="true"
                      ></iframe>
                    ) : null}
                  </div>
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

                <div
                  className="Content-Details"
                  dangerouslySetInnerHTML={{ __html: nc.ContentDetails }}
                  style={{ marginTop: "20px" }}
                />
              </div>
              {/* Tags section */}
              {nc.Tags && nc.Tags.length > 0 && (
                <div className="RelatedTags d-print-none">
                  <div className="row">
                    <div className="col-sm-12">
                      <p className="Subject"> <FaTag />  সম্পর্কিত বিষয়: </p>
                      {(nc.Tags).split(',').map((nc) => {

                        return (
                          <div className="TagList" key={nc}>
                            <Link href={"/tags/" + nc} ><p>{nc}</p></Link>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}




            </div>
            <div className="col-lg-4 col-12">
              {/* latest news  */}
              <div className="latest-sidebar">
                <h4 className="mb-3 mt-5"> {catName} এর সর্বশেষ খবর</h4>
                {latestData.map((item) => (
                  <Link href={`/details/${item.Slug}/${item.ContentID}`} >
                    <div className="row mb-3" key={item.ContentID}>
                      <div className="col-lg-5 col-5">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMG_PATH + item.ImageSmPath}`}
                          width={120}
                          height={80}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }}
                          alt={item.DetailsHeading}
                          title={item.DetailsHeading}
                        />
                      </div>
                      <div className="col-lg-7 col-7">
                        {/* <Link href={`/details/${item.Slug}/${item.ContentID}`} > */}
                        {item.DetailsHeading.length > 60 ? item.DetailsHeading.slice(0, 40) + "..." : item.DetailsHeading}
                        {/* </Link> */}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {/* popular news */}
              <div className="latest-sidebar">

                <h4 className="mb-3 mt-5"> {catName} এর সর্বশেষ খবর</h4>

                {popularData.map((item) => (
                  <Link href={`/details/${item.Slug}/${item.ContentID}`} >
                    <div className="row mb-3" key={item.ContentID}>
                      <div className="col-lg-5 col-5">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMG_PATH + item.ImageSmPath}`}
                          width={120}
                          height={80}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }}
                          alt={item.DetailsHeading}
                          title={item.DetailsHeading}
                        />
                      </div>
                      <div className="col-lg-7 col-7">
                        {/* <Link href={`/details/${item.Slug}/${item.ContentID}`} > */}
                        {item.DetailsHeading.length > 60 ? item.DetailsHeading.slice(0, 40) + "..." : item.DetailsHeading}
                        {/* </Link> */}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            </div>

          </div>
        ))}
      </div>
    </>
  );
};




export default NewsDetailsPage;
