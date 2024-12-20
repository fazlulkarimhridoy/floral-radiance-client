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

    // const images = typeof srcList === "string" ? JSON.parse(item.images) : [];
    return (
        <div className=" max-w-[450px] mx-auto space-y-4 p-4 relative">
            <Carousel>
                <CarouselContent>
                    {srcList.map((item, idx) => {
                        return (
                            <CarouselItem key={idx}>
                                <Image
                                    className="rounded-lg w-full"
                                    alt="product"
                                    src={item}
                                />
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <div className="hidden lg:block">
                    <CarouselPrevious className="w-" />
                </div>
                <div className=" hidden lg:block ">
                    {" "}
                    <CarouselNext />
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
