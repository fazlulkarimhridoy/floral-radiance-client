"use client";

import { ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <div className={showNavbar ? "bg-pink-400 sticky top-0 z-50" : "bg-transparent"}>
      <div className="flex items-center justify-between px-8 py-0 font-semibold">
        <div className="flex items-center">
          <Image
            width={120}
            height={120}
            src="/Images/logo.png"
            alt="logo"
            className="bg-none"
          />
          <p className="dancing-style text-xl -ml-6">Floral Radiance</p>
        </div>

        <div className="mr-10">
          <ul className="flex text-lg gap-4">
            <li className="hover:text-pink-600 cursor-pointer transition-colors">
              Home
            </li>
            <li className="hover:text-pink-600 cursor-pointer transition-colors">
              Shop
            </li>
            <li className="hover:text-pink-600 cursor-pointer transition-colors">
              Pages
            </li>
            <li className="hover:text-pink-600 cursor-pointer transition-colors">
              About Us
            </li>
            <li className="hover:text-pink-600 cursor-pointer transition-colors">
              Contact Us
            </li>
          </ul>
        </div>

        <div>
          <button>
            <ShoppingCartOutlined className="text-2xl font-bold hover:text-pink-600 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
