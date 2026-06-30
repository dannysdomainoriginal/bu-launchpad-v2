import type { Metadata } from "next";
import { Manrope, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

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
  openGraph: {
    title: "BU Launchpad - Share Your Creations, Discover New Launches",
    description:
      "Built by students.\nPowered by ideas.\nShowcase your projects, discover what others are building, turn your innovation into something visible.",
    images: [
      {
        url: "https://bu-launchpad.vercel.app/og/image.png",
        width: 1639,
        height: 858
      }
    ]
  },
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
        <body className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
