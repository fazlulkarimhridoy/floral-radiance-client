"use client";

import React from "react";
import { Image } from "antd";

interface SrcType {
    srcList: string[];
}

const ImageDetails: React.FC<SrcType> = ({ srcList }) => {
    if (!srcList || srcList.length === 0) {
        return <p>No images available</p>;
    }

    // const images = typeof srcList === "string" ? JSON.parse(item.images) : [];
    return (
        <div className=" space-y-4">
            <div className="border-4 border-[#f472b6] p-2 rounded-xl">
                <Image alt="product" src="" className="w-full lg:w-[400px]" />
            </div>
            {/* packaging image */}
            <div className="flex justify-between overflow-x-scroll gap-4">
                <div className="border-4 border-[#f472b6] p-2 rounded-xl">
                    <Image width={100} alt="product" src="" />
                </div>
                <div className="border-4 border-[#f472b6] p-2 rounded-xl">
                    <Image width={100} alt="product" src="" />
                </div>
                <div className="border-4 border-[#f472b6] p-2 rounded-xl">
                    <Image width={100} alt="product" src="" />
                </div>
            </div>
        </div>
    );
};

export default ImageDetails;
