"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { Space, Table, Tag } from 'antd';
import ShipmentCalculator from "@/components/pages/Cart/ShipmentCalculator";
import CartTotal from "@/components/pages/Cart/CartTotal";



const Cart: React.FC = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const { cart, removeFromCart, calculateTotal } = cartContext;





  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Product info',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => removeFromCart(record.id)} ><FaRegTrashAlt /></a>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full lg:w-[85%] mx-auto px-2 lg:px-0 py-4">
          <Table dataSource={cart} columns={columns} />
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <ShipmentCalculator/>
            {cart.length > 0 && <CartTotal show={true}/>} 
          </div>
       
    </div>
  );
};

export default Cart;
