"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
const Cart: React.FC = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const { cart, removeFromCart, calculateTotal } = cartContext;

  return (
    // <div className="mt-8">
    //   <h2 className="text-xl font-bold">Cart</h2>
    //   <ul>
    //     {cart.map((item) => (
    //       <li key={item.id} className="border p-2 my-2 flex justify-between">
    //         {item.product_name} - ${item.price}
    //         <button
    //           onClick={() => removeFromCart(item.id)}
    //           className="bg-red-500 text-white px-2 rounded"
    //         >
    //           Remove
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    //   <div className="mt-4 text-lg font-bold">
    //     Total: ${calculateTotal()}
    //   </div>
    // </div>

    <div>
      <div className="">
        <ul className=" list-none grid grid-cols-6 text-center">
          <li className="border-2 border-[#f4f4f4]">Image</li>
          <li className="border-2 border-[#f4f4f4]">Product Info</li>
          <li className="border-2 border-[#f4f4f4]">Price</li>
          <li className="border-2 border-[#f4f4f4]">Quantity</li>
          <li className="border-2 border-[#f4f4f4]">Remove</li>
          <li className="border-2 border-[#f4f4f4]">Total</li>
        </ul>
      
          {cart.map((item) => (
            <ul key={item.id} className="grid grid-cols-6 text-center ">
              <li
                className="border-[1px] border-[#f4f4f4]"
              >
                {item.product_name}
              </li>
              <li className="border-[1px] border-[#f4f4f4]"><p className="p-2">{item.description}</p></li>
              <li className="border-[1px] border-[#f4f4f4]">{item.price}</li>
              <li className="border-[1px] border-[#f4f4f4]">quantity</li>
              <li className=" flex justify-center border-[1px] border-[#f4f4f4]"><FaRegTrashAlt /></li>
              <li className="border-[1px] border-[#f4f4f4]">Total</li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default Cart;
