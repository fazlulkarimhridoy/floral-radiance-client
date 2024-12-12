"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../Home/ProductCard";
import { Empty, message, Spin } from "antd";
import { useCategory } from "@/context/CategoryContext";
import { useSearchText } from "@/context/SearchTextContext";
import Swal from "sweetalert2";
import { useCart } from "@/context/CartProvider";

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

interface CartItem {
    id: number;
    product_name: string;
    images: string;
    price: number;
}

const AllProducts = ({ handleSuccess }: { handleSuccess: any }) => {
    const { categoryName } = useCategory();
    const { searchText } = useSearchText();
    const { modal1Open, setModal1Open } = useCart();

    // fetch all products froom server
    const { data: shopProducts = [], isLoading, isSuccess } = useQuery<ProductType[]>({
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
                          product?.category
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          product?.product_name
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          product?.description
                              ?.toLowerCase()
                              ?.includes(searchString)
                      );
                  }
                  return true; // If no searchText, return all products
              })
            : [];

    return (
        <div
            className={`relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center gap-2 lg:gap-10 ${
                isLoading ? "mt-10 pb-16" : "mt-2 pb-2"
            } md:mt-4 md:pb-20 px-2 lg:px-4`}
        >
            {isLoading ? (
                <Spin
                    className="absolute left-1/2 transform -translate-x-1/2"
                    size="large"
                />
            ) : shopProducts?.length > 0 ? (
                filteredProducts?.length > 0 ? (
                    filteredProducts?.map((item) => (
                        <ProductCard
                            key={item?.id}
                            item={item}
                            modal1Open={modal1Open}
                            setModal1Open={setModal1Open}
                        />
                    ))
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
