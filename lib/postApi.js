export default async function postApi(apiRoute, submitData) {
  try {
    const formBody = new URLSearchParams();

    for (const key in submitData) {
      formBody.append(key, submitData[key]);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiRoute}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody.toString(),
      next: { revalidate: 60 },
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
