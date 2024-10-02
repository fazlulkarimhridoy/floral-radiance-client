"use client";

import OrderRow from "@/components/dashboard/OrderRow";
import { useQuery } from "@tanstack/react-query";
import { Empty, Input } from "antd";
import { SearchProps } from "antd/es/input";
import axios from "axios";
import React, { useState } from "react";

// types
const { Search } = Input;

type OrderType = {
    id: number;
    customerId: number;
    totalPrice: number;
    deliveryDate: string;
    deliveryTime: string;
    orderStatus: string;
    orderDate: string;
    orderTime: string;
    paymentMethod: string;
    items: string[];
    customer: string;
};

const Orders = () => {
    // states and calls
    const [searchText, setSearchText] = useState(null || "");

    // fetch category from server
    const {
        data: allOrders = [],
        isLoading,
        refetch,
    } = useQuery<OrderType[]>({
        queryKey: ["allOrders"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/all-order`
            );
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    console.log(allOrders);

    // Handle product filter for search
    const filteredOrders = allOrders?.filter((order) => {
        if (searchText) {
            const searchString = searchText.toLowerCase();

            // Check product name, category (strings), and productId (number)
            return order?.customerId
                ?.toString()
                ?.toLowerCase()
                ?.includes(searchString);
        }
        return true; // If no searchText, return all products
    });

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
                            <th>Customer Id</th>
                            <th>Items</th>
                            <th>Total Price</th>
                            <th>Payment Method</th>
                            <th>Delivery Date</th>
                            <th>Delivery Time</th>
                            <th>Order Date</th>
                            <th>Order Status</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {allOrders.length > 0 ? (
                            filteredOrders?.map((data, index) => (
                                <OrderRow
                                    key={data.id}
                                    index={index}
                                    categoryData={data}
                                ></OrderRow>
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

export default Orders;
