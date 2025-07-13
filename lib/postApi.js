export default function postApi(apiRoute, submitData) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiRoute}`, {
      method: 'POST',
      body: JSON.stringify(submitData),
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // cache for 60 seconds
    }).then((res) => res.json());
  }
  