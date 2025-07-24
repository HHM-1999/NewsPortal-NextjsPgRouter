"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import getApi from '../../lib/getApi';
import Ads from '../../pages/assets/media/advertisement/13982910857184178936.gif';
// import Link from '../../utils/Link';
import Link from 'next/link'
const International = () => {
  const [state, setState] = useState(null);
  const [state2, setState2] = useState([]);

  useEffect(() => {
    new Promise(resolve => setTimeout(resolve, 100))
      .then(() => getApi('home-json-bn/generateCategory6.json'))
      .then((list) => {
        setState(list[0]);
        setState2(list.slice(1, 5));
        // setState3(list.slice(5, 8));
      })
  }, []);
  if (!state) return null;

  return (
    <div className='container'>
      <Link href={"/international"}>
        <div className="section-header">
          <div className="section-title">
            <span className="shadow-text">আন্তর্জাতিক</span>
            <span className="main-text">আন্তর্জাতিক</span>
            <span className="arrow">&rsaquo;</span>
          </div>
        </div>
      </Link>

      <div className="natioonal-area">
        <div className="row">
          <div className="col-md-5 border-right-inner2">
            <div className="lead-news">
              {state && (
                <Link href={`/details/${state.Slug}/${state.ContentID}`}>
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
                </Link>
              )}
            </div>
          </div>

          <div className="col-md-7">
            <div className="row">
              <div className="col-md-6 border-right-inner2">
                <div className="CatListWrap1">
                  {state2.map((nc) => (
                    <div className="Catlist" key={nc.ContentID}>
                      <Link href={`/details/${nc.Slug}/${nc.ContentID}`}>
                        <div className="row">
                          <div className="col-md-7 col-7">
                            <h3 className="Title">{nc.DetailsHeading}</h3>
                          </div>
                          <div className="col-md-5 col-5">
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
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-6">
                <div className="Advertisement">
                  <Image priority src={Ads} alt="Radhuni" title="radhuni" unoptimized />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default International;
