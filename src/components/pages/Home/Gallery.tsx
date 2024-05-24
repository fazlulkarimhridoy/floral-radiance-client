import Image from "next/image";
import gallery1 from "../../../assets/gallery/gallery-1.jpg"
import gallery2 from "../../../assets/gallery/gallery-2.jpg"
import gallery3 from "../../../assets/gallery/gallery-3.jpg"
import gallery4 from "../../../assets/gallery/gallery-4.jpg"
import gallery5 from "../../../assets/gallery/gallery-5.jpg"

const Gallery = () => {
    return (
        <div className="w-full xl:max-w-[76%] mx-auto flex flex-col lg:flex-row items-center justify-center gap-5 my-20">
            {/* first collumn */}
            <div className="relative">
                <Image
                    className="w-[285px] h-fit md:w-[690px] md:h-[400px] lg:w-[350px] lg:h-[380px] xl:w-[380px] xl:h-[495px] 2xl:w-[440px] cursor-pointer hover:shadow-2xl hover:transition-all hover:duration-500"
                    src={gallery1}
                    width={600}
                    alt="gallery-image-1" />
                <div className="absolute left-[40%] top-[45%] w-fit flex flex-col items-center justify-center px-3 py-1.5 bg-white cursor-pointer">
                    <h2 className="font-semibold">Potted Plants</h2>
                    <h4 className="text-xs text-pink-600">18 ITEMS</h4>
                </div>
            </div>
            {/* second collumn */}
            <div className="flex flex-col items-center justify-center gap-5">
                {/* row-1 */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                    <div className="relative">
                        <Image
                            className="w-full h-fit md:w-[365px] md:h-[240px] lg:w-[290px] lg:h-[180px] xl:h-[240px] 2xl:w-[365px] 2xl:h-[240px] cursor-pointer hover:shadow-2xl hover:transition-all hover:duration-500"
                            src={gallery2}
                            width={600}
                            alt="gallery-image-2" />
                        <div className="absolute left-[35%] top-[45%] w-fit flex flex-col items-center justify-center px-3 py-1.5 bg-white cursor-pointer">
                            <h2 className="font-semibold">Potted Plants</h2>
                            <h4 className="text-xs text-pink-600">18 ITEMS</h4>
                        </div>
                    </div>
                    <div className="relative">
                        <Image
                            className="w-full h-fit md:w-[305px] md:h-[240px] lg:w-[270px] lg:h-[180px] xl:h-[240px] 2xl:w-[305px] 2xl:h-[240px] cursor-pointer hover:shadow-2xl hover:transition-all hover:duration-500"
                            src={gallery3}
                            width={600}
                            alt="gallery-image-3" />
                        <div className="absolute left-[30%] top-[45%] w-fit flex flex-col items-center justify-center px-3 py-1.5 bg-white cursor-pointer">
                            <h2 className="font-semibold">Potted Plants</h2>
                            <h4 className="text-xs text-pink-600">18 ITEMS</h4>
                        </div>
                    </div>
                </div>
                {/* row-2 */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                    <div className="relative">
                        <Image
                            className="w-[285px] h-fit md:w-[235px] md:h-[235px] lg:w-[210px] lg:h-[180px] xl:h-[230px] 2xl:w-[235px] 2xl:h-[235px] cursor-pointer hover:shadow-2xl hover:transition-all hover:duration-500"
                            src={gallery4}
                            width={600}
                            alt="gallery-image-4" />
                        <div className="absolute left-[25%] top-[40%] w-fit flex flex-col items-center justify-center px-3 py-1.5 bg-white cursor-pointer">
                            <h2 className="font-semibold">Potted Plants</h2>
                            <h4 className="text-xs text-pink-600">18 ITEMS</h4>
                        </div>
                    </div>
                    <div className="relative">
                        <Image
                            className="w-[285px] h-fit md:w-[440px] md:h-[235px] lg:w-[350px] lg:h-[180px] xl:h-[230px] 2xl:w-[440px] 2xl:h-[235px] cursor-pointer hover:shadow-2xl hover:transition-all hover:duration-500"
                            src={gallery5}
                            width={600}
                            alt="gallery-image-5" />
                        <div className="absolute left-[35%] top-[40%] w-fit flex flex-col items-center justify-center px-3 py-1.5 bg-white cursor-pointer">
                            <h2 className="font-semibold">Potted Plants</h2>
                            <h4 className="text-xs text-pink-600">18 ITEMS</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;