"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Spin } from "antd";

const desc: string[] = ["terrible", "bad", "normal", "good", "wonderful"];

interface ProductType {
    id: number;
    product_id: number;
    images: string[];
    product_name: string;
    price: number;
    discount_price: number;
    description: string;
    rating: number;
}

const FeaturedProducts = () => {
    // fetch all products from server
    const { data: featuredProducts = [], isLoading } = useQuery<ProductType[]>({
        queryKey: ["featuredProducts"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/all-products`
            );
            return res?.data?.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    // show loader if data loads
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center gap-5 fixed top-[75%] left-[55%] transform -translate-x-1/2 -translate-y-1/2">
                <Spin size="large" />
                <h2>loading.....</h2>
            </div>
        );
    }

    return (
        <div className="max-w-[76%] mx-auto my-20">
            <div className="">
                <h3 className="text-center italic font-medium">
                    Wonderful gifts
                </h3>
                <h1 className="text-center text-5xl font-medium">
                    Featured Products
                </h1>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-10 mt-20">
                {featuredProducts?.length > 0
                    ? featuredProducts?.map((item) => (
                          <ProductCard key={item?.id} item={item} />
                      ))
                    : "No featured Products"}
            </div>
        </div>
    );
};

export default FeaturedProducts;
