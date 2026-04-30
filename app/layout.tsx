import type { Metadata } from "next";
import { Manrope, Sacramento } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sacramento",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. med. Victoria Falkenberg — Fachärztin für Gynäkologie & Geburtshilfe",
  description:
    "Dr. med. Victoria Falkenberg — Fachärztin für Gynäkologie und Geburtshilfe. Aufklärung rund um Frauengesundheit, Intimgesundheit und das vaginale Mikrobiom.",
  metadataBase: new URL("https://www.victoriafalkenberg.de"),
  icons: {
    icon: [
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${manrope.variable} ${sacramento.variable}`}>
      <body
        style={{
          fontFamily: "var(--font-manrope), -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
