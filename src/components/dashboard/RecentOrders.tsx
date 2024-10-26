"use client";

import OrderRow from "@/components/dashboard/OrderRow";
import { useQuery } from "@tanstack/react-query";
import { Empty, Input } from "antd";
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

const RecentOrders = () => {
  // check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  // fetch category from server
  const {
    data: allOrders = [],
    isLoading,
    refetch,
  } = useQuery<OrderType[]>({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/recent-order`
      );
      return res.data.data;
    },
    retry: 2,
    refetchOnWindowFocus: false,
  });

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
              allOrders?.map((data) => (
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

export default RecentOrders;
