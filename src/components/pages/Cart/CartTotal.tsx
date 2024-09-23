import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

interface CartTotalProps {
  show: boolean;
}

const CartTotal: React.FC<CartTotalProps> = ({ show }) => {

  // const [total,setTotal] = useState()
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const { calculateTotal } = cartContext;

  const total = calculateTotal()

  console.log(calculateTotal());
  return (
    <div className="font-outfit border-2 border-[rgb(162,182,195)] p-2 space-y-4 w-full lg:w-[600px] font-outfit rounded-xl">
      <h1 className="text-xl font-semibold text-fade-black">Cart Totals</h1>
      <p className="text-lg font-semibold text-fade-black flex justify-between">
        <span>Sub total:</span>{" "}
        <span className="flex items-center">
          <p>{total}</p>
          <FaBangladeshiTakaSign className="text-sm" />
        </span>{" "}
      </p>
      <p className="text-lg font-semibold text-fade-black flex justify-between">
        <span>Total:</span>{" "}
        <span className="flex items-center">
          <p>{total}</p>
          <FaBangladeshiTakaSign className="text-sm" />
        </span>{" "}
      </p>
      {show && (
        <div>
          <Link href={"purchaseOrder"}>
            <button className="text-white bg-[#7a71b1] w-full p-2 rounded-lg">
              Purchase Order
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartTotal;
