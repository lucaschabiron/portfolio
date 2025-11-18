import "./globals.css";
import { Navbar } from "@/components/global/nav";
import FixedLogo from "@/components/global/FixedLogo";
import Footer from "@/components/global/Footer";
import Head from "next/head";
import { ThemeProvider } from "@/components/global/ThemeProvider";
import Script from "next/script";

export const metadata = {
  title: "lucas chabiron",
  description: "lucas , software engineer",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="font-sans" suppressHydrationWarning>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="87353d6e-d6cf-425e-9192-9e418ae16dc8"
      />
      <body className="bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <FixedLogo />
            <div className="flex justify-center container mx-auto p-4">
              <Navbar />
            </div>
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
