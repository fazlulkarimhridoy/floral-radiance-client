import type { Metadata } from "next";
import "./globals.css";
import CategoryProvider from "@/context/CategoryContext";
import TanstackProvider from "../../providers/TanstackProvider";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";

export const metadata: Metadata = {
    title: "Floral Radiance",
    description: "Designed and developed by Hridoy & Himel",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-theme="light">
            <body className="scroll-container">
                <CategoryProvider>
                    <TanstackProvider>
                        <div>
                            <Navbar />
                            <div>{children}</div>
                            <Footer />
                        </div>
                    </TanstackProvider>
                </CategoryProvider>
            </body>
        </html>
    );
}
