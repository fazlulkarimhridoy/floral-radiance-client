"use client";

import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Drawer } from "antd";
import Link from "next/link";

interface CartItem {
    id: number;
    product_name: string;
    images: string;
    price: number;
}

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const [open, setOpen] = useState(false);
    const [cartData, setCartData] = useState<CartItem[]>([]);

    // Retrieve cart data from localStorage when the component mounts
    useEffect(() => {
        const storedCart = localStorage.getItem("cartItem");
        if (storedCart) {
            setCartData(JSON.parse(storedCart));
        }
    }, []);


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", changeBackground);
        return () => {
            window.removeEventListener("scroll", changeBackground);
        };
    }, []);

    const changeBackground = () => {
        if (window.scrollY >= 120) {
            setShowNavbar(true);
        } else {
            setShowNavbar(false);
        }
    };

    return (
        <motion.div
            className={
                showNavbar
                    ? "bg-[#37a3f5] sticky top-0 z-50 ease-in duration-200 animate-appear shadow-[0_0_60px_-0_rgba(0,0,0,0.3)]"
                    : "bg-transparent shadow-[0_0_60px_-0_rgba(0,0,0,0.3)"
            }
        >
            <div className="flex items-center justify-between px-2 md:px-2 py-2 font-semibold">
                <Link href="/">
                    <div className="flex items-center">
                        <Image
                            width={120}
                            height={120}
                            src="/Images/logo.png"
                            alt="logo"
                            className="bg-none w-[80px]"
                        />
                        <p className="dancing-style text-lg md:text-xl -ml-4 md:-ml-6">
                            Floral Radiance
                        </p>
                    </div>
                </Link>
                <div className="mr-10 hidden lg:block">
                    <ul className="flex text-lg gap-4 font-poppins">
                        <li className="hover:text-pink-600 cursor-pointer transition-colors">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="hover:text-pink-600 cursor-pointer transition-colors">
                            <Link href="/products">Shop</Link>
                        </li>
                        <li className="hover:text-pink-600 cursor-pointer transition-colors">
                            <Link href="/aboutUs">About Us</Link>
                        </li>
                    </ul>
                </div>

                <div className="flex gap-6 ">
                    <Link className="relative" href={"/cart"}>
                        <button>
                            <ShoppingCartOutlined className="text-3xl font-bold hover:text-pink-600 transition-colors mr-8" />
                        </button>
                        <p className="absolute -top-3 left-4 bg-pink-600 rounded-full w-5 text-center  text-white">
                            {cartData?.length}
                        </p>
                    </Link>

                    {/* Hamburger menu */}
                    <div className="lg:hidden block">
                        <MenuOutlined onClick={showDrawer} />
                        <Drawer
                            width={240}
                            title=""
                            onClose={onClose}
                            open={open}
                        >
                            <ul className="text-lg space-y-2 font-poppins font-medium">
                                <li className="hover:text-pink-600 cursor-pointer transition-colors">
                                    <Link href="/">Home</Link>
                                </li>

                                <li className="hover:text-pink-600 cursor-pointer transition-colors">
                                    <Link href="/products">Shop</Link>
                                </li>

                                <li className="hover:text-pink-600 cursor-pointer transition-colors">
                                    <Link href="/aboutUs">About Us</Link>
                                </li>
                                <li className="hover:text-pink-600 cursor-pointer transition-colors">
                                    Contact Us
                                </li>
                            </ul>
                        </Drawer>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;
