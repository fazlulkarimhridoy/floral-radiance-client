import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="bg-[#c3b2e8] space-y-10 p-4">
      <h1 className="playfair text-center text-4xl font-bold text-[#52225e]">
        About Us
      </h1>
      <div className="flex justify-center ">
        <Image
          src={`/Images/miraz.jfif`}
          alt="image"
          width={500}
          height={100}
          className="rounded-xl box-shadow"
        ></Image>
      </div>

      <p className="font-outfit text-[#52225e] text-lg max-w-[800px] text-center mx-auto">
        About Floral Radiance Founded in 2022, Floral Radiance has blossomed
        into a trusted provider of premium fresh flower bouquets. Our journey
        began with a simple mission: to bring the beauty and elegance of fresh
        flowers to life’s most cherished moments. Since our inception, we’ve had
        the honor of serving over 3,000 customers, becoming a part of countless
        celebrations, milestones, and everyday joys. At Floral Radiance, we
        believe that flowers are more than just arrangements; they are
        expressions of love, gratitude, and happiness. Whether you’re
        celebrating a wedding, birthday, or just brightening someone’s day, our
        carefully crafted bouquets are designed to elevate any occasion. With a
        passion for quality and an eye for detail, we source only the finest
        blooms to ensure each bouquet is as vibrant and radiant as your special
        moments. Thank you for allowing us to be a part of your celebrations. We
        look forward to continuing to bring floral beauty into your life!
      </p>
    </div>
  );
};

export default Page;
