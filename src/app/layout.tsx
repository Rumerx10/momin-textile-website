import type { Metadata } from "next";
import "./globals.css";
import { Sarabun, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/HeaderNavigation/Navbar";

const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["400", "700"], // adjust weights as needed
  variable: "--font-sarabun",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Momin Textile Mills | Home",
  description: "Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sarabun.variable} ${inter.variable} antialiased `}>
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
