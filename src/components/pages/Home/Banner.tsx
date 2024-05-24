import React from "react";
import { Carousel } from "antd";
import Image from "next/image";

const Banner = () => {
  return (
    <div>
      <Carousel >
        <div className="">
          <div className="flex justify-center bg-[#e8e8e8] items-center">
            <div className=" max-w-[400px] space-y-4">
              <p className="text-lg font-semibold bg-pink-600 text-white w-28 text-center rounded-full">Top Trend</p>
              <h1 className="text-3xl font-semibold">2024 flower trend</h1>
              <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias quod reprehenderit pariatur porro harum eligendi in
                eius modi sint tempora!
              </p>
              <button>Shop Now</button>
            </div>
            <div>
              <Image
                width={400}
                height={300}
                src={"/Images/redRose.jpg"}
                alt="flower"
              ></Image>
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </Carousel>
    </div>
  );
};

export default Banner;
