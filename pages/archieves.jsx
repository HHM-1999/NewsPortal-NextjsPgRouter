import ArchiveClient from "../Components/Archive/ArchiveClient";
import getApi from "../lib/getApi";
import postApi from "../lib/postApi";
import Head from "next/head";

export default function ArchivePage({ initialData, initialCatList }) {

  return (
    <>
      <Head>
        <title>আর্কাইভ</title>
        <meta property="og:title" content="আর্কাইভ :: News Portal" />
        <meta property="og:description" content="আর্কাইভ :: News Portal" />
      </Head>
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-12 mt-3">
            <div className="CatTitle">
              <h1 className="text-center">আর্কাইভ</h1>
            </div>
          </div>
        </div>
        <ArchiveClient
          initialData={initialData || []}
          initialCatList={initialCatList || []}
        />
      </div>
    </>
  );
}

export function getStaticProps() {
  const formData = {
    limit: 12,
    offset: 0,
    start_date: "2020-01-01",
    end_date: new Date().toISOString(),
  };

  return getApi("category")
    .then((catRes) => {
      const initialCatList = catRes?.categories || [];
      return postApi("archive", formData).then((archiveRes) => {
        const initialData = archiveRes?.data || [];
        return {
          props: {
            initialData,
            initialCatList,
          },
          revalidate: 3600, // Rebuild every hour
        };
      });
    })
    .catch((err) => {
      console.error("Failed to load archive page:", err);
      return {
        props: {
          initialData: [],
          initialCatList: [],
        },
      };
    });
}
