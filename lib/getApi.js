export default function getApi(json) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${json}`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  }).then((res) => res.json());
}
