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
        <div className=" max-w-[400px]   space-y-4">
            <div className="  p-2 rounded-xl flex justify-center">
                <Image width={400} alt="product" src={'https://images.unsplash.com/photo-1502089418555-ebcba08cb377?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} className="" />
            </div>
            {/* packaging image */}
            <div className="flex justify-around overflow-x-scroll gap-4 p-2">
                <div className="  p-2 rounded-xl">
                    <Image width={100} alt="product" src={srcList[1]} />
                </div>
                <div className=" p-2 rounded-xl">
                    <Image width={100} alt="product" src={srcList[2]} />
                </div>
                <div className="  p-2 rounded-xl">
                    <Image width={100} alt="product" src={srcList[2]} />
                </div>
                <div className="  p-2 rounded-xl">
                    <Image width={100} alt="product" src={srcList[2]} />
                </div>
                <div className="  p-2 rounded-xl">
                    <Image width={100} alt="product" src={srcList[2]} />
                </div>
            </div>
        </div>
    );
};

export default ImageDetails;
