import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navigation } from "../components/Navigation";
import Script from 'next/script';
import SpotifyPlayer from '@/components/SpotifyPlayer';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "A Tribute to my Genevieve",
  description: "A website for my girlfriend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://sdk.scdn.co/spotify-player.js" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="bg-white shadow-md">
          <div className="max-w-4xl mx-auto px-4">
            <Navigation />
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <div className="fixed bottom-4 left-4 z-10">
          <div className="relative">
            <p className="text-pink-500 text-sm mb-2 ml-4">
              Click play to hear my playlist for Gen
              <span className="inline-block ml-2 transform rotate-90">→</span>
            </p>
            <SpotifyPlayer />
          </div>
        </div>
      </body>
    </html>
  );
}
