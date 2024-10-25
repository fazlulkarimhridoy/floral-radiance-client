"use client";

import CategoryRow from "@/components/dashboard/CategoryRow";
import { useQuery } from "@tanstack/react-query";
import { Empty, Input, message } from "antd";
import { SearchProps } from "antd/es/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

// types
const { Search } = Input;

type CategoryType = {
    id: number;
    categoryId: number;
    name: string;
    description: string;
};

const Categories = () => {
    // check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);
    // states and calls
    const [searchText, setSearchText] = useState("");

    // fetch category from server
    const {
        data: allCategories = [],
        isLoading,
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
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/delete-category/${id}`
                    )
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Category has been deleted.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        refetch();
                    });
            }
        });
    };

    // Handle product filter for search
    const filteredCustomers =
        allCategories?.length > 0
            ? allCategories?.filter((category) => {
                  if (searchText) {
                      const searchString = searchText.toLowerCase();

                      // Check product name, category (strings), and productId (number)
                      return (
                          category?.name
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          category?.categoryId
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
        // console.log(filteredCustomers);
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
        <div className="relative">
            <div>
                <h3 className="text-center pt-4 text-blue-200 text-4xl font-bold">
                    Manage Category
                </h3>
                <div className="mt-5 w-full xl:w-1/2 mx-auto">
                    <Search
                        placeholder="search by id, name...."
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
                <table className="table whitespace-nowrap">
                    {/* head */}
                    <thead>
                        <tr className="bg-gray-200">
                            <th>#</th>
                            <th>Category Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {allCategories.length > 0 ? (
                            filteredCustomers?.map((data, index) => (
                                <CategoryRow
                                    key={data.id}
                                    index={index}
                                    categoryData={data}
                                    handleDeleteCategory={handleDeleteCategory}
                                ></CategoryRow>
                            ))
                        ) : (
                            <Empty
                                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                description="No categories found!"
                            />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categories;
