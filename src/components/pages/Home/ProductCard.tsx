"use client";

import Image from "next/image";
import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

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
    handleCart: Function;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, handleCart }) => {
    return (
        <div className=" w-full md:w-[250px] flex flex-col  items-stretch text-center justify-center gap-4 p-4 rounded-xl  amoled-shadow  bg-white lg:bg-none">
            <div className=" rounded-xl">
                <Image
                    src={item?.images[0]}
                    alt={`Image`}
                    width={120}
                    height={100}
                    className={` w-full p-4 rounded-xl`}
                />
            </div>
            <div className=" border-[#194464] flex flex-col gap-2">
                <p className="font-outfit text-base font-bold text-[#194464]">
                    {item?.product_name}
                </p>
                <p className="font-outfit text-sm text-[#194464]">
                    {item?.description}
                </p>
                <div className="flex items-center justify-center text-center">
                    <p className="text-lg font-outfit font-bold">
                        Price: {item?.price}
                    </p>{" "}
                    <FaBangladeshiTakaSign className="text-sm" />
                </div>
            </div>
            <div>
                <button
                    onClick={() =>
                        handleCart(
                            item?.id,
                            item?.product_name,
                            item?.images[0],
                            item?.price
                        )
                    }
                    className="border-2 border-[#194464] px-2 py-2 rounded-xl text-base font-semibold font-outfit hover:bg-[#194464] hover:text-white transition-colors duration-300 text-center"
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
