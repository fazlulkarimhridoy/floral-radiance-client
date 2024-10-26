"use client"

import React, { useState } from "react";
import { Select } from "antd";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const ShipmentCalculator = () => {
  const [shipmentCost,setShipmentCost] = useState('')


  const onChange = (value: string) => {
    setShipmentCost(value)
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  return (
    <div className="font-outfit border-2 border-[rgb(162,182,195)] p-2 space-y-4 w-full lg:w-[600px] rounded-xl">
      <h1 className="font-semibold text-xl text-[#3d4349]">Getting shipment estimates</h1>
      <Select
        className="w-full"
        showSearch
        placeholder="Select a place In Dhaka"
        optionFilterProp="label"
        onChange={onChange}
        onSearch={onSearch}
        options = {[

            {
              value: "150",
              label: "mohammadpur",
            },

            {
              value: "150",
              label: "Dhanmondi",
            },
            {
              value: "150",
              label: "Gulshan",
            },
            {
              value: "150",
              label: "Banani",
            },
            {
              value: "250",
              label: "Uttara",
            },
            {
              value: "200",
              label: "Badda",
            },
            {
              value: "200",
              label: "Rampura",
            },
            {
              value: "150",
              label: "Mirpur",
            },
          ]}
      />

      <h1 className="flex items-center text-lg text-fade-black">Estimate Delivery cost: {shipmentCost}<FaBangladeshiTakaSign className="text-sm" /></h1>

      {/* <div>
        <button className="text-white bg-black w-full p-2 rounded-lg">Calculate delivery cost</button>
      </div> */}
    </div>
  );
};

export default ShipmentCalculator;
