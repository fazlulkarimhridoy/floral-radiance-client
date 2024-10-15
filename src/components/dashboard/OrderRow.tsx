import { Button, Modal } from "antd";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import OrderItem from "./OrderItem";

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

    // const parsedItems = JSON.parse(items);

    console.log("items", items);
    console.log("customers", customer);
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
            <td>{orderStatus}</td>
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
                        Total Price: {" "}
                        {totalPrice} Taka
                    </p>
                </div>
            </Modal>
        </tr>
    );
};

export default OrderRow;
