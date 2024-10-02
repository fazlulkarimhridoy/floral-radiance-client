"use client";

// import { Image   } from "antd";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Button, Input, message } from "antd";
import { FaMobileAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import type { TimePickerProps } from "antd";
import { TimePicker } from "antd";
import { FaCalendar } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { FaMoneyBillWave } from "react-icons/fa";
import CartTotal from "@/components/pages/Cart/CartTotal";
import { FaAngleDown } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";

interface FormData {
    mobileNumber: string;
    deliveryAddress: string;
    deliveryDate: string;
    deliveryTime: string;
    suggetion: string;
    cashOnDelivery: boolean;
}

interface CartItem {
    id: number;
    product_name: string;
    images: string;
    price: number;
}

const Page = () => {
    const [cartData, setCartData] = useState<CartItem[]>([]);
    const [showData, setShowData] = useState(false);
    // const [formData, setFormData] = useState<FormData>({
    //     mobileNumber: "",
    //     deliveryAddress: " ",
    //     deliveryDate: "",
    //     deliveryTime: "",
    //     suggetion: "",
    //     cashOnDelivery: false,
    // });
    const [name, setname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [deliveryDate, setDeliveryDate] = useState<string | string[]>([]);
    const [deliveryTime, setDeliveryTime] = useState<string | string[]>([]);
    const [note, setNote] = useState("");
    const [cashOnDelivery, setCashOnDelivery] = useState(false);

    // Retrieve cart data from localStorage when the component mounts
    useEffect(() => {
        const storedCart = localStorage.getItem("cartItem");
        if (storedCart) {
            setCartData(JSON.parse(storedCart));
        }
    }, []);

    const removeFromCart = (id: number) => {
        // selected id data should be deleted from local storage
        const updatedCartData = cartData.filter((item) => item.id !== id);
        localStorage.setItem("cartItem", JSON.stringify(updatedCartData));
        setCartData(updatedCartData);
    };

    // calculate cart data price total
    const calculateTotal = () => {
        return cartData.reduce((total, item) => total + item.price, 0);
    };

    const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
        setDeliveryDate(dateString);
        console.log(dateString);
    };

    const onChangeTime: TimePickerProps["onChange"] = (time, timeString) => {
        setDeliveryTime(timeString);
        console.log(timeString);
    };
    const { TextArea } = Input;

    const onChangeNote = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setNote(e.target.value);
        console.log(e.target.value);
    };

    // handle full name
    const handleCustomerNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setname(e.target.value);
        console.log(e.target.value);
    };

    // handle phone
    const handlePhoneNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPhone(e.target.value);
        console.log(e.target.value);
    };

    // handle address
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        console.log(e.target.value);
    };

    // handle cash on delivery
    const handleCashOnDeliveryChange = () => {
        setCashOnDelivery(true);
        console.log(cashOnDelivery);
    };
    // handle email
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        console.log(e.target.value);
    };

    const handleSubmitData = async () => {
        if (
            !name ||
            !phone ||
            !email ||
            !address ||
            !deliveryDate ||
            !deliveryTime
        ) {
            message.error("Please fill in all required fields.");
            return;
        }

        if (cartData.length === 0) {
            message.error("Your cart is empty.");
            return;
        }

        try {
            // Create customer
            const customerResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/customer/add-customer`,
                {
                    name,
                    phone,
                    email,
                    address,
                }
            );

            if (customerResponse.data.status !== "success") {
                throw new Error("Failed to create customer.");
            }

            console.log("customer",customerResponse);
            const customerId = customerResponse.data.data.id;

            // Create order
            const orderResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/add-order`,
                {
                    customerId,
                    totalPrice: calculateTotal(),
                    deliveryDate,
                    deliveryTime,
                    orderStatus: "PENDING",
                    items: cartData.map((item) => ({
                        productId: item.id,
                        quantity: 1,
                        price: item.price,
                    })),
                    paymentMethod: cashOnDelivery
                        ? "CASH_ON_DELIVERY"
                        : "ADVANCE_PAYMENT",
                    // note,
                }
            );

            console.log(orderResponse);
            if (orderResponse.data.status !== "success") {
                throw new Error("Failed to create order.");
            }

            localStorage.removeItem("cartItem");
            setCartData([]);

            message.success("Order placed successfully!");
            window.location.href = "/"; // Adjust the redirect URL as needed
        } catch (error: any) {
            console.error(error);
            message.error(
                error.message || "An error occurred while placing the order."
            );
        }
    };

    return (
        <div className="bg-[#f2f6f9] p-4 space-y-4">
            <h1 className="text-4xl font-outfit text-center font-semibold">
                Place your order
            </h1>
            <div className=" w-full p-0  font-outfit space-y-4 gap-4 bg-white rounded-xl box-shadow flex flex-col md:flex-row-reverse justify-center relative ">
                <div>
                    {/* Product information */}
                    <div
                        onClick={() => setShowData(!showData)}
                        className="p-2 flex justify-between items-center transition-all"
                    >
                        Show order summary <FaAngleDown />{" "}
                    </div>
                    {showData && (
                        <div className="overflow-x-auto scroll-smooth pt-4 mb-5 md:mb-0">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product & image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* rows */}
                                    {cartData?.length > 0 &&
                                        cartData?.map((data, index) => (
                                            <tr key={data?.id}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <Image
                                                                    width={500}
                                                                    height={500}
                                                                    src={
                                                                        data?.images
                                                                    }
                                                                    alt="product-image"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="text-gray-600 font-bold">
                                                        {data?.product_name}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="text-gray-600 font-bold">
                                                        {data?.price}
                                                    </div>
                                                </td>

                                                <td>
                                                    <Button
                                                        onClick={() =>
                                                            removeFromCart(
                                                                data?.id
                                                            )
                                                        }
                                                        className="btn btn-circle btn-outline btn-sm"
                                                    >
                                                        <FaTrash className="text-red-600"></FaTrash>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div>
                        <CartTotal
                            calculateTotal={calculateTotal}
                            show={false}
                        ></CartTotal>
                    </div>
                </div>
                <div className="md:border-r-2 md:border-black">
                    {/* Submit Form Section */}
                    <div className=" p-4 space-y-8">
                        {/*Customer name */}
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex flex-col gap-2 w-full">
                                <label
                                    htmlFor=""
                                    className="text-xl flex gap-2 items-center text-[#3d4349]"
                                >
                                    {" "}
                                    Full Name:
                                </label>
                                <Input
                                    required
                                    type="string"
                                    maxLength={100}
                                    placeholder="first name"
                                    className="w-[300px]"
                                    onChange={handleCustomerNameChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label
                                    htmlFor=""
                                    className="text-xl flex gap-2 items-center text-[#3d4349]"
                                >
                                    {" "}
                                    <FaMobileAlt /> Mobile Number:
                                </label>
                                <Input
                                    required
                                    type="number"
                                    maxLength={11}
                                    placeholder="017XXXXXXXX"
                                    className=""
                                    onChange={handlePhoneNumberChange}
                                />
                            </div>
                        </div>
                        {/*Customer mobile number */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor=""
                                className="text-xl flex gap-2 items-center text-[#3d4349]"
                            >
                                {" "}
                                <FaMobileAlt /> Email Address:
                            </label>
                            <Input
                                required
                                type="string"
                                placeholder="abc@example.com"
                                className=""
                                onChange={handleEmailChange}
                            />
                        </div>
                        {/* Delivery address */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor=""
                                className="text-xl flex gap-2 items-center text-[#3d4349]"
                            >
                                {" "}
                                <FaLocationDot /> Delivery Address:
                            </label>
                            <Input
                                required
                                type="string"
                                maxLength={100}
                                placeholder="address"
                                className=""
                                onChange={handleAddressChange}
                            />
                        </div>
                        {/* delivery date and time */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor=""
                                    className="text-xl flex gap-2 items-center text-[#3d4349]"
                                >
                                    {" "}
                                    <FaCalendar /> Delivey date:
                                </label>
                                <DatePicker
                                    className="w-[300px]"
                                    onChange={onChangeDate}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor=""
                                    className="text-xl flex gap-2 items-center text-[#3d4349]"
                                >
                                    {" "}
                                    <FaClock /> Delivey time:
                                </label>
                                <TimePicker
                                    use12Hours
                                    onChange={onChangeTime}
                                    className="w-[300px]"
                                />
                            </div>
                        </div>
                        {/* Customer Notes for gifts */}
                        <div className="flex flex-col gap-4 ">
                            <div>
                                <label
                                    htmlFor=""
                                    className="text-xl flex gap-2 items-center text-[#3d4349]"
                                >
                                    {" "}
                                    <GiNotebook /> Any notes for this gift:
                                </label>
                                <TextArea
                                    className="w-full"
                                    showCount
                                    maxLength={100}
                                    onChange={onChangeNote}
                                    placeholder="any suggetion for notes"
                                    style={{ height: 120, resize: "none" }}
                                />
                            </div>
                        </div>
                        {/* Buttons for payment method */}
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleCashOnDeliveryChange}
                                className="hover:bg-[#7a71b1] border-2 border-[#7a71b1] px-3 py-2 hover:text-white text-xl rounded-md flex items-center gap-2 w-full text-[#7a71b1]"
                            >
                                <FaMoneyBillWave />
                                Cash on Delivery
                            </button>
                            <button className="hover:bg-[#7a71b1] border-2 border-[#7a71b1] px-3 py-2 hover:text-white text-xl rounded-md flex items-center gap-2 text-[#7a71b1]">
                                Advance Payment
                            </button>
                            <button
                                onClick={handleSubmitData}
                                type="submit"
                                className="bg-[#7a71b1] border-2 border-[#7a71b1] px-3 py-2 text-white text-xl rounded-md flex items-center justify-center gap-2 text-center"
                            >
                                Complete order
                            </button>
                        </div>
                    </div>
                </div>
                {/* <Image
          className="absolute -right-80"
          width={600}
          height={700}
          src="/Icon/artOne.png"
          alt="artImage"
        /> */}
            </div>
        </div>
    );
};

export default Page;
