"use client";

import React from "react";
import { Image } from "antd";


interface SrcType {
  srcList: string[];
}

const ProductImage: React.FC<SrcType> = ({ srcList }) => {
  console.log(srcList);
  if (!srcList || srcList.length === 0) {
    return <p>No images available</p>;
  }

  console.log(srcList.length)

  // const images = typeof srcList === "string" ? JSON.parse(item.images) : [];
  return (
    <div className=" space-y-4">
      <div className="border-4 border-[#f472b6] p-2 rounded-xl">
        <Image
          alt="product"
          
          src={`/Images/productImage.jpg`}
          className="w-full lg:w-[400px]"
          
        />
      </div>
      {/* packaging image */}
      <div className="flex justify-between overflow-x-scroll gap-4">
        <div className="border-4 border-[#f472b6] p-2 rounded-xl">
          <Image
            width={100}
            alt="product"
            src={`/Images/productImage.jpg`}
          />
        </div>
        <div className="border-4 border-[#f472b6] p-2 rounded-xl">
          <Image
            width={100}
            alt="product"
            src={`/Images/productImage.jpg`}
          />
        </div>
        <div className="border-4 border-[#f472b6] p-2 rounded-xl">
          <Image
            width={100}
            alt="product"
            src={`/Images/productImage.jpg`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
