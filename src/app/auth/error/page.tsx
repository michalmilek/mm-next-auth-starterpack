import Link from "next/link";

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams.error ?? "An error occurred during authentication";

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Authentication Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Link
          href="/auth/login"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
} 