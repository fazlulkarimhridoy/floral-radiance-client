"use client";

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import TanstackProvider from "../../providers/TanstackProvider";
import { usePathname } from "next/navigation";
import CategoryProvider from "@/context/CategoryContext";

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
                    <CategoryProvider>
                        <TanstackProvider>
                            <div>
                                <Navbar />
                                <div>{children}</div>
                                <Footer />
                            </div>
                        </TanstackProvider>
                    </CategoryProvider>
                </>
            )}
            {pathname.startsWith("/admin") && (
                <>
                    <CategoryProvider>
                        <TanstackProvider>
                            <div>{children}</div>
                        </TanstackProvider>
                    </CategoryProvider>
                </>
            )}
        </div>
    );
}
