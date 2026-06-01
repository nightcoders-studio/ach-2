import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KeudeKu | Real-Time F&B Platform for UMKM",
  description:
    "An end-to-end digital operations system for Indonesian F&B businesses, facilitating Smart Table QR Menus, POS cashiers, order tracking, and real-time dashboard analytics.",
  keywords: ["F&B Management", "UMKM Indonesia", "QR Menu", "Cloud POS", "Real-Time Kitchen Dashboard"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`} style={{ colorScheme: "dark" }}>
      <body className="min-h-full flex flex-col bg-espresso-950 text-espresso-50 selection:bg-accent-gold selection:text-espresso-950">
        {children}
      </body>
    </html>
  );
}
