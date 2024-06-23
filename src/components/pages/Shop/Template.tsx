import Image from "next/image";
import React from "react";

const Template = () => {
  return (
    <div className="flex justify-between items-center bg-[#b8cedc] rounded-2xl relative  h-full w-full  p-4 ">
      <p className="font-dm text-4xl font-semibold self-end text-[#52225e]">Send BirthDay Gift with flowers</p>
      <div className=" w-56">
        <Image
          className="bg-[#b8cedc] "
          src={"/images/flowerImg2.png"}
          alt="flower"
          width={250}
          height={100}
        ></Image>
      </div>
    </div> 
  );
};

export default Template;
