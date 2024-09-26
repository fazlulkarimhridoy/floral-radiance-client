"use client";

// import { Image   } from "antd";
import React, { useState } from "react";
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
import Image from "next/image";

interface FormData {
  mobileNumber: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  suggetion: string;
  cashOnDelivery: boolean;
}

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    mobileNumber: "",
    deliveryAddress: " ",
    deliveryDate: "",
    deliveryTime: "",
    suggetion: "",
    cashOnDelivery: false,
  });

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
      <h1 className="text-4xl font-outfit text-center font-semibold">Place your order</h1>
      <div className=" w-full lg:w-[80%]  p-2 font-outfit space-y-4 gap-4 bg-white rounded-xl box-shadow flex relative">
        <div className="">
          {/* Product information */}
          <section className="flex  gap-4  w-full  mx-auto p-4 ">
            <Image
              src={`/Images/productImage.jpg`}
              width={100}
              height={100}
              alt="flower image"
              className="w-[200px] rounded-xl "
            />
            {/* product data */}
            <div className="w-[40%]">
              <h1 className="text-4xl font-outfit text-[#3d4349]">Red Rose</h1>
              <h1 className="text-xl font-outfit text-[#3d4349]">
                Quantity: 250
              </h1>
              <h3 className="text-[#7a71b1] font-outfit text-xl font-bold flex  items-center">
                Price: 550 <TbCurrencyTaka />
              </h3>
              <h3 className="text-xl font-outfit text-[#3d4349]">
                Details : Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Dolores corporis voluptas, dicta totam exercitationem
                reprehenderit laboriosam pe
              </h3>
            </div>
          </section>
          {/* Submit Form Section */}
          <form className=" p-4 space-y-8">
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
                className="w-[300px]"
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
                className="w-[300px]"
              />
            </div>
            {/* delivery date and time */}
            <div className="flex gap-4">
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
            <div className="flex gap-4 items-center">
              <div>
                <label
                  htmlFor=""
                  className="text-xl flex gap-2 items-center text-[#3d4349]"
                >
                  {" "}
                  <GiNotebook /> Any notes for this gift:
                </label>
                <TextArea
                  className="w-[620px]"
                  showCount
                  maxLength={100}
                  onChange={onChangeNote}
                  placeholder="any suggetion for notes"
                  style={{ height: 120, resize: "none" }}
                />
              </div>
              {/* Buttons for payment method */}
              <div className="flex flex-col gap-4">
                <button className="bg-[#7a71b1] px-3 py-1 text-white text-xl rounded-md flex items-center gap-2 w-56">
                  <FaMoneyBillWave />
                  Cash on Delivery
                </button>
                <button className="bg-[#7a71b1] px-3 py-1 text-white text-xl rounded-md flex items-center gap-2 w-56">
                  Advance Payment
                </button>
              </div>
            </div>
          </form>
        </div>
        <Image
          className="absolute -right-80"
          width={600}
          height={700}
          src="/Icon/artOne.png"
          alt="artImage"
        />
      </div>
    </div>
  );
};

export default Page;
