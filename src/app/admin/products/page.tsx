"use client";

import ProductRow from "@/components/dashboard/ProductRow";
import { useQuery } from "@tanstack/react-query";
import { Button, Empty, Flex, Input, message, Rate } from "antd";
import { SearchProps } from "antd/es/input";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaTools, FaTrash } from "react-icons/fa";

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

const desc: string[] = ["terrible", "bad", "normal", "good", "wonderful"];

const Products = () => {
    // states and calls
    const [searchText, setSearchText] = useState("");

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
    const handleDeleteProduct = (id: Number) => {
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
    const filteredProducts =
        allProducts?.length > 0
            ? allProducts?.filter((product) => {
                  if (searchText) {
                      const searchString = searchText.toLowerCase();

                      // Check product name, category (strings), and productId (number)
                      return (
                          product?.product_name
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          product?.category
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          product?.productId
                              ?.toString()
                              ?.toLowerCase()
                              ?.includes(searchString)
                      );
                  }
                  return true; // If no searchText, return all products
              })
            : [];

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
                                // <ProductRow
                                //     key={data.id}
                                //     index={index}
                                //     productData={data}
                                //     handleDeleteProduct={handleDeleteProduct}
                                // ></ProductRow>
                                <tr key={data.id}>
                                    <th>{index + 1}</th>
                                    <th>{data.productId}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <Image
                                                        width={500}
                                                        height={500}
                                                        src={data.images[0]}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">
                                                    {data.product_name}
                                                </div>
                                                <div className="text-sm opacity-50">
                                                    {data.category ||
                                                        "No Category"}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-gray-600 font-bold">
                                            {data.price}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-gray-600 font-bold">
                                            {data.discount_price}
                                        </div>
                                    </td>
                                    <td>
                                        <Flex gap="middle" className="mt-2">
                                            <Rate
                                                className="flex items-center justify-center text-base text-pink-600"
                                                tooltips={desc}
                                                value={data.rating}
                                            />
                                        </Flex>
                                    </td>
                                    <td>
                                        <div>{data.stock}</div>
                                    </td>
                                    <td>
                                        <div className="text-gray-600 font-bold">
                                            {typeof data.created_at === "string"
                                                ? new Date(
                                                      data.created_at
                                                  ).toLocaleDateString(
                                                      "en-US",
                                                      {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                      }
                                                  )
                                                : "Invalid date"}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-gray-600 font-bold">
                                            {typeof data.created_at === "string"
                                                ? new Date(
                                                      data.updated_at
                                                  ).toLocaleDateString(
                                                      "en-US",
                                                      {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                      }
                                                  )
                                                : "Invalid date"}
                                        </div>
                                    </td>
                                    <td>
                                        <Link href={`/products/${data.id}`}>
                                            <Button className="btn btn-circle btn-outline btn-sm">
                                                <FaEye></FaEye>
                                            </Button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link
                                            href={`/admin/products/${data.id}`}
                                        >
                                            <Button
                                                // onClick={() => handleUpdateProduct(id)}
                                                className="btn btn-circle btn-outline btn-sm"
                                            >
                                                <FaTools color="green" />
                                            </Button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() =>
                                                handleDeleteProduct(data.id)
                                            }
                                            className="btn btn-circle btn-outline btn-sm"
                                        >
                                            <FaTrash className="text-red-600"></FaTrash>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <Empty
                                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                description="No customer found!"
                            />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;
