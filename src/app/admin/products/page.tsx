"use client";

import ProductRow from "@/components/dashboard/ProductRow";
import { useQuery } from "@tanstack/react-query";
import { Empty, Input, message } from "antd";
import { SearchProps } from "antd/es/input";
import axios from "axios";
import React, { useState } from "react";

interface ProductType {
    id: number;
    productId: number;
    images: string[];
    product_name: string;
    price: number;
    discount_price: number;
    description: string;
    rating: number;
    stock: number;
    created_at: string;
    updated_at: string;
    category: string;
}

const { Search } = Input;

const Products = () => {
    // states and calls
    const [searchText, setSearchText] = useState(null || "");

    // fetch all product from server
    const {
        data: allProducts = [],
        isLoading,
        refetch,
    } = useQuery<ProductType[]>({
        queryKey: ["allProducts"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/all-products`
            );
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    // handle delete
    const handleDeleteProduct = (id: ProductType) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if (confirmed) {
            axios
                .delete(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/delete-product?id=${id}`
                )
                .then((data) => {
                    message.success("Successfully deleted");
                    refetch();
                    console.log(data);
                });
        }
    };

    // Handle product filter for search
    const filteredProducts = allProducts?.filter((product) => {
        if (searchText) {
            const searchString = searchText.toLowerCase();

            // Check product name, category (strings), and productId (number)
            return (
                product?.product_name?.toLowerCase()?.includes(searchString) ||
                product?.category?.toLowerCase()?.includes(searchString) ||
                product?.productId
                    ?.toString()
                    ?.toLowerCase()
                    ?.includes(searchString)
            );
        }
        return true; // If no searchText, return all products
    });

    // handle search filed value
    const onSearch: SearchProps["onSearch"] = (value) => {
        setSearchText(value);
    };

    // checking if loading
    if (isLoading) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <progress className="progress w-56 bg-blue-200 h-4 lg:h-8 lg:w-80"></progress>
            </div>
        );
    }

    return (
        <div>
            <div>
                <h3 className="text-center pt-4 text-blue-200 text-4xl font-bold">
                    Manage Products
                </h3>
                <div className="mt-5 w-full xl:w-1/2 mx-auto">
                    <Search
                        placeholder="search products..."
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                    />
                </div>
            </div>
            <div className="overflow-x-auto scroll-smooth bg-blue-50 pt-4 mb-5 md:mb-0">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Id</th>
                            <th>Product & image</th>
                            <th>Price</th>
                            <th>Offer Price</th>
                            <th>Rating</th>
                            <th>Stock</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {allProducts?.length > 0 ? (
                            filteredProducts?.map((data, index) => (
                                <ProductRow
                                    key={data.id}
                                    index={index}
                                    productData={data}
                                    handleDeleteProduct={handleDeleteProduct}
                                ></ProductRow>
                            ))
                        ) : (
                            <Empty description="No customer found!" />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;
