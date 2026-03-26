"use client";

import { useState } from "react";

export default function Home() {
  const [setNum, setSetNum] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!setNum) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`http://127.0.0.1:8000/sets/${setNum}`);
      if (!res.ok) throw new Error("Set not found");

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-6">BrickAlpha</h1>

      {/* Search */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter set number (e.g. 75192-1)"
          value={setNum}
          onChange={(e) => setSetNum(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Result */}
      {data && (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-2">{data.name}</h2>

          {data.set_img_url && (
            <img
              src={data.set_img_url}
              alt={data.name}
              className="w-64 mx-auto mb-4"
            />
          )}

          <p>Set Number: {data.set_num}</p>
          <p>Year: {data.year}</p>
          <p>Pieces: {data.num_parts}</p>
        </div>
      )}
    </main>
  );
}