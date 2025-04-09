import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { AuthStatus } from "@/app/_components/AuthStatus";
import { Providers } from "@/app/_components/Providers";

export const metadata: Metadata = {
  title: "MM AUTH DEMO",
  description: "MM AUTH DEMO",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <Providers>
            <div className="min-h-screen">
              <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
                  <div className="text-xl font-bold">MM AUTH DEMO</div>
                  <AuthStatus />
                </div>
              </header>
              <main className="mx-auto max-w-7xl p-4">{children}</main>
            </div>
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
