"use client";

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import TanstackProvider from "../../providers/TanstackProvider";
import { usePathname } from "next/navigation";
import CategoryProvider from "@/context/CategoryContext";
import SearchTextProvider from "@/context/SearchTextContext";
import NewFooter from "@/components/pages/Home/NewFooter";


export const metadata: Metadata = {
  title: "Floral Radiance",
  description: "Designed and developed by Himel & Hridoy",
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
            <SearchTextProvider>
                  <TanstackProvider>
                    <div>
                      {pathname.startsWith("/login") ? <></> : <Navbar />}
                      <div>{children}</div>
                      {pathname.startsWith("/login") ? <></> : <NewFooter />}
                    </div>
                  </TanstackProvider>
            </SearchTextProvider>
              </CategoryProvider>
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
