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
  title: "PitchPulse — AI Demo Day Pitch Auditor & Peer Review Network",
  description:
    "Audit your 3-minute pitch script, get multi-persona VC feedback, practice with real-time WPM pacing, and exchange peer critiques with cohort builders.",
  keywords: [
    "PitchPulse",
    "Demo Day",
    "Pitch Deck",
    "AI Pitch Auditor",
    "VC Feedback",
    "Cohort Peer Review",
    "Capstone Project 5",
    "Next.js",
    "Prisma",
  ],
  authors: [{ name: "Vanshika Bhatia", url: "https://github.com/vanshikavbhatia" }],
  openGraph: {
    title: "PitchPulse — AI Demo Day Pitch Auditor & Peer Review Network",
    description:
      "Audit your 3-minute pitch script, get multi-persona VC feedback, and exchange peer critiques with cohort builders.",
    url: "https://pitch-pulse-vanshika.vercel.app",
    siteName: "PitchPulse",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
