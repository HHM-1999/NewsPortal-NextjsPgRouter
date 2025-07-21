import Image from 'next/image';
import { useEffect, useState } from 'react';
import getApi from '../../lib/getApi';
import ScrollLink from '../../utils/ScrollLink';

const Entertainment = () => {
  const [state, setState] = useState(null);
  const [state2, setState2] = useState([]);
  const [state3, setState3] = useState([]);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate delay
    new Promise(resolve => setTimeout(resolve, 100))
      .then(() => getApi('home-json-bn/generateCategory10.json'))
      .then((list) => {
        setState(list[0]);
        setState2(list.slice(1, 4));
        setState3(list.slice(4, 7));
      })
    //   .finally(() => setLoading(false));
  }, []);
  if (!state) return null;
  //   if (loading) return <div>Loading...</div>;

  return (
    <div className='container'>
      <ScrollLink href={"/entertainment"}>
        <div className="section-header">
          <div className="section-title">
            <span className="shadow-text">বিনোদন</span>
            <span className="main-text">বিনোদন</span>
            <span className="arrow">&rsaquo;</span>
          </div>
        </div>
      </ScrollLink>

      <div className="natioonal-area">
        <div className="row">
          <div className="col-md-5 border-right-inner2">
            <div className="lead-news">
              {state ? (
                <ScrollLink href={"/details/" + state.Slug + "/" + state.ContentID}>
                  <picture>
                    <Image
                      src={process.env.NEXT_PUBLIC_IMG_PATH + state.ImageBgPath}
                      priority
                      style={{ width: '100%', height: 'auto', position: "relative" }}
                      width={800}
                      height={450}
                      alt={state.DetailsHeading}
                      title={state.DetailsHeading}
                    />
                  </picture>
                  {(state.ShowVideo === 1 || state.VideoID !== null) && (
                    <span className="play-btn-big"><i className="fas fa-play"></i></span>
                  )}
                  <h3 className="Title">{state.DetailsHeading}</h3>
                  <div className="Brief">
                    <p>{state.ContentBrief}</p>
                  </div>
                </ScrollLink>
              ) : " "}
            </div>
          </div>

          <div className="col-md-7">
            <div className="row">
              <div className="col-md-6 border-right-inner2">
                <div className="CatListWrap1">
                  {state2.map(nc => (
                    <div className="Catlist" key={nc.ContentID}>
                      <ScrollLink href={"/details/" + nc.Slug + "/" + nc.ContentID}>
                        <div className="row">
                          <div className="col-md-7 col-7">
                            <picture>
                              <Image
                                src={process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageSmPath}
                                style={{ width: '100%', height: 'auto', position: "relative" }}
                                priority
                                width={120}
                                height={67}
                                alt={nc.DetailsHeading}
                                title={nc.DetailsHeading}
                              />
                            </picture>
                            {(nc.ShowVideo === 1 || nc.VideoID !== null) && (
                              <span className="play-btn"><i className="fas fa-play"></i></span>
                            )}
                          </div>
                          <div className="col-md-5 col-5">
                            <h3 className="Title">{nc.DetailsHeading}</h3>
                          </div>
                        </div>
                      </ScrollLink>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <div className="CatListWrap1">
                  {state3.map(nc => (
                    <div className="Catlist" key={nc.ContentID}>
                      <ScrollLink href={"/details/" + nc.Slug + "/" + nc.ContentID}>
                        <div className="row">
                          <div className="col-md-7 col-7">
                            <picture>
                              <Image
                                priority
                                src={process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageSmPath}
                                style={{ width: '100%', height: 'auto', position: "relative" }}
                                alt={nc.DetailsHeading}
                                title={nc.DetailsHeading}
                                width={120}
                                height={67}
                              />
                            </picture>
                            {(nc.ShowVideo === 1 || nc.VideoID !== null) && (
                              <span className="play-btn"><i className="fas fa-play"></i></span>
                            )}
                          </div>
                          <div className="col-md-5 col-5">
                            <h3 className="Title">{nc.DetailsHeading}</h3>
                          </div>
                        </div>
                      </ScrollLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Entertainment;
