import React from "react";
import { Select } from "antd";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const ShipmentCalculator = () => {
  const onChange = (value: string) => {
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
              value: "kotwali",
              label: "Kotwali",
            },
            {
              value: "mohammadpur",
              label: "mohammadpur",
            },
            {
              value: "wari",
              label: "Wari",
            },
            {
              value: "jatrabari",
              label: "Jatrabari",
            },
            {
              value: "demra",
              label: "Demra",
            },
            {
              value: "gandaria",
              label: "Gandaria",
            },
            {
              value: "dhanmondi",
              label: "Dhanmondi",
            },
            {
              value: "hazaribagh",
              label: "Hazaribagh",
            },
            {
              value: "kamrangirchar",
              label: "Kamrangirchar",
            },
            {
              value: "lalbagh",
              label: "Lalbagh",
            },
            {
              value: "chawkbazar",
              label: "Chawkbazar",
            },
            {
              value: "sutrapur",
              label: "Sutrapur",
            },
            {
              value: "shyampur",
              label: "Shyampur",
            },
            {
              value: "kadamtali",
              label: "Kadamtali",
            },
            {
              value: "bangshal",
              label: "Bangshal",
            },
            {
              value: "shahbagh",
              label: "Shahbagh",
            },
            {
              value: "new_market",
              label: "New Market",
            },
            {
              value: "kalabagan",
              label: "Kalabagan",
            },
            {
              value: "gulshan",
              label: "Gulshan",
            },
            {
              value: "banani",
              label: "Banani",
            },
            {
              value: "tejgaon",
              label: "Tejgaon",
            },
            {
              value: "mohakhali",
              label: "Mohakhali",
            },
            {
              value: "cantonment",
              label: "Cantonment",
            },
            {
              value: "uttara",
              label: "Uttara",
            },
            {
              value: "turag",
              label: "Turag",
            },
            {
              value: "khilkhet",
              label: "Khilkhet",
            },
            {
              value: "badda",
              label: "Badda",
            },
            {
              value: "rampura",
              label: "Rampura",
            },
            {
              value: "dakhin_khan",
              label: "Dakhin Khan",
            },
            {
              value: "vatara",
              label: "Vatara",
            },
            {
              value: "pallabi",
              label: "Pallabi",
            },
            {
              value: "mirpur",
              label: "Mirpur",
            },
            {
              value: "shah_ali",
              label: "Shah Ali",
            },
            {
              value: "kafrul",
              label: "Kafrul",
            },
          ]}
      />

      <h1 className="flex items-center text-lg text-fade-black">Estimate Delivery cost: 200<FaBangladeshiTakaSign className="text-sm" /></h1>

      <div>
        <button className="text-white bg-black w-full p-2 rounded-lg">Calculate delivery cost</button>
      </div>
    </div>
  );
};

export default ShipmentCalculator;
