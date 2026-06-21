import type { Metadata } from "next";
import { Manrope, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BU Launchpad - Share Your Creations, Discover New Launches",
  description:
    "Built by students.\nPowered by ideas.\nShowcase your projects, discover what others are building, turn your innovation into something visible.",
  keywords: [
    "student projects",
    "Babcock University",
    "launchpad",
    "bu launchpad",
    "bu creators",
    "bu innovation",
    "bu showcase",
    "bu discover",
  ],
  authors: [{ name: "Dannys Domain" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${manrope.variable} ${instrumentSans.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
