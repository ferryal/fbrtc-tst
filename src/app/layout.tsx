import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/lib/providers/query-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChristmasSnowWrapper } from "@/components/effects/christmas-snow-wrapper";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "ShopPro - Premium Products",
    template: "%s | ShopPro",
  },
  description:
    "Discover premium products at the best prices. Shop with confidence at ShopPro.",
  keywords: ["ecommerce", "products", "shopping", "deals"],
  authors: [{ name: "ShopPro Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ShopPro",
    title: "ShopPro - Premium Products",
    description: "Discover premium products at the best prices.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopPro - Premium Products",
    description: "Discover premium products at the best prices.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <ChristmasSnowWrapper />
        <QueryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
