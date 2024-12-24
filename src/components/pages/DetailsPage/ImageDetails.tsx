"use client";

import React from "react";
import { Image } from "antd";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SrcType {
  srcList: string[];
}

const ImageDetails: React.FC<SrcType> = ({ srcList }) => {
  if (!srcList || srcList.length === 0) {
    return <p>No images available</p>;
  }

  console.log(srcList);

  return (
    <div className="max-w-[450px] mx-auto space-y-4 p-4 relative">
      <Carousel>
        <CarouselContent>
          {srcList.map((item, idx) => (
            <CarouselItem key={idx}>
              <Image
                className="rounded-lg w-full"
                alt="product"
                src={item}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Centered Navigation Buttons */}
        <div className="absolute -bottom-4 left-0 right-0 flex justify-center space-x-4 w-16 mx-auto">
          <CarouselPrevious className="bg-[#b8cedc] text-white p-2 rounded-full hover:bg-white transition duration-300" />
          <CarouselNext className="bg-[#b8cedc] text-white p-2 rounded-full hover:bg-white transition duration-300" />
        </div>
      </Carousel>
    </div>
  );
};

export default ImageDetails;


{
    /* <div className="p-2 flex justify-center">
<Image
    className="rounded-lg"
    width={450}
    alt="product"
    src={srcList[0]}
/>
</div> */
}
{
    /* packaging image */
}
{
    /* <div
style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
className="flex justify-around overflow-x-scroll"
>
{srcList[1] && (
    <div className="p-2">
        <Image
            className="rounded-lg"
            width={90}
            alt="product"
            src={srcList[1]}
        />
    </div>
)}
{srcList[2] && (
    <div className="p-2">
        <Image
            className="rounded-lg"
            width={90}
            alt="product"
            src={srcList[2]}
        />
    </div>
)}
{srcList[3] && (
    <div className="p-2">
        <Image
            className="rounded-lg"
            width={90}
            alt="product"
            src={srcList[3]}
        />
    </div>
)}
{srcList[4] && (
    <div className="p-2">
        <Image
            className="rounded-lg"
            width={90}
            alt="product"
            src={srcList[4]}
        />
    </div>
)}
</div> */
}
