import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish, Pinyon_Script } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title:
    "Anxiety, Trauma & Burnout Therapy in Santa Monica, CA | Dr. Maya Reynolds, PsyD",
  description:
    "Licensed clinical psychologist in Santa Monica offering therapy for anxiety, panic, trauma, and burnout. In-person and telehealth across California.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${mulish.variable} ${pinyon.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}