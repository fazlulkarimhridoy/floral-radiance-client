"use client"

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

  return (
    <div>
      <Image
        alt="product"
        width={200}
        src={srcList[0]}
      />
    </div>
  );
};

export default ProductImage;

