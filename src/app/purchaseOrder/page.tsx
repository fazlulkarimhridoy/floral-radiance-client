"use client";

// import { Image   } from "antd";
import React, { useContext, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { Input } from "antd";
import { FaMobileAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import type { TimePickerProps } from "antd";
import { Space, TimePicker } from "antd";
import { FaCalendar } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { FaMoneyBillWave } from "react-icons/fa";
import { Table, Tag } from "antd";
import CartTotal from "@/components/pages/Cart/CartTotal";
import { Dropdown} from 'antd';
import { FaAngleDown } from "react-icons/fa";

import Image from "next/image";
import { CartContext } from "@/context/CartContext";

interface FormData {
  mobileNumber: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  suggetion: string;
  cashOnDelivery: boolean;
}

const Page = () => {
  const cartContext = useContext(CartContext);

  const [showData,setShowData] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    mobileNumber: "",
    deliveryAddress: " ",
    deliveryDate: "",
    deliveryTime: "",
    suggetion: "",
    cashOnDelivery: false,
  });

  if (!cartContext) {
    return null;
  }

  const { cart, removeFromCart, calculateTotal } = cartContext;

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Product info",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => removeFromCart(record.id)}>
            <FaRegTrashAlt />
          </a>
        </Space>
      ),
    },
  ];

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChangeTime: TimePickerProps["onChange"] = (time, timeString) => {
    console.log(time, timeString);
  };
  const { TextArea } = Input;

  const onChangeNote = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="bg-[#f2f6f9] p-4 space-y-4">
      <h1 className="text-4xl font-outfit text-center font-semibold">
        Place your order
      </h1>
      <div className=" w-full p-0  font-outfit space-y-4 gap-4 bg-white rounded-xl box-shadow flex flex-col md:flex-row-reverse relative ">
        <div>
          {/* Product information */}
          <div onClick={() => setShowData(!showData)} className="p-2 flex justify-between items-center transition-all">Show order summary <FaAngleDown /> </div>
          {showData && <Table dataSource={cart} columns={columns} />}
          <CartTotal show={false}></CartTotal>
        </div>
        <div className="md:border-r-2 md:border-black">
          {/* Submit Form Section */}
          <form className=" p-4 space-y-8">
            {/*Customer name */}
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-xl flex gap-2 items-center text-[#3d4349]"
                >
                  {" "}
                  First Name:
                </label>
                <Input
                  required
                  type="string"
                  maxLength={100}
                  placeholder="first name"
                  className="w-[300px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="text-xl flex gap-2 items-center text-[#3d4349]"
                >
                  {" "}
                  Last Name:
                </label>
                <Input
                  required
                  type="string"
                  maxLength={100}
                  placeholder="last name"
                  className="w-[300px]"
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
                <FaMobileAlt /> Mobile Number:
              </label>
              <Input
                required
                type="number"
                maxLength={11}
                placeholder="017XXXXXXXX"
                className=""
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
                <DatePicker className="w-[300px]" onChange={onChangeDate} />
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
              <button className="hover:bg-[#7a71b1] border-2 border-[#7a71b1] px-3 py-2 hover:text-white text-xl rounded-md flex items-center gap-2 w-full text-[#7a71b1]">
                <FaMoneyBillWave />
                Cash on Delivery
              </button>
              <button className="hover:bg-[#7a71b1] border-2 border-[#7a71b1] px-3 py-2 hover:text-white text-xl rounded-md flex items-center gap-2 text-[#7a71b1]">
                Advance Payment
              </button>
              <button className="bg-[#7a71b1] border-2 border-[#7a71b1] px-3 py-2 text-white text-xl rounded-md flex items-center justify-center gap-2 text-center">
                Complete order
              </button>
            </div>
          </form>
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
