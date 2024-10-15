import { Button, message, Modal, Select } from "antd";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import OrderItem from "./OrderItem";
import axios from "axios";

const statusOptions = [
    {
        value: "PENDING",
        label: "PENDING",
    },
    {
        value: "SHIPPED",
        label: "SHIPPED",
    },
    {
        value: "DELIVERED",
        label: "DELIVERED",
    },
    {
        value: "CANCELLED",
        label: "CANCELLED",
    },
];

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

const OrderRow = ({
    categoryData,
    index,
}: {
    categoryData: OrderType;
    index: number;
}) => {
    // states and calls
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const onClose = () => {
        setIsModalOpen(false);
    };
    const {
        customerId,
        totalPrice,
        deliveryDate,
        deliveryTime,
        orderDate,
        orderStatus,
        paymentMethod,
        items,
        customer,
    } = categoryData;

    const handleOrderStatus = async (value: any) => {
        console.log("status", value);
        // update status to server
        await axios
            .patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/update-order/${customerId}`,
                {
                    orderStatus: value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((data) => {
                console.log(data);
                if (data.data.status == "success") {
                    message.success("Order status updated");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <tr>
            <th>{customerId}</th>
            <th>{customer?.name}</th>

            <td>{totalPrice}</td>
            <td>{paymentMethod === "CASHON" ? "COD" : "Bkash"}</td>
            <td>{deliveryDate}</td>
            <td>{deliveryTime}</td>
            <td>
                <div>
                    {typeof orderDate === "string"
                        ? new Date(orderDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                          })
                        : "Invalid date"}
                </div>
            </td>
            <th>
                <Button onClick={showModal}>Oder Details</Button>
            </th>
            {/* <td>{orderStatus}</td> */}
            <td>
                <Select
                    style={{ width: 120 }}
                    className="w-full"
                    onChange={handleOrderStatus}
                    defaultValue={orderStatus}
                >
                    {statusOptions
                        .filter((option) => option.value !== orderStatus)
                        .map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                </Select>
            </td>
            <td>
                <Button className="btn btn-circle btn-outline btn-sm">
                    <FaTrash className="text-red-600"></FaTrash>
                </Button>
            </td>
            <Modal
                className="w-full"
                footer={false}
                open={isModalOpen}
                onCancel={onClose}
            >
                <div className="flex flex-col lg:flex-row justify-center gap-2">
                    <div className="w-full">
                        <h1 className="text-lg font-bold">Customer Details</h1>
                        <div className="bg-gray-100 rounded-xl mt-2 p-3">
                            <p className="flex gap-2">
                                <span className="font-semibold">
                                    Customer ID:
                                </span>{" "}
                                {customerId}
                            </p>
                            <p className="flex gap-2">
                                <span className="font-semibold">Name:</span>{" "}
                                {customer?.name}
                            </p>
                            <p className="flex gap-2">
                                <span className="font-semibold">Email:</span>{" "}
                                {customer?.email}
                            </p>
                            <p className="flex gap-2">
                                <span className="font-semibold">Phone:</span>{" "}
                                {customer?.phone}
                            </p>
                            <p className="flex gap-2">
                                <span className="font-semibold">Address:</span>{" "}
                                {customer?.address}
                            </p>
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className="text-lg font-bold">Order Details</h1>
                        {items.map((item: any) => (
                            <OrderItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>
                <div className="mt-2">
                    <p className="text-lg font-bold">
                        Total Price: {totalPrice} Taka
                    </p>
                </div>
            </Modal>
        </tr>
    );
};

export default OrderRow;
