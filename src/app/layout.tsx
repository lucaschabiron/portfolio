import "./globals.css";
import { Navbar } from "@/components/global/nav";
import FixedLogo from "@/components/global/FixedLogo";
import Head from "next/head";

export const metadata = {
  title: "lucas chabiron",
  description: "lucas , software engineer",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="font-sans">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <body className="min-h-screen from-neutral-50 to-neutral-400 text-neutral-900 bg-gradient-to-br dark:from-neutral-800 dark:to-neutral-900 dark:text-neutral-100">
        <FixedLogo />
        <div className="flex justify-center container mx-auto p-4">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
