"use client";

import { useQuery } from "@tanstack/react-query";
import { Col, Row, Statistic, StatisticProps } from "antd";
import axios from "axios";
import CountUp from "react-countup";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp end={value as number} separator="," />
);

// chart data
const barData = [
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
        _sum: number;
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
    // fetch order statistics
    const { data, isLoading, isPending, isFetching } = useQuery<statistic>({
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
    if (isLoading || isPending || isFetching) {
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
            <div className="mt-10">
                <Row gutter={16}>
                    <Col span={6}>
                        <Statistic
                            className="bg-blue-200 p-5 text-center font-bold rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                            title="Total Balance (BDT)"
                            value={data?.orderStatistic?._sum}
                            precision={2}
                            formatter={formatter}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            className="bg-blue-200 p-5 text-center font-bold rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                            title="Total Orders"
                            value={data?.orderStatistic?._count}
                            formatter={formatter}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            className="bg-blue-200 p-5 text-center font-bold rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                            title="Total Customers"
                            value={data?.customerStatistic?._count}
                            formatter={formatter}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            className="bg-blue-200 p-5 text-center font-bold rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                            title="Total Products"
                            value={data?.productStatistic?._count}
                            precision={2}
                            formatter={formatter}
                        />
                    </Col>
                </Row>
            </div>
            {/* chartbar */}
            <div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={150} height={40} data={barData as any}>
                        <Bar dataKey="uv" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminDashboard;
