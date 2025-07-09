// app/error.jsx
"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center my-10 mt-5">
      <h1 className="font-bold text-red-600">400 - একটি ত্রুটি ঘটেছে</h1>
      <p className="mt-4 pb-3">কিছু ভুল হয়েছে। পরে আবার চেষ্টা করুন।</p>
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
       <Link href='/' className="text-white"> আবার চেষ্টা করুন</Link>
      </button>
    </div>
  );
}
