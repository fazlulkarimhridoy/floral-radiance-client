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

    console.log(srcList)

    // const images = typeof srcList === "string" ? JSON.parse(item.images) : [];
    return (
        <div className=" space-y-4">
            <div className=" box-shadow p-2 rounded-xl flex justify-center">
                <Image alt="product" src={srcList[0]} className="w-full" />
            </div>
            {/* packaging image */}
            <div className="flex justify-between overflow-x-scroll gap-4">
                <div className="  p-2 rounded-xl">
                    <Image width={100} alt="product" src={srcList[1]} />
                </div>
                <div className=" p-2 rounded-xl">
                    <Image width={100} alt="product" src={srcList[2]} />
                </div>
                <div className="box-shadow border  p-2 rounded-xl">
                    <Image width={100} alt="product" src={srcList[2]} />
                </div>
            </div>
        </div>
    );
};

export default ImageDetails;
