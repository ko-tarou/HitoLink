import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/LenisProvider";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "INDIGO Novel STANDARD | Select Shop in Toyama, Japan",
  description:
    "New value become the STANDARD. A lifestyle proposal shop in Kakeo, Toyama. Men's, Women's, Kids', and Goods. Standard California, Remi Relief, Sassafras, and more.",
  openGraph: {
    title: "INDIGO Novel STANDARD",
    description: "A select shop based in Kakeo, Toyama. Dealing with Men's, Women's, Kids', and Goods.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased font-sans`}
      >
        <LenisProvider>
          <Header />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
