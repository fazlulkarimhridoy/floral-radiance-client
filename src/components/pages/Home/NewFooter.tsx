import Image from "next/image";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const NewFooter = () => {
  return (
    <div className="pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 md:w-[90%] lg:w-[70%] mx-auto  gap-4">
        <div className=" row-span-2 bg-white rounded-xl">
          <p className="playfair text-[#184363] font-bold text-4xl p-4">
            Crafted with love, delivered with care.
          </p>
          <div className="flex items-center">
            <Image src={'/Images/logo.png'} alt = 'logo' width={100} height={100}/>
            <p className="font-outfit text-[#184363] text-xl font-bold">Floral radiance</p>
          </div>
          
        </div>
        <div className="bg-white rounded-xl">
          <p className="playfair text-[#184363] font-bold text-4xl p-4">
            Contact us
          </p>
        </div>

        <div className="bg-white rounded-xl h-auto row-span-2 flex flex-col gap-4 items-center p-4">
          <h1 className="playfair text-[#184363] font-bold text-4xl ">
            Social
          </h1>
          <ul className="flex flex-col gap-4">
            <li className="text-6xl cursor-pointer">
              <FaInstagram />
            </li>
            <li className="text-6xl cursor-pointer">
              <FaFacebook />
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-xl flex flex-col md:flex-row items-center">
          <a className="text-[#184363] font-bold text-lg p-4 underline" href="">
            Terms of use
          </a>
          <a className="text-[#184363] font-bold text-lg p-4 underline" href="">
            Privacy policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewFooter;
