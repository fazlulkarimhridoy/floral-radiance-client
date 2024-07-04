import { Flex } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { Rate } from "antd";

interface Item {
  id: number;
  images: string[];
  product_name: string;
  rating: number;
  discount_price: number;
  price: number;
}

interface ProductCardProps {
  item: Item;
  desc: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ item, desc }) => {
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

  // const images = typeof item?.images === "string" ? JSON.parse(item?.images) : [];

  return (
    <div
      key={item.id}
      className="group h-[400px] w-[300px] rounded-2xl border-2 p-2  hover:shadow-lg hover:transition-all hover:duration-400"
      onMouseEnter={() => handleMouseEnter(item.id)}
      onMouseLeave={() => handleMouseLeave(item.id)}
    >
      <div className="relative h-[270px] w-[260px] mx-auto">
        {item?.images.map((imageUrl: string, index: number) => (
          <Image
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
            width={500}
            height={500}
            className={`absolute inset-0 object-cover ${
              index === 0 ? "opacity-100" : "opacity-0"
            } group-hover:opacity-${index === 0 ? "0" : "100"}`}
          />
        ))}
      </div>

      {/* Product details */}
      <div className="text-center my-2">
        <h3 className="text-lg font-semibold">{item?.product_name}</h3>
        <Flex gap="middle" vertical className="mt-2">
          <Rate
            className="text-base text-pink-600"
            tooltips={desc}
            value={item?.rating}
          />
        </Flex>

        {/* Render the price or Add to Cart based on hover */}
        {!hoverStates[item.id] && (
          <p className="font-medium flex items-center justify-center gap-2 mt-2 border-2 w-32 mx-auto rounded-2xl border-[#f472b6] py-1">
            <span>${item?.discount_price}</span>
            <span className="line-through text-gray-400">${item?.price}</span>
          </p>
        )}
        {hoverStates[item.id] && (
          <div className="flex">
            <p className="font-medium flex items-center justify-center gap-2 mt-2 animate-fade-in cursor-pointer hover:text-pink-600 border-2 w-32 mx-auto rounded-2xl border-[#f472b6] py-1">
              Add to Cart
            </p>
            <p className="font-medium flex items-center justify-center gap-2 mt-2 animate-fade-in cursor-pointer hover:text-pink-600 border-2 w-32 mx-auto rounded-2xl border-[#f472b6] py-1">
              View details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
