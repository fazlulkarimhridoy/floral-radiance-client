"use client";

import CustomerRow from "@/components/dashboard/CustomerRow";
import { useQuery } from "@tanstack/react-query";
import { Empty, Input, message } from "antd";
import { SearchProps } from "antd/es/input";
import axios from "axios";
import React, { useState } from "react";

type CustomerType = {
    id: number;
    customerId: number;
    name: string;
    email: string;
    phone: string;
    address: string;
};

const { Search } = Input;

const Products = () => {
    // states and calls
    const [searchText, setSearchText] = useState("");

    // fetch all customers
    const {
        data: allCustomers = [],
        isLoading,
        refetch,
    } = useQuery<CustomerType[]>({
        queryKey: ["allCustomers"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/all-customer`
            );
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    // handle delete
    const handleDeleteProduct = (id: CustomerType) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this customer?"
        );
        if (confirmed) {
            axios
                .delete(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/delete-customer/${id}`
                )
                .then((data) => {
                    message.success("Successfully deleted");
                    refetch();
                    console.log(data);
                });
        }
    };

    // Handle product filter for search
    const filteredCustomers = allCustomers?.length > 0 ? allCustomers?.filter((customer) => {
        if (searchText) {
            const searchString = searchText.toLowerCase();

            // Check product name, category (strings), and productId (number)
            return (
                customer?.name?.toLowerCase()?.includes(searchString) ||
                customer?.email?.toLowerCase()?.includes(searchString) ||
                customer?.phone
                    ?.toString()
                    ?.toLowerCase()
                    ?.includes(searchString) ||
                customer?.customerId
                    ?.toString()
                    ?.toLowerCase()
                    ?.includes(searchString)
            );
        }
        return true; // If no searchText, return all products
    }) : [];

    // handle search filed value
    const onSearch: SearchProps["onSearch"] = (value) => {
        setSearchText(value);
        console.log(filteredCustomers);
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
                    Manage Customer
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
                            <th>ID</th>
                            <th>Customer Id</th>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {allCustomers.length > 0 ?
                            filteredCustomers?.map((data, index) => (
                                <CustomerRow
                                    key={data.id}
                                    index={index}
                                    customerData={data}
                                    handleDeleteProduct={handleDeleteProduct}
                                ></CustomerRow>
                            )) : <Empty className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" description="No customer found!" />}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;
