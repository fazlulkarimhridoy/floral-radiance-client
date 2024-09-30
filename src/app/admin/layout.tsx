"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
    FaClipboardList,
    FaHome,
    FaListUl,
    FaPlus,
    FaRegPlusSquare,
    FaShoppingCart,
    FaSignOutAlt,
    FaUserFriends,
} from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import "@/styles/adminlayout.css";
import { usePathname } from "next/navigation";
import { TbCategoryPlus } from "react-icons/tb";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();

    const links = (
        <>
            <li>
                <Link
                    href="/admin/dashboard"
                    className={pathname === "/admin/dashboard" ? "active" : ""}
                >
                    <RxDashboard />
                    Dashboard
                </Link>
            </li>

            <li>
                <Link
                    href="/admin/orders"
                    className={pathname === "/admin/orders" ? "active" : ""}
                >
                    <FaShoppingCart />
                    Orders
                </Link>
            </li>
            <li>
                <Link
                    href="/admin/customers"
                    className={pathname === "/admin/customers" ? "active" : ""}
                >
                    <FaUserFriends />
                    Customers
                </Link>
            </li>
            <li>
                <Link
                    href="/admin/products"
                    className={pathname === "/admin/products" ? "active" : ""}
                >
                    <FaClipboardList />
                    Products
                </Link>
            </li>
            <li>
                <Link
                    href="/admin/categories"
                    className={pathname === "/admin/categories" ? "active" : ""}
                >
                    <FaListUl />
                    Categories
                </Link>
            </li>
            <li>
                <Link
                    href="/admin/addProduct"
                    className={pathname === "/admin/addProduct" ? "active" : ""}
                >
                    <FaRegPlusSquare />
                    Add Product
                </Link>
            </li>
            <li>
                <Link
                    href="/admin/addCategory"
                    className={
                        pathname === "/admin/addCategory" ? "active" : ""
                    }
                >
                    <TbCategoryPlus />
                    Add Category
                </Link>
            </li>
            <li>
                <Link href="/">
                    <FaHome />
                    Home
                </Link>
            </li>
        </>
    );

    const linksForMobile = (
        <>
            <li>
                <Link
                    href="/admin/dashboard"
                    className={pathname === "/admin/dashboard" ? "active" : ""}
                >
                    <RxDashboard />
                </Link>
            </li>

            <li>
                <Link
                    href="/admin/orders"
                    className={pathname === "/admin/orders" ? "active" : ""}
                >
                    <FaShoppingCart />
                </Link>
            </li>
            <li>
                <Link
                    href="/admin/customers"
                    className={pathname === "/admin/customers" ? "active" : ""}
                >
                    <FaUserFriends />
                </Link>
            </li>
            <li>
                <Link
                    href="/admin/products"
                    className={pathname === "/admin/products" ? "active" : ""}
                >
                    <FaClipboardList />
                </Link>
            </li>
            <li>
                <Link
                    href="/admin/categories"
                    className={pathname === "/admin/categories" ? "active" : ""}
                >
                    <FaListUl />
                </Link>
            </li>
            <li>
                <Link
                    href="/admin/addProduct"
                    className={pathname === "/admin/addProduct" ? "active" : ""}
                >
                    <FaRegPlusSquare />
                </Link>
            </li>
            <li>
                <Link
                    href="/admin/addCategory"
                    className={
                        pathname === "/admin/addCategory" ? "active" : ""
                    }
                >
                    <TbCategoryPlus />
                </Link>
            </li>
            <li>
                <Link href="/">
                    <FaHome />
                </Link>
            </li>
        </>
    );
    return (
        <div className="relative">
            <div className="flex relative">
                {/* dashboard sidebar */}
                <div className="hidden lg:flex">
                    <div className="h-screen p-3 space-y-2 w-60 bg-blue-200 text-gray-800 sticky top-0">
                        <div className="flex items-center p-2 space-x-4">
                            <Image
                                width={500}
                                height={500}
                                src="https://res.cloudinary.com/dmit5qbfo/image/upload/v1717146701/9_zq39kj.jpg"
                                alt="user_photo"
                                className="w-12 h-12 rounded-full bg-gray-500"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Floral Radiance
                                </h2>
                                <span className="flex items-center space-x-1">
                                    <Link
                                        href="/admin/dashboard"
                                        className="text-xs hover:underline text-gray-600"
                                    >
                                        View profile
                                    </Link>
                                </span>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-300">
                            <ul
                                id="link1"
                                className="menu menu-vertical text-[16px] px-1 gap-2 text-gray-500"
                            >
                                {links}
                            </ul>
                            <ul className="pt-4 pb-2 space-y-1 text-sm">
                                <li>
                                    <button
                                        rel="noopener noreferrer"
                                        className="flex items-center p-2 space-x-3 rounded-md"
                                    >
                                        <FaSignOutAlt></FaSignOutAlt>
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* dashboard content */}
                <div
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    className="flex-1 flex-nowrap overflow-x-scroll scroll-smooth h-screen bg-blue-50 p-2 md:p-8 lg:p-12 pb-28 md:pb-28 lg:mb-0"
                >
                    {children}
                </div>
            </div>
            {/* for medium devices */}
            <div className="hidden md:flex md:justify-center lg:hidden w-full fixed bottom-0 bg-blue-200">
                <ul
                    id="link1"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    className="flex flex-row flex-nowrap overflow-x-scroll scroll-smooth menu menu-horizontal px-1 gap-1 text-gray-500"
                >
                    {links}
                </ul>
            </div>
            {/* for small devices */}
            <div className="flex justify-center md:hidden w-full fixed bottom-0 bg-blue-200">
                <ul
                    id="link1"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    className="flex flex-row flex-nowrap overflow-x-scroll scroll-smooth menu menu-horizontal text-[22px] px-1 gap-2 text-gray-500 whitespace-nowrap"
                >
                    {linksForMobile}
                </ul>
            </div>
        </div>
    );
};

export default AdminLayout;
