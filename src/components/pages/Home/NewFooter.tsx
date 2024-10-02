import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const NewFooter = () => {
  return (
    <div className="pb-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 md:w-[90%] lg:w-[70%] mx-auto  gap-4">
        <div className=" row-span-2 bg-white rounded-xl">
          <p className="playfair text-[#184363] font-bold text-4xl p-4">
            Crafted with love, delivered with care.
          </p>
          <div className="flex items-center">
            <Image
              src={"/Images/logo.png"}
              alt="logo"
              width={100}
              height={100}
            />
            <p className="font-outfit text-[#184363] text-xl font-bold">
              Floral radiance
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 space-y-5">
          <p className="playfair text-[#184363] font-bold text-4xl">
            Contact us
          </p>
          <p className="font-outfit text-[#184363] font-semibold text-lg ">info@floralradiancebd.com</p>
          <p className="font-outfit text-[#184363] font-semibold text-lg ">Phone: 01304-035398</p>
        </div>

        <div className="bg-white rounded-xl h-auto row-span-2 flex flex-col gap-4 items-center p-4">
          <h1 className="playfair text-[#184363] font-bold text-4xl ">
            Social
          </h1>
          <ul className="flex flex-col gap-4">
            <li className="text-6xl cursor-pointer">
              <a href="https://www.instagram.com/floral.radiance?fbclid=IwY2xjawFpV99leHRuA2FlbQIxMAABHV2h6qVsOXjdEMnroGxjhqh0_hilEO2umqPjtpjpwuoFDH2uJIxCp9jQMg_aem_tSSVz3gHtS-4WqO7XjDBUA" target="_blank"><FaInstagram />
              </a></li>
            <li className="text-6xl cursor-pointer">
              <a href="https://www.facebook.com/Floralradiance" target="_blank"><FaFacebook /></a> 
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-xl flex flex-col md:flex-row items-center">
          <Link href={"orderdeliverypolicy"}>
            <p className="text-[#184363] font-bold text-base p-4 underline">
              Delivery policy
            </p>
          </Link>

          <Link href={"privacypolicy"}>
            <p className="text-[#184363] text-base font-bold p-4 underline">
              Privacy policy
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewFooter;
