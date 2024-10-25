"use client";

import OrderRow from "@/components/dashboard/OrderRow";
import { useQuery } from "@tanstack/react-query";
import { Empty, Input } from "antd";
import { SearchProps } from "antd/es/input";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
        customerId: string;
    };
};

const Orders = () => {
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


    // Handle product filter for search
    const filteredOrders =
        allOrders?.length > 0
            ? allOrders?.filter((order) => {
                  if (searchText) {
                      const searchString = searchText.toLowerCase();

                      // Check product name, category (strings), and productId (number)
                      return (
                          order?.customer.name
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          order?.customer.email
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          order?.customer.phone
                              ?.toString()
                              ?.toLowerCase()
                              ?.includes(searchString) ||
                          order?.customerId
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
                    Manage Order
                </h3>
                <div className="mt-5 w-full xl:w-1/2 mx-auto">
                    <Search
                        placeholder="search by name, number, email...."
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
                            <th>Customer Id</th>
                            <th>Name</th>
                            <th>Total Price</th>
                            <th>Payment Method</th>
                            <th>Delivery Date</th>
                            <th>Delivery Time</th>
                            <th>Order Date</th>
                            <th>Details</th>
                            <th>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {allOrders.length > 0 ? (
                            filteredOrders?.map((data) => (
                                <OrderRow
                                    key={data.id}
                                    categoryData={data}
                                    refetch={refetch}
                                ></OrderRow>
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

export default Orders;
