import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";
import Header from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MonadChad",
  description: "Voting dApp on Monad Testnet",
  creator: "Kurays",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-monad `}>
        <Providers>
          <main className="max-w-7xl customSm:m-4 lg:mx-auto lg:px-8 ">
            <Header />
            {children}
            <Toaster />
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
