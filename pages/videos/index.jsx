import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import getApi from '../../lib/getApi'
import postApi from '../../lib/postApi'
import NotFound from '../not-found'

const limit = 8

export async function getServerSideProps() {
  try {
    const leadRes = await getApi('videos/8')
    const leadList = leadRes?.webVideos || []

    const leadVideoTop = leadList[0] || null
    const leadVideos = leadList.slice(1, 4)

    const res = await postApi('all-video', { limit, offset: 0 })
    const newsList = res?.webVideos || []
    const hasMore = newsList.length === limit

    return {
      props: {
        leadVideoTop,
        leadVideos,
        initialNews: newsList,
        hasMore,
      },
    }
  } catch (err) {
    console.error('Video page error:', err)
    return { notFound: true }
  }
}

const VideoGalleryPage = ({ leadVideoTop, leadVideos, initialNews, hasMore: initialHasMore }) => {
  const [newsList, setNewsList] = useState(initialNews)
  const [offset, setOffset] = useState(initialNews.length)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [loading, setLoading] = useState(false)

  const handleLoadMore = () => {
    setLoading(true)
    const formData = { limit, offset }

    postApi('all-video', formData)
      .then((res) => {
        const newData = res?.webVideos || []
        setNewsList((prev) => [...prev, ...newData])
        setOffset((prev) => prev + newData.length)
        if (newData.length < limit) setHasMore(false)
      })
      .catch((err) => console.error('Load more error:', err))
      .finally(() => setLoading(false))
  }

  if (!leadVideoTop) return <NotFound />

  return (
    <>
      <Head>
        <title>ভিডিও গ্যালারি</title>
        <meta property="og:title" content="ভিডিও গ্যালারি" />
      </Head>

      <main>
        <div className="container">
          <h2 className="DTitle">
            <Link href="/">
              <div className="CatTitle mt-3">
                <h1 className="text-center">ভিডিও গ্যালারি</h1>
              </div>
            </Link>
          </h2>

          <div className="DVideoTopArea">
            <div className="DvideoTop">
              <div className="row">
                <div className="col-lg-8 col-12 border-right-inner border-bottom-inner">
                  <div className="DVideoTopInner">
                    <Link href={`/videos/${leadVideoTop.WebTVID}`}>
                      <div className="row">
                        <div className="col-lg-8 col-12">
                          <div className="DImgZoomBlock">
                            <picture>
                              <img
                                // src={process.env.NEXT_PUBLIC_LAZYL_IMG}
                                src={`https://img.youtube.com/vi/${leadVideoTop.WebTVLinkCode}/maxresdefault.jpg`}
                                alt={leadVideoTop.WebTVHeading}
                                title={leadVideoTop.WebTVHeading}
                                onBlur={process.env.NEXT_LAZY_IMAGE}
                              />
                            </picture>
                            <div className="card-videoGallery-icon">
                              <i className="fa-solid fa-play"></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="Desc">
                            <div className="NewsTitle">
                              <h3 className="Title">{leadVideoTop.WebTVHeading}</h3>
                            </div>
                            <div className="Brief">
                              <p dangerouslySetInnerHTML={{ __html: leadVideoTop.Remarks }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="DVideoTop2Inner">
                    <div className="row">
                      {leadVideos.map((nc) => (
                        <div className="col-lg-4 col-12 border-right-inner" key={nc.WebTVID}>
                          <div className="DVideoTop2InnerList">
                            <Link href={`/videos/${nc.WebTVID}`}>
                              <div className="row">
                                <div className="col-lg-12 col-sm-4 col-5">
                                  <div className="DImgZoomBlock">
                                    <picture>
                                      <img
                                        // src={process.env.NEXT_PUBLIC_LAZYL_IMG}
                                        src={`https://img.youtube.com/vi/${nc.WebTVLinkCode}/maxresdefault.jpg`}
                                        alt={nc.WebTVHeading}
                                        title={nc.WebTVHeading}
                                        onBlur={process.env.NEXT_LAZY_IMAGE}
                                      />
                                    </picture>
                                    <div className="card-videoGallery-icon">
                                      <i className="fa-solid fa-play"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-sm-8 col-7 textBorder2">
                                  <div className="Desc">
                                    <h3 className="Title">{nc.WebTVHeading}</h3>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="DVideoTop2Inner mt-5">
              <div className="row">
                {newsList.slice(4).map((nc) => (
                  <div className="col-lg-3 col-12 border-right-inner" key={nc.WebTVID}>
                    <div className="DVideoTop2InnerList">
                      <Link href={`/videos/${nc.WebTVID}`}>
                        <div className="row">
                          <div className="col-lg-12 col-sm-4 col-5 videoIcon">
                            <div className="DImgZoomBlock">
                              <picture>
                                <img
                                  // src={process.env.NEXT_PUBLIC_LAZYL_IMG}
                                  src={`https://img.youtube.com/vi/${nc.WebTVLinkCode}/0.jpg`}
                                  alt={nc.WebTVHeading}
                                  title={nc.WebTVHeading}
                                  className="img-fluid img100"
                                  onBlur={process.env.NEXT_LAZY_IMAGE}
                                />
                              </picture>
                              <div className="card-videoGallery-icon">
                                <i className="fa-solid fa-play"></i>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12 col-sm-8 col-7 textBorder2">
                            <div className="Desc">
                              <h3 className="Title">{nc.WebTVHeading}</h3>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {hasMore && (
              <div className="col-12 text-center my-4 loadMorebtn">
                <button className="btn btn-primary" onClick={handleLoadMore} disabled={loading}>
                  {loading ? "লোড হচ্ছে..." : "আরো দেখুন"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default VideoGalleryPage
