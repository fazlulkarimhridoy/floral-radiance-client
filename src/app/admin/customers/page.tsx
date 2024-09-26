"use client";

import CustomerRow from "@/components/dashboard/CustomerRow";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface CustomerType {
    id: number;
    customerId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
}

const Products = () => {
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
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/delete-customer?id=${id}`
                )
                .then((data) => {
                    refetch();
                    console.log(data);
                });
        }
    };

    // checking if loading
    if (isLoading) {
        return (
            <div className="flex justify-center mt-28 mb-28 lg:mt-80 lg:mb-60">
                <progress className="progress w-56 bg-blue-200 h-2 lg:h-8 lg:w-80"></progress>
            </div>
        );
    }

    return (
        <>
            <div>
                <h3 className="text-center pt-4 text-blue-200 text-4xl font-bold">
                    Manage Customer
                </h3>
            </div>
            <div className="overflow-x-auto bg-blue-50 pt-4 mb-5 md:mb-0">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="hidden md:table-cell">Index</th>
                            <th className="hidden md:table-cell">
                                Customer Id
                            </th>
                            <th>First name</th>
                            <th className="hidden md:table-cell">Last name</th>
                            <th className="hidden md:table-cell">
                                Email Address
                            </th>
                            <th>Phone</th>
                            <th className="hidden md:table-cell">Address</th>
                            <th className="hidden md:table-cell">City</th>
                            <th className="hidden md:table-cell">State</th>
                            <th className="hidden md:table-cell">Zip code</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {allCustomers.length > 0 &&
                            allCustomers?.map((data, index) => (
                                <CustomerRow
                                    key={data.id}
                                    index={index}
                                    customerData={data}
                                    handleDeleteProduct={handleDeleteProduct}
                                ></CustomerRow>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Products;
