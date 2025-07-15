export default async function getApi(json) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${json}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`getApi error for ${json}:`, error.message);
    throw error; // rethrow for upper-level handling
  }
}
