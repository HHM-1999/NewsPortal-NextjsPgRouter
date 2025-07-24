export default async function postApi(apiRoute, submitData) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiRoute}`, {
      method: 'POST',
      body: JSON.stringify(submitData),
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to POST: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`postApi error for ${apiRoute}:`, error.message);
    throw error;
  }
}