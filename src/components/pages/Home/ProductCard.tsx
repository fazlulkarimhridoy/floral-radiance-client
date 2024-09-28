"use client";

import { Flex } from "antd";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { Rate } from "antd";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { message } from "antd";

interface Item {
    id: number;
    product_id: number;
    images: string[];
    product_name: string;
    price: number;
    discount_price: number;
    description: string;
    rating: number;
}

interface ProductCardProps {
    item: Item;
    desc: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ item, desc }) => {
    console.log(item?.images);

    const [hoverStates, setHoverStates] = useState<{ [key: number]: boolean }>(
        {}
    );

    const cartContext = useContext(CartContext);

    if (!cartContext) {
        return null;
    }

    const { addToCart } = cartContext;

    // Function to handle mouse enter event for a specific product
    const handleMouseEnter = (productId: number) => {
        setHoverStates((prevStates) => ({
            ...prevStates,
            [productId]: true,
        }));
    };

    // Function to handle mouse leave event for a specific product
    const handleMouseLeave = (productId: number) => {
        setHoverStates((prevStates) => ({
            ...prevStates,
            [productId]: false,
        }));
    };

    // const images = typeof item?.images === "string" ? JSON.parse(item?.images) : [];

    return (
        // <div
        //     key={item.id}
        //     className="group h-[400px] w-[300px] rounded-2xl border-2 p-2  hover:shadow-lg hover:transition-all hover:duration-400"
        //     onMouseEnter={() => handleMouseEnter(item.id)}
        //     onMouseLeave={() => handleMouseLeave(item.id)}
        // >
        //     <div className="relative h-[270px] w-[260px] mx-auto">
        //         {item?.images &&
        //             item?.images?.map((imageUrl: string, index: number) => {
        //                 // checking if image url start with http or not
        //                 return (
        //                     <Image
        //                         key={index}
        //                         src={imageUrl}
        //                         alt={`Image ${index}`}
        //                         width={500}
        //                         height={500}
        //                         className={`absolute inset-0 object-cover ${
        //                             index === 0 ? "opacity-100" : "opacity-0"
        //                         } group-hover:opacity-${
        //                             index === 0 ? "0" : "100"
        //                         }`}
        //                     />
        //                 );
        //             })}
        //     </div>

        //     {/* Product details */}
        //     <div className="text-center my-2">
        //         <h3 className="text-lg font-semibold">{item?.product_name}</h3>
        //         <Flex gap="middle" vertical className="mt-2">
        //             <Rate
        //                 className="text-base text-pink-600"
        //                 tooltips={desc}
        //                 value={item?.rating}
        //             />
        //         </Flex>

        //         {/* Render the price or Add to Cart based on hover */}
        //         {!hoverStates[item?.id] && (
        //             <p className="font-medium flex items-center justify-center gap-2 border-2 w-32 mx-auto rounded-2xl border-[#f472b6] py-1">
        //                 <span>${item?.discount_price}</span>
        //                 <span className="line-through text-gray-400">
        //                     ${item?.price}
        //                 </span>
        //             </p>
        //         )}
        //         {hoverStates[item?.id] && (
        //             <div className="flex">
        //                 <p
        //                     onClick={() => {
        //                         addToCart(item);
        //                     }}
        //                     className="font-medium flex items-center justify-center gap-2 mt-2 animate-fade-in cursor-pointer hover:text-pink-600 border-2 w-32 mx-auto rounded-2xl border-[#f472b6] py-1"
        //                 >
        //                     Add to Cart
        //                 </p>
        //                 <Link href={`products/${item?.id}`}>
        //                     <p className="font-medium flex items-center justify-center gap-2 mt-2 animate-fade-in cursor-pointer hover:text-pink-600 border-2 w-32 mx-auto rounded-2xl border-[#f472b6] py-1">
        //                         View details
        //                     </p>
        //                 </Link>
        //             </div>
        //         )}
        //     </div>
        // </div>
        <div className=" w-[250px] flex flex-col  items-stretch text-center justify-center gap-4 p-4 rounded-xl bg-[#b8cedc]">
            <div className="bg-white rounded-xl">
                <Image
                    src={"/Images/red-rose.png"}
                    alt={`Image`}
                    width={120}
                    height={100}
                    className={`bg-white w-full p-4 rounded-xl`}
                />
            </div>
            <div className=" border-[#194464] flex flex-col gap-2">
                <p className="font-outfit text-base font-bold text-[#194464]">
                    {item.product_name}
                </p>
                <p className="font-outfit text-sm text-[#194464]">
                    {item.description}
                </p>
                <div className="flex items-center justify-center text-center">
                    <p className="text-lg font-outfit font-bold">
                        Price: {item.price}
                    </p>{" "}
                    <FaBangladeshiTakaSign className="text-sm" />
                </div>
            </div>
            <div>
                <button
                    onClick={() => addToCart(item)}
                    className="border-2 border-[#194464] px-2 py-2 rounded-xl text-base font-semibold font-outfit hover:bg-[#194464] hover:text-white transition-colors duration-300 text-center"
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
