import React from "react";
import { Carousel } from "antd";
import Image from "next/image";
import BannerContent from "@/components/pages/Home/BannerContent";
const Banner = () => {
  return (
    <div className="">
      {/* <Carousel arrows>
          <div className="h-[650px]"><BannerContent/></div>
          <div><BannerContent/></div>
          <div><BannerContent/></div>
          <div><BannerContent/></div>
          <div><BannerContent/></div>
          
      </Carousel> */}
      <BannerContent/>
    </div>
  );
};

export default Banner;
