"use client";

import Image from "next/image";
import { Flex, Rate } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "./ProductCard";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const desc: string[] = ["terrible", "bad", "normal", "good", "wonderful"];

interface ProductType {
  id: number;
  product_id: number;
  images: string[];
  product_name: string;
  price: number;
  discount_price: number;
  description: string;
  rating: number;
}

const FeaturedProducts = () => {
  const [data, setData] = useState<ProductType[] | null>(null);
  const [hoverStates, setHoverStates] = useState<{ [key: number]: boolean }>(
    {}
  );

  // Function to handle mouse enter event for a specific product
  const handleMouseEnter = (productId: number) => {
    setHoverStates((prevStates) => ({
      ...prevStates,
      [productId]: true,
    }));
  };

  // Function to handle mouse leave event for a specific product
  const handleMouseLeave = (productId: number) => {
    setHoverStates((prevStates) => ({
      ...prevStates,
      [productId]: false,
    }));
  };

  // const { data: featuredProducts = [] } = useQuery<ProductType[]>({
  //     queryKey: ["featuredProducts"],
  //     queryFn: async () => {
  //         const res = await axios.get(
  //             `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/all-products`
  //         );
  //         return res.data.data;
  //     },
  //     retry: 2,
  //     refetchOnWindowFocus: false,
  // });

  useEffect(() => {
    fetch("/productData/productData.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  console.log(data);

  return (
    <div className="max-w-[76%] mx-auto my-20">
      <div className="">
        <h3 className="text-center italic font-medium">Wonderful gifts</h3>
        <h1 className="text-center text-5xl font-medium">Featured Products</h1>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-10 mt-20">
        {data?.map((item) => (
          <ProductCard key={item.id} item={item} desc={desc} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
