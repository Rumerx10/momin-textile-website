import Navbar from "@/components/HeaderNavigation/Navbar";
import "@/app/globals.css";
import QueryClientWrapper from "@/api/QueryClientWrapper";
import GloballyAvailable from "@/components/GloballyAvailable";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <QueryClientWrapper>{children}</QueryClientWrapper>
      <GloballyAvailable />
      <Footer />
    </div>
  );
}
