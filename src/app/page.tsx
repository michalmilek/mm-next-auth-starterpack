import { redirect } from "next/navigation";

import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            MM AUTH DEMO
          </h1>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session ? <span>Logged in as {session.user?.name}</span> : <span>Not logged in</span>}
              </p>
              <a 
                href="/test-protected" 
                className="mt-4 rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
              >
                Test Protected Route
              </a>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
