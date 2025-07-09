import React from 'react'
import getApi from '../../../lib/getApi';
import Link from 'next/link';

async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let LeadData = [];
const SpecialLead = async () => {
    await delay(3000); 
    const list = await getApi('home-json-bn/generateSpecialTopOne.json');
    LeadData = list.slice(0, 4);
    return (
        <div className="container">
            <div className="row">
                {LeadData.map((nc, i) => {
                    return (
                        <div className="col-lg-3" key={i}>
                            <div className="card-content">
                                <h4 className="title">
                                    <Link href={"/details/" + nc.categorySlug + "/" + nc.ContentID}>{nc.DetailsHeading}</Link></h4>
                                <p className="intro">{nc.ContentBrief}</p>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>

    )
}

export default SpecialLead