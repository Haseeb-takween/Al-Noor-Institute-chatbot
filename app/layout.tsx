import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat/ChatWidget";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al-Noor Institute — Online Islamic Education, taught with care",
  description:
    "Al-Noor Institute is a UK-based online Islamic education provider. Learn Quran & Tajweed, Arabic, Islamic Studies, Seerah and Hifz with qualified, Ijazah-holding teachers. Free trial class available.",
  keywords: [
    "Islamic education",
    "online Quran classes",
    "Tajweed",
    "Arabic language",
    "Hifz",
    "Seerah",
    "UK Islamic institute",
  ],
  openGraph: {
    title: "Al-Noor Institute — Online Islamic Education",
    description:
      "Learn Quran, Arabic, Islamic Studies, Seerah and Hifz online with qualified teachers. Book a free trial class.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} antialiased`}
    >
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
