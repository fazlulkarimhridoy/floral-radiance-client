/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useQuery } from "@tanstack/react-query";
import { Statistic, StatisticProps } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Bar, BarChart } from "recharts";

const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp end={value as number} separator="," />
);

// Define the type for the data array
interface DataItem {
    name: string;
    uv: number;
    pv: number;
    amt: number;
}

const barData: DataItem[] = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

type statistic = {
    orderStatistic: {
        _sum: {
            totalPrice: number;
            _count: number;
        };
        _count: number;
    };
    customerStatistic: {
        _count: number;
    };
    productStatistic: {
        _count: number;
    };
};

const AdminDashboard = () => {
    // check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);
    // fetch order statistics
    const { data, isLoading } = useQuery<statistic>({
        queryKey: ["statistics"],
        queryFn: async () => {
            const res1 = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/statistic`
            );
            const res2 = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/statistic`
            );
            const res3 = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/statistic`
            );
            return {
                orderStatistic: res1?.data?.data,
                customerStatistic: res2?.data?.data,
                productStatistic: res3?.data?.data,
            };
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
        <div>
            {/* header */}
            <div>
                <h3 className="text-center pt-4 text-blue-200 text-4xl font-bold">
                    Admin Dashboard
                </h3>
            </div>
            {/* statistics */}
            <div className="mt-10 px-0 xl:px-52 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-10">
                <div>
                    <Statistic
                        className="bg-blue-200 p-5 text-center font-bold rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                        title="Total Balance (BDT)"
                        value={data?.orderStatistic?._sum?.totalPrice}
                        precision={2}
                        formatter={formatter}
                    />
                </div>
                <div>
                    <Statistic
                        className="bg-blue-200 p-5 text-center font-bold rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                        title="Total Orders"
                        value={data?.orderStatistic?._count}
                        formatter={formatter}
                    />
                </div>
                <div>
                    <Statistic
                        className="bg-blue-200 p-5 text-center font-bold rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                        title="Total Customers"
                        value={data?.customerStatistic?._count}
                        formatter={formatter}
                    />
                </div>
                <div>
                    <Statistic
                        className="bg-blue-200 p-5 text-center font-bold rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                        title="Total Products"
                        value={data?.productStatistic?._count}
                        precision={2}
                        formatter={formatter}
                    />
                </div>
            </div>
            {/* chartbar */}
            <div className="mt-20 flex flex-wrap flex-col md:flex-row items-center justify-center gap m-5">
                <div>
                    <BarChart width={330} height={400} data={barData}>
                        <Bar dataKey="uv" fill="#8884d8" />
                    </BarChart>

                    <p className="text-center text-lg font-semibold mt-5">
                        Order and Customer Data Graph
                    </p>
                </div>
                <div className="mt-5 md:mt-0">
                    <BarChart width={330} height={400} data={barData}>
                        <Bar dataKey="pv" fill="#346423" />
                    </BarChart>
                    <p className="text-center text-lg font-semibold mt-5">
                        Customer Data Graph
                    </p>
                </div>
                <div className="mt-5 md:mt-0">
                    <BarChart width={330} height={400} data={barData}>
                        <Bar dataKey="amt" fill="#099889" />
                    </BarChart>
                    <p className="text-center text-lg font-semibold mt-5">
                        Product Data Graph
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
