import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { cn } from "@/lib/utils";

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
    <html lang="en" className={cn("h-full", ptSans.variable, "font-sans")}>
      <body className="min-h-full bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
