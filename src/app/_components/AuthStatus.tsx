"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function AuthStatus() {
  const { data: session, status } = useSession();
  
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";

  if (isUnauthenticated) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/auth/login" className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-500">Sign in</Link>
        <Link href="/auth/register" className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200">Register</Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      {isLoading ? (
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
      ) : isAuthenticated ? (
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">
              {session.user?.name ?? session.user?.email}
            </span>
            <span className="text-xs text-gray-500">Signed in</span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-500"
          >
            Sign in
          </Link>
          <Link
            href="/auth/register"
            className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
} 