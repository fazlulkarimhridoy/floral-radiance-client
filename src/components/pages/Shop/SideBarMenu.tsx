"use client";

import { useCategory } from "@/context/CategoryContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface CategoryType {
    id: number;
    categoryId: number;
    name: string;
    description: string;
}

const SideBarMenu = ({isSuccess}: {isSuccess: any}) => {
    const { setCategoryName } = useCategory();

    // Fetch all categories from server
    const { data: allCategories = [] } = useQuery<CategoryType[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/all-category`
            );
            return res?.data?.data;
        },
        enabled: isSuccess,
        retry: 2,
        refetchOnWindowFocus: false,
    });

    const handleCategoryClick = (name: string) => {
        setCategoryName(name);
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleCategoryClick(event.target.value);
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="w-full md:w-[250px] hidden md:block">
                <ul className="flex flex-col font-roboto text-lg">
                    <li
                        onClick={() => handleCategoryClick("")}
                        className="sideBar-navLink"
                    >
                        All products
                    </li>
                    {allCategories?.length > 0 &&
                        allCategories?.map((item) => (
                            <li
                                onClick={() => handleCategoryClick(item?.name)}
                                key={item?.id}
                                className="sideBar-navLink"
                            >
                                {item?.name}
                            </li>
                        ))}
                </ul>
            </div>

            {/* Mobile Dropdown */}
            <div className="w-full md:w-[250px] block md:hidden rounded-xl border-2 bg-[#f4f4f4] p-2">
                <select
                    className="font-roboto text-base bg-[#f4f4f4] outline-none w-full"
                    onChange={handleSelectChange}
                >
                    <option value="">All products</option>
                    {allCategories?.length > 0 &&
                        allCategories?.map((item) => (
                            <option key={item?.id} value={item?.name}>
                                {item?.name}
                            </option>
                        ))}
                </select>
            </div>
        </>
    );
};

export default SideBarMenu;
