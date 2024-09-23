import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const CartTotal = () => {
  return (
    <div className="font-outfit border-2 border-[rgb(162,182,195)] p-2 space-y-4 w-full lg:w-[600px] font-outfit rounded-xl">
      <h1 className="text-xl font-semibold text-fade-black">Cart Totals</h1>
      <p className="text-lg font-semibold text-fade-black flex justify-between">
        <span>Sub total:</span>{" "}
        <span className="flex items-center">
          200
          <FaBangladeshiTakaSign className="text-sm" />
        </span>{" "}
      </p>
      <p className="text-lg font-semibold text-fade-black flex justify-between">
        <span>Total:</span>{" "}
        <span className="flex items-center">
          200
          <FaBangladeshiTakaSign className="text-sm" />
        </span>{" "}
      </p>
      <div>
        <button className="text-white bg-[#7a71b1] w-full p-2 rounded-lg">
          Purchase Order
        </button>
      </div>
    </div>
  );
};

export default CartTotal;
