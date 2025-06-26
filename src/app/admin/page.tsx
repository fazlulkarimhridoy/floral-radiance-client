/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import RecentOrders from "@/components/dashboard/RecentOrders";
import { useQuery } from "@tanstack/react-query";
import { Statistic, StatisticProps } from "antd";
import axios from "axios";
import { useEffect } from "react";
import CountUp from "react-countup";
import { FaDollarSign } from "react-icons/fa";

const formatter: StatisticProps["formatter"] = (value) => (
    <div className="flex items-center justify-center gap-1 text-gray-600 font-semibold">
        <FaDollarSign className="text-xl mt-0.5" />
        <CountUp end={value as number} separator="," />
    </div>
);
const AdminDashboard = () => {
    // check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);
    // fetch order statistics
    const { data, isLoading } = useQuery<any>({
        queryKey: ["statistics"],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/statistic`);
            return res?.data?.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    const statsConfig = [
        {
            key: "totalRevenue",
            title: "Total Revenue",
            value: data?.overall?.totalRevenue,
            count: data?.overall?.totalOrders,
            bg: "bg-blue-500/10 text-blue-500",
            precision: 2,
        },
        {
            key: "delivered",
            title: "Delivered",
            value: data?.delivered?.amount,
            count: data?.delivered?.count,
            bg: "bg-green-500/10 text-green-500",
        },
        {
            key: "pending",
            title: "Pending",
            value: data?.pending?.amount,
            count: data?.pending?.count,
            bg: "bg-yellow-500/10 text-yellow-500",
        },
        {
            key: "shipped",
            title: "Shipped",
            value: data?.shipped?.amount,
            count: data?.shipped?.count,
            bg: "bg-purple-500/10 text-purple-500",
            precision: 2,
        },
        {
            key: "cancelled",
            title: "Cancelled",
            value: data?.cancelled?.amount,
            count: data?.cancelled?.count,
            bg: "bg-red-500/10 text-red-500",
            precision: 2,
        },
    ];

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
            {/* statistics */}
            <div className="text-nowrap mt-4 md:mt-10 px-2 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-5 lg:gap-10">
                {statsConfig.map((item) => (
                    <div key={item.key} className={`relative p-5 rounded-lg ${item.bg}`}>
                        <div className="absolute top-3 left-4 text-sm">{item.title}</div>
                        <div className="absolute top-3 right-4 text-sm">{item.count ?? 0}</div>

                        <div className="pt-6">
                            <Statistic value={item.value} precision={item.precision} formatter={formatter} />
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} className="overflow-x-scroll">
                <h3 className="text-center my-5 text-sm italic font-thin text-gray-400">Recent Orders</h3>
                <RecentOrders />
            </div>
        </div>
    );
};

export default AdminDashboard;
