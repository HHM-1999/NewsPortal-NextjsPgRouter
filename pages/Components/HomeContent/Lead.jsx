"use client";

import React, { useEffect, useState } from 'react';
import getApi from '../../../lib/getApi';
import Link from 'next/link';
import Image from 'next/image';
import Ads from '../../assets/media/advertisement/13982910857184178936.gif';

const Lead = () => {
  const [leadData, setLeadData] = useState(null);
  const [leadData2, setLeadData2] = useState([]);

  useEffect(() => {
    new Promise(resolve => setTimeout(resolve, 100))
      .then(() => getApi('home-json-bn/generateLead.json'))
      .then((list) => {
        setLeadData(list[0]);
        setLeadData2(list.slice(1, 4));
      });
  }, []);

  // If data isn't ready, render nothing (like suspense fallback=null)
  if (!leadData) return null;

  return (
    <div className='Lead-AreaSection'>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div className="row">
              <div className="col-md-7">
                <div className="DTopNews">
                  <Link href={`/details/${leadData.categorySlug}/${leadData.ContentID}`}>
                    <div className="DImageResize">
                      <Image
                        src={process.env.NEXT_PUBLIC_IMG_PATH + leadData.ImageBgPath}
                        alt={leadData.DetailsHeading}
                        title={leadData.DetailsHeading}
                        priority
                        style={{ width: '100%', height: 'auto', position: 'relative' }}
                        width={800}
                        height={450}
                      />
                    </div>
                    <div className="caption">
                      <h3>{leadData.DetailsHeading}</h3>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="col-md-5">
                <div className="CatListWrap">
                  {leadData2.map((nc) => (
                    <div className="Catlist" key={nc.ContentID}>
                      <Link href={`/details/${nc.categorySlug}/${nc.ContentID}`}>
                        <div className="row">
                          <div className="col-md-5 col-5">
                            <picture>
                              <Image
                                src={process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageSmPath}
                                alt={nc.DetailsHeading}
                                title={nc.DetailsHeading}
                                style={{ width: '100%', height: 'auto', position: 'relative' }}
                                priority
                                width={120}
                                height={67}
                              />
                            </picture>
                          </div>
                          <div className="col-md-7 col-7">
                            <h3 className="Title">{nc.DetailsHeading}</h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="Advertisement">
              <Image src={Ads} alt="Radhuni" title="radhuni" unoptimized priority />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lead;
