import Head from "next/head";
import getApi from "../../../lib/getApi";
import DynamicMetadataClient from "../../Components/Details/DynamicMetadataClient"; // make sure it's client if needed
// import SkeletonSection from "../../../Components/common/SkeletonSection";
import Image from "next/image";
import SocialShare from "./SocialShare";
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const response = await getApi(`content-details/${id}`);
    const data = response?.data || [];
    // console.log(data);
    return {
      props: {data},
    };
  } catch (error) {
    console.error("Error loading content details:", error);
    return {
      notFound: true,
    };
  }
}
const NewsDetailsPage = ({data}) => {
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
    author: [{ "@type": "Organization", name: "NewsPortal" }],
    publisher: {
      "@type": "Organization",
      name: "NewsPortal",
      logo: {
        "@type": "ImageObject",
        url: "https://assets.deshkalnews.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.NewsPortal.com/details/${data.catSlug}/${data.id}`,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="container" style={{ padding: "20px" }}>
        <DynamicMetadataClient />
        <div className="row">
          <div className="col-lg-10 m-auto">
        
            {data.map((nc) => (
              <div
                className="newsDetail"
                key={nc.ContentID}
                id={nc.ContentID}
                data-title={nc.DetailsHeading}
                data-image={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`}
              >
                <h2 className="catnameDetails">{nc.CategoryName}</h2>
                <h1 className="content-Heading">{nc.DetailsHeading}</h1>
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};




export default NewsDetailsPage;
