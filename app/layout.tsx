import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";

const ptSans = PT_Sans({
  subsets: ["latin"],
  variable: "--font-pt-sans",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Intergamma",
  description: "Assessment",
  icons: {
    icon: "/favicon-16x16.png",
    shortcut: "/favicon-16x16.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${ptSans.variable}`}>
      <body className="min-h-full bg-white">{children}</body>
    </html>
  );
}
