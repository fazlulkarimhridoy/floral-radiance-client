import Image from "next/image";


const BannerContent = () => {
  return (
    <div>
      <div className="bg-pink-600">
        <div className="flex flex-col-reverse gap-4 md:flex-row justify-around bg-[#e8e8e8] items-center pt-4  h-[610px]">
          <div className=" max-w-[400px] space-y-4 px-2">
            <p className="text-lg font-semibold bg-pink-600 text-white w-28 text-center rounded-full">
              Top Trend
            </p>
            <h1 className="text-3xl font-semibold">2024 flower trend</h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              quod reprehenderit pariatur porro harum eligendi in eius modi sint
              tempora!
            </p>
            <button className="group relative inline-block overflow-hidden border border-pink-600 px-8 py-3 focus:outline-none focus:ring ">
              <span className="absolute inset-y-0 left-0 w-[2px] bg-pink-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

              <span className="relative text-sm font-medium text-pink-600 transition-colors group-hover:text-white">
                Shop Now
              </span>
            </button>
          </div>
          <div>
            <Image
              className="rounded-lg"
              width={400}
              height={300}
              src={"/Images/redRose.jpg"}
              alt="flower"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerContent;
