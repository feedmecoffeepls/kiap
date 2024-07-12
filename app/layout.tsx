import type { Metadata } from "next";
import { Barlow, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import TopMenu from "@/components/topMenu";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import ClientProviders from "./clientProviders";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });
const barlow = Barlow({ weight: ["700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kiap",
  description: "Get your next discount on Kiap",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProviders>
      <ClerkProvider>
        <html lang="en">
          <link
            rel="icon"
            href="/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <body className={barlow.className + " " + inter.className}>
            <div className="px-4 md:px-12 lg:px-16 xl:px-24">
              <TopMenu />
              <Toaster />
              {children}
            </div>
          </body>
        </html>
      </ClerkProvider>
    </ClientProviders>
  );
}
