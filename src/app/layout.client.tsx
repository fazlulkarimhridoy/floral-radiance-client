"use client";

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import TanstackProvider from "../../providers/TanstackProvider";
import { CartProvider } from "@/context/CartContext";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
    title: "Floral Radiance",
    description: "Designed and developed by Hridoy & Himel",
};

export default function LayoutClient({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();

    return (
        <div>
            {!pathname.startsWith("/admin") && (
                <>
                    <CartProvider>
                        <TanstackProvider>
                            <div>
                                <Navbar />
                                <div>{children}</div>
                                <Footer />
                            </div>
                        </TanstackProvider>
                    </CartProvider>
                </>
            )}
            {pathname.startsWith("/admin") && (
                <>
                    <TanstackProvider>
                        <div>{children}</div>
                    </TanstackProvider>
                </>
            )}
        </div>
    );
}
