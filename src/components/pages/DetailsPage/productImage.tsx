"use client"

import React from "react";
import { Image } from "antd";

interface srcType{
  src : Array<string>
}

const ProductImage : React.FC<srcType> = ({src}) => {

  console.log('src:    ', src);
  return (
    <div>
      <Image
        alt="flower"
        width={200}
        src={src[0]}
      />
    </div>
  );
};

export default ProductImage;
