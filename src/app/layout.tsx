import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import TanstackProvider from "../../providers/TanstackProvider";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Floral Radiance",
  description: "Desgined and developed by Hridoy & Himel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="scroll-container">
        <CartProvider>
          <TanstackProvider>
            <div>
              <Navbar />
              <div>{children}</div>
              <Footer />
            </div>
          </TanstackProvider>
        </CartProvider>
      </body>
    </html>
  );
}
