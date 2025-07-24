"use client";

import React, { useEffect, useState } from 'react';
import getApi from "../../lib/getApi";
import Link from 'next/link';

const SpecialLead = () => {
  const [leadData, setLeadData] = useState([]);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve) => setTimeout(resolve, 100))
      .then(() => getApi('home-json-bn/generateSpecialTopOne.json'))
      .then((list) => {
        setLeadData(list.slice(0, 4));
      })

  }, []);


  if (!leadData) return null;
  return (
    <div className="container">
      <div className="row">
        {leadData.map((nc, i) => (
          <div className="col-lg-3" key={i}>
            <div className="card-content">
              <h4 className="title">
                <Link href={`/details/${nc.categorySlug}/${nc.ContentID}`}>
                  {nc.DetailsHeading}
                </Link>
              </h4>
              <p className="intro">{nc.ContentBrief}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialLead;
