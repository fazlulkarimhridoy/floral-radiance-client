"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import ProductCard from "../Home/ProductCard";
import { Empty, Spin } from "antd";
import { useCategory } from "@/context/CategoryContext";
import { useSearchText } from "@/context/SearchTextContext";

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
    stock: string;
}

interface CartItem {
    id: number;
    product_name: string;
    images: string;
    price: number;
}

const AllProducts = ({ handleSuccess }: { handleSuccess: any }) => {
    const { categoryName } = useCategory();
    const { searchText } = useSearchText();

    // fetch all products froom server
    const {
        data: shopProducts = [],
        isLoading,
        isSuccess,
    } = useQuery<ProductType[]>({
        queryKey: ["featuredProducts"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/all-products`);
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (isSuccess) {
            handleSuccess(isSuccess);
        }
    }, [isSuccess]);

    // Handle product filter for search
    const filteredProducts =
        shopProducts?.length > 0
            ? shopProducts?.filter((product) => {
                  const searchingText = categoryName || searchText;
                  if (searchingText) {
                      const searchString = searchingText.toLowerCase();

                      // Check product name, category (strings), and productId (number)
                      return (
                          product?.category?.toLowerCase()?.includes(searchString) ||
                          product?.product_name?.toLowerCase()?.includes(searchString) ||
                          product?.description?.toLowerCase()?.includes(searchString)
                      );
                  }
                  return true; // If no searchText, return all products
              })
            : [];

    return (
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-10 my-5 px-1 md:my-28 md:px-5">
            {isLoading ? (
                <Spin size="large" />
            ) : shopProducts?.length > 0 ? (
                filteredProducts?.length > 0 ? (
                    filteredProducts
                        ?.filter((item: ProductType) => item.stock === "available")
                        ?.map((item: ProductType) => <ProductCard key={item?.id} item={item} />)
                ) : (
                    <Empty description="No product for this category!" />
                )
            ) : (
                <Empty description="No product added yet!" />
            )}
        </div>
    );
};

export default AllProducts;

// flex flex-wrap justify-center gap-10 mt-20 pb-20 px-5
