"use client";

import AllProducts from "@/components/pages/Shop/AllProducts";
import ButtonGroup from "@/components/pages/Shop/ScrollBarSlider";
import Search from "@/components/pages/Shop/Search";
import SideBarMenu from "@/components/pages/Shop/SideBarMenu";
import { useState } from "react";

const Page = () => {
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSuccess = (success: boolean) => {
        setIsSuccess(success);
    };

    return (
        <div className="flex flex-col-reverse  lg:flex-row  gap-4 max-w-[1440px] mx-auto px-2 no-scrollbar">
            <div className="hidden lg:block border-r-2 ">
                <SideBarMenu isSuccess={isSuccess}></SideBarMenu>
            </div>
            <div
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                className="space-y-4 flex flex-col overflow-scroll pb-5"
            >
                <div className="flex flex-col">
                    <Search></Search>
                </div>
                <div className="lg:hidden ">
                    <SideBarMenu isSuccess={isSuccess}></SideBarMenu>
                </div>
                <div className="bg-[#f4f4f4] rounded-2xl">
                    <AllProducts handleSuccess={handleSuccess} />
                </div>
            </div>
        </div>
    );
};

export default Page;
