"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";

export default function TestProtectedPage() {
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  
  const { data, isLoading, error: trpcError } = api.test.getProtectedData.useQuery(undefined, {
    retry: false,
  });

  useEffect(() => {
    if (trpcError) {
      console.error("Error fetching protected data:", trpcError);
      setError("Failed to fetch protected data. You might not be authenticated.");
    } else {
      setError(null);
    }
  }, [trpcError]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Protected Data Test</h1>
      
      <div className="mb-4 rounded bg-gray-100 p-4">
        <h2 className="mb-2 text-xl font-semibold">Authentication Status:</h2>
        {session ? (
          <p className="text-green-600">You are logged in as: {session.user?.name}</p>
        ) : (
          <p className="text-red-600">You are not logged in</p>
        )}
      </div>

      <div className="rounded bg-gray-100 p-4">
        <h2 className="mb-2 text-xl font-semibold">Protected Data:</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ?? trpcError ? (
          <div className="text-red-600">{error ?? "An error occurred while fetching protected data."}</div>
        ) : data ? (
          <div>
            <p className="mb-2">{data.message}</p>
            <p className="text-sm text-gray-500">Timestamp: {data.timestamp}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
} 