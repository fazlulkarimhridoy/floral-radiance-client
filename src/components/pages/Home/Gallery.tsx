import Image from "next/image";
import gallery1 from "../../../assets/gallery/gallery-1.jpg"
import gallery2 from "../../../assets/gallery/gallery-2.jpg"
import gallery3 from "../../../assets/gallery/gallery-3.jpg"
import gallery4 from "../../../assets/gallery/gallery-4.jpg"
import gallery5 from "../../../assets/gallery/gallery-5.jpg"

const Gallery = () => {
    return (
        <div className="w-full md:max-w-[76%] mx-auto flex flex-col md:flex-row items-center justify-center gap-5 my-20">
            {/* first collumn */}
            <div>
                <Image
                    className="w-full h-fit md:w-[440px] md:h-[490px]"
                    src={gallery1}
                    width={600}
                    alt="gallery-image-1" />
            </div>
            {/* secondt collumn */}
            <div className="flex flex-col items-center justify-center gap-5">
                {/* row-1 */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                    <Image
                        className="w-full h-fit md:w-[365px] md:h-[240px]"
                        src={gallery2}
                        width={600}
                        alt="gallery-image-2" />
                    <Image
                        className="w-full h-fit md:w-[305px] md:h-[240px]"
                        src={gallery3}
                        width={600}
                        alt="gallery-image-3" />
                </div>
                {/* row-2 */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                    <Image
                        className="w-full h-fit md:w-[235px] md:h-[235px]"
                        src={gallery4}
                        width={600}
                        alt="gallery-image-4" />
                    <Image
                        className="w-full h-fit md:w-[440px] md:h-[235px]"
                        src={gallery5}
                        width={600}
                        alt="gallery-image-5" />
                </div>
            </div>
        </div>
    );
};

export default Gallery;