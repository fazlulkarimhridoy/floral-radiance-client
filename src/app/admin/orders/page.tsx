"use client";

import CategoryRow from "@/components/dashboard/CategoryRow";
import OrderRow from "@/components/dashboard/OrderRow";
import { useQuery } from "@tanstack/react-query";
import { Input, message } from "antd";
import { SearchProps } from "antd/es/input";
import axios from "axios";
import React, { useState } from "react";

// types
const { Search } = Input;

type CategoryType = {
    id: number;
    categoryId: number;
    name: string;
    description: string;
};

const Orders = () => {
    // states and calls
    const [searchText, setSearchText] = useState(null || "");

    // fetch category from server
    const {
        data: allCategories = [],
        isLoading,
        isPending,
        isFetching,
        refetch,
    } = useQuery<CategoryType[]>({
        queryKey: ["allCategories"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/all-category`
            );
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    // delete category
    const handleDeleteCategory = (id: CategoryType) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );
        if (confirmed) {
            axios
                .delete(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/delete-category?id=${id}`
                )
                .then((data) => {
                    message.success("Successfully deleted");
                    refetch();
                    console.log(data);
                });
        }
    };

    // Handle product filter for search
    const filteredCustomers = allCategories?.filter((category) => {
        if (searchText) {
            const searchString = searchText.toLowerCase();

            // Check product name, category (strings), and productId (number)
            return (
                category?.name?.toLowerCase()?.includes(searchString) ||
                category?.categoryId
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
        // console.log(filteredCustomers);
    };

    // checking if loading
    if (isLoading || isPending || isFetching) {
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
                    Manage Order
                </h3>
                <div className="mt-5 w-full xl:w-1/2 mx-auto">
                    <Search
                        placeholder="search customers...."
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                    />
                </div>
            </div>
            <div
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                className="overflow-auto scroll-smooth bg-blue-50 mt-5 mb-5 md:mb-0"
            >
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {allCategories.length > 0 &&
                            filteredCustomers?.map((data, index) => (
                                <OrderRow
                                    key={data.id}
                                    index={index}
                                    categoryData={data}
                                    handleDeleteCategory={handleDeleteCategory}
                                ></OrderRow>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
