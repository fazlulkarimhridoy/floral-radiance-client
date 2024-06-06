"use client"

import React from "react";
import { Image } from "antd";

interface srcType{
  src : string
}

const ProductImage : React.FC<srcType> = ({src}) => {

    return (
      <div>
        <Image
          alt="flower"
          width={200}
          src={src}
        />
      </div>
    );


  

};

export default ProductImage;
