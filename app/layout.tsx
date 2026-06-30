import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SweetLar Moçambique",
    template: "%s | SweetLar Moçambique",
  },
  description: "Móveis sob medida, sofás, camas e decoração em Moçambique.",
  keywords: ["móveis", "sofás", "camas", "SweetLar", "Moçambique"],
  metadataBase: new URL("https://sweetlar.co.mz"),
  openGraph: {
    title: "SweetLar Moçambique",
    description: "Móveis sob medida, sofás, camas e decoração em Moçambique.",
    type: "website",
    locale: "pt_MZ",
    siteName: "SweetLar Moçambique",
  },
  twitter: {
    card: "summary_large_image",
    title: "SweetLar Moçambique",
    description: "Móveis sob medida, sofás, camas e decoração em Moçambique.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-zinc-900">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
