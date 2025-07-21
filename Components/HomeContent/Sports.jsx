"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import getApi from '../../lib/getApi';
import Ads from '../../pages/assets/media/advertisement/16871071593959862980.gif';
import ScrollLink from '../../utils/ScrollLink';


const Sports = () => {
  const [state, setState] = useState(null);
  const [state2, setState2] = useState([]);

  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 100))
      .then(() => getApi('home-json-bn/generateCategory9.json'))
      .then((list) => {
        setState(list[0]);
        setState2(list.slice(1, 5));

      })


  }, []);
  if (!state) return null;


  return (
    <div className='container'>
      <ScrollLink href={"/sports"}>
        <div className="section-header">
          <div className="section-title">
            <span className="shadow-text">খেলাধুলা</span>
            <span className="main-text">খেলাধুলা</span>
            <span className="arrow">&rsaquo;</span>
          </div>
        </div>
      </ScrollLink>

      <div className="natioonal-area">
        <div className="row">
          <div className="col-md-5 border-right-inner2">
            <div className="lead-news">
              {state && (
                <ScrollLink href={`/details/${state.Slug}/${state.ContentID}`}>
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
              )}
            </div>
          </div>

          <div className="col-md-7">
            <div className="row">
              {[state2].map((group, idx) => (
                <div className={`col-md-6 ${idx === 0 ? 'border-right-inner2' : ''}`} key={idx}>
                  <div className="CatListWrap1">
                    {group.map((nc) => (
                      <div className="Catlist" key={nc.ContentID}>
                        <ScrollLink href={`/details/${nc.Slug}/${nc.ContentID}`}>
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
                        </ScrollLink>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="col-md-6">
                <div className="Advertisement">
                  <Image src={Ads} unoptimized priority />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sports;
