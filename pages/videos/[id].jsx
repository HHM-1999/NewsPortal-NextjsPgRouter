import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import SocialShare from './SocialShare'; // Adjust path if needed
import { toBanglaFullDate } from '../../lib/toBanglaFullDate';

export async function getServerSideProps(context) {
  const { id } = context.params;

  const videoRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}videos-details/${id}`);
  const latestRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}details-video-latest/4/${id}`);

  const videoData = await videoRes.json();
  const latestData = await latestRes.json();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: videoData?.WebTVHeading || "ভিডিও গ্যালারি",
    image: [`https://img.youtube.com/vi/${videoData?.WebTVLinkCode}/maxresdefault.jpg`],
    datePublished: videoData?.create_date || "", // Adjust if you convert to ISO
    author: [{ "@type": "Organization", name: "NewsPortal" }],
    publisher: {
      "@type": "Organization",
      name: "NewsPortal",
    },
  };

  return {
    props: {
      videoDetails: videoData?.VideoDetails?.[0] || null,
      videosList: latestData?.allLatestVideos || [],
      jsonLd
    },
  };
}



export default function VideoDetailsPage({ videoDetails, videosList,jsonLd }) {
  if (!videoDetails) {
    return <div>ভিডিও খুঁজে পাওয়া যায়নি</div>;
  }

  return (
    <div className="container" style={{ padding: '20px' }}>
      <Head>
        <title>{videoDetails.WebTVHeading}</title>
        <meta name="description" content={videoDetails.WebTVHeading} />
        <meta property="og:image" content={`https://img.youtube.com/vi/${videoDetails.WebTVLinkCode}/maxresdefault.jpg`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        ></script>

      </Head>


      <div className="row BorderBottom">
        <div className="col-lg-8 col-12">
          <div className="newsDetail">
            <h2 className="catnameDetails"><Link href={'/videos'}>ভিডিও গ্যালারি ::</Link></h2>
            <h1 className="content-Heading">{videoDetails.WebTVHeading}</h1>

            <SocialShare title={videoDetails.WebTVHeading} contentID={videoDetails.WebTVID} />
            <p className='mt-3 mb-2'> প্রকাশিত :  {toBanglaFullDate(videoDetails.create_date)}</p>

            <div className="col-sm-12 video-container mt-2">
              {videoDetails.SourceType == 1 ? (
                <iframe
                  className="embed-responsive-item"
                  title={videoDetails.WebTVHeading}
                  src={`https://www.youtube.com/embed/${videoDetails.WebTVLinkCode}?autoplay=0`}
                  frameBorder="0"
                  allowFullScreen
                />
              ) : videoDetails.SourceType == 2 ? (
                <iframe
                  title={videoDetails.WebTVHeading}
                  src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F${videoDetails.WebTVLinkCode}%2F&show_text=0&width=560`}
                  width="560"
                  height="315"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : null}
            </div>

            {videoDetails.Remarks && (
              <div className="Brief">
                <p dangerouslySetInnerHTML={{ __html: videoDetails.Remarks }} />
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-4 col-12">
          <div className="latest-sidebar">
            <h4 className="mb-3 mt-5"> আরও দেখুন </h4>
            {videosList.map((item) => (
              <Link href={`/videos/${item.WebTVID}`} key={item.WebTVID}>
                <div className="row mb-3">
                  <div className="col-lg-5 col-5">
                    <div className="DImgZoomBlock">
                      <img
                        src={`https://img.youtube.com/vi/${item.WebTVLinkCode}/0.jpg`}
                        width={120}
                        height={80}
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        alt={item.WebTVHeading}
                        title={item.WebTVHeading}
                      // placeholder="blur"
                      // blurDataURL={process.env.NEXT_PUBLIC_LAZY_IMAGE}
                      />
                      <div className="card-videoGallery-icon">
                        <i className="fa-solid fa-play"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-7">
                    {item.WebTVHeading.length > 60
                      ? item.WebTVHeading.slice(0, 40) + "..."
                      : item.WebTVHeading}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
