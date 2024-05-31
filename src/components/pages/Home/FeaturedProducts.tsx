"use client"

import Image from "next/image";
import { Flex, Rate } from "antd";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const desc: string[] = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

interface ProductType {
    product_id: number,
    images: string[],
    product_name: string,
    price: number,
    discount_price: number,
    description: string,
    rating: number
}

const FeaturedProducts = () => {
    const [hoverStates, setHoverStates] = useState<{ [key: number]: boolean }>({});

    // Function to handle mouse enter event for a specific product
    const handleMouseEnter = (productId: number) => {
        setHoverStates(prevStates => ({
            ...prevStates,
            [productId]: true
        }));
    };

    // Function to handle mouse leave event for a specific product
    const handleMouseLeave = (productId: number) => {
        setHoverStates(prevStates => ({
            ...prevStates,
            [productId]: false
        }));
    };


    const { data: featuredProducts = [] } = useQuery<ProductType[]>({
        queryKey: ["featuredProducts"],
        queryFn: async () => {
            const res = await axios.get("/productData/productData.json");
            return res.data;
        },
        retry: 2,
        refetchOnWindowFocus: false

    })


    return (
        <div className="max-w-[76%] mx-auto my-20">
            <div className="">
                <h3 className="text-center italic font-medium">Wonderful gifts</h3>
                <h1 className="text-center text-5xl font-medium">Featured Products</h1>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-10 mt-20">
                {
                    featuredProducts?.map((item) => <div key={item.product_id} className="group h-[380px] w-[270px] rounded-sm hover:shadow-lg hover:transition-all hover:duration-400"
                        onMouseEnter={() => handleMouseEnter(item.product_id)}
                        onMouseLeave={() => handleMouseLeave(item.product_id)}
                    >
                        <div className="relative h-[270px] w-[270px]">
                            <Image
                                src={item?.images[0]}
                                alt="1"
                                width={600}
                                height={600}
                                className="absolute inset-0 object-cover opacity-100 group-hover:opacity-0"
                            />

                            <Image
                                src={item?.images[1]}
                                alt="2"
                                width={600}
                                height={600}
                                className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100"
                            />
                        </div>

                        {/* Product details */}
                        <div className="text-center mt-2">
                            <h3 className="text-lg font-semibold">{item?.product_name}</h3>
                            <Flex gap="middle" vertical className="mt-2">
                                <Rate className="text-base text-pink-600" tooltips={desc} value={item?.rating} />
                            </Flex>

                            {/* Render the price or Add to Cart based on hover */}
                            {!hoverStates[item.product_id] && (
                                <p className="font-medium flex items-center justify-center gap-2 mt-2">
                                    <span>${item?.discount_price}</span>
                                    <span className="line-through text-gray-400">${item?.price}</span>
                                </p>
                            )}
                            {hoverStates[item.product_id] && (
                                <p className="font-medium flex items-center justify-center gap-2 mt-2 animate-fade-in cursor-pointer hover:text-pink-600">
                                    Add to Cart
                                </p>
                            )}
                        </div>
                    </div>)
                }

            </div>
        </div>
    );
};

export default FeaturedProducts;