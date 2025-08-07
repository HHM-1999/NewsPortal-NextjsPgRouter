import React from 'react'
import getApi from '../../../lib/getApi';
import Link from 'next/link';
import Image from 'next/image';

const limit = 3;

export async function getServerSideProps(context) {
    try {
        const { divisionSlug } = context.params;
        const Division = await getApi(`division-district-contents/${divisionSlug}/${limit}`)
        const DivisionName = Division.divisionNameBn
        const DistrictList = Division.data

        // console.log(DistrictList);

        return {
            props: {
                DistrictList, DivisionName, divisionSlug
            },
        };
    } catch (error) {
        console.error("Division page server error:", error);
        return { notFound: true };
    }
}

const DivisionSlug = ({ DivisionName, DistrictList, divisionSlug }) => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-10 m-auto">
                    <div className="CatTitle mt-3">
                        <h1 className="text-center">{DivisionName}</h1>
                    </div>
                    <div className="row">
                        {DistrictList.map((nc, i) => {

                            return (
                                <div className="col-md-4 mt-3" key={i}>
                                    <Link href={`/divisions/${divisionSlug}/${nc.districtSlug}`}>
                                        <div className="districtNames">
                                            <h2>{nc.districtNameBn}</h2>
                                        </div>
                                    </Link>
                                    {nc.districtContents.slice(0,1).map((nc) => {
                                        return (
                                            <div className="DisitrictContent">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageSmPath}`}
                                                    className="card-img-top img-fluid"
                                                    alt={nc.DetailsHeading}
                                                    title={nc.DetailsHeading}
                                                    width={400}
                                                    height={500}
                                                />
                                                <h3>{nc.DetailsHeading}</h3>
                                            </div>


                                        )
                                    })}
                                     {nc.districtContents.slice(1,3).map((nc) => {
                                        return (
                                            <div className="DisitrictContent2">
                                                <h3>{nc.DetailsHeading}</h3>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DivisionSlug