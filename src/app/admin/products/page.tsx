"use client";

// import ProductRow from "@/components/dashboard/ProductRow";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

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

const Products = () => {

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
                    refetch();
                    console.log(data);
                });
        }
    };

    // checking if loading
    if (isLoading) {
        return (
            <div className="flex justify-center mt-28 mb-28 lg:mt-80 lg:mb-60">
                <progress className="progress w-56 bg-blue-200 h-2 lg:h-8 lg:w-80"></progress>
            </div>
        );
    }

    return (
        <div>
            <div>
                <h3 className="text-center pt-4 text-blue-200 text-4xl font-bold">
                    Manage Products
                </h3>
            </div>
            <div className="overflow-x-auto scroll-smooth bg-blue-50 pt-4 mb-5 md:mb-0">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="hidden md:table-cell">Index</th>
                            <th className="hidden md:table-cell">Product Id</th>
                            <th>Product & image</th>
                            <th className="hidden md:table-cell">Price</th>
                            <th className="hidden md:table-cell">
                                Offer Price
                            </th>
                            <th className="hidden md:table-cell">Rating</th>
                            <th>Stock</th>
                            <th className="hidden md:table-cell">Created At</th>
                            <th className="hidden md:table-cell">Updated At</th>
                            <th className="hidden md:table-cell">View</th>
                            <th className="hidden md:table-cell">Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {allProducts.length > 0 &&
                            allProducts?.map((data, index) => (
                                <ProductRow
                                    key={data.id}
                                    index={index}
                                    productData={data}
                                    handleDeleteProduct={handleDeleteProduct}
                                ></ProductRow>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;
