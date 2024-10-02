import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import ProductCard from "../Home/ProductCard";
import { Spin } from "antd";
import { useCategory } from "@/context/CategoryContext";

interface ProductType {
    id: number;
    product_id: number;
    images: string[];
    product_name: string;
    price: number;
    discount_price: number;
    description: string;
    rating: number;
    category: string;
}

const AllProducts = () => {
    const { categoryName } = useCategory();

    // fetch all products froom server
    const { data: shopProducts = [], isLoading } = useQuery<ProductType[]>({
        queryKey: ["featuredProducts"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/all-products`
            );
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    // Handle product filter for search
    const filteredProducts = shopProducts?.filter((product) => {
        const searchText = categoryName;
        if (searchText) {
            const searchString = searchText.toLowerCase();

            // Check product name, category (strings), and productId (number)
            return product?.category?.toLowerCase()?.includes(searchString);
        }
        return true; // If no searchText, return all products
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
        <div className="flex flex-wrap justify-center gap-10 mt-20 pb-20">
            {shopProducts?.length > 0
                ? filteredProducts?.length > 0
                    ? filteredProducts?.map((item) => (
                          <ProductCard key={item?.id} item={item} />
                      ))
                    : "No product for this category"
                : "No product added yet!"}
        </div>
    );
};

export default AllProducts;
