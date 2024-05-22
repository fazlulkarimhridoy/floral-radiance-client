import Image from "next/image";
import Flower1 from "../../../assets/red-roses.jpg"
import Flower2 from "../../../assets/red-tulips.jpg"

const FeaturedProducts = () => {
    return (
        <div className="">
            
            <div>
                <a className="group block">
                    <div className="relative h-[350px] sm:h-[450px]">
                        <Image
                            src={Flower1}
                            alt="1"
                            width={600}
                            className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                        />

                        <Image
                            src={Flower2}
                            alt="2"
                            width={600}
                            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                        />
                    </div>
                </a>
            </div>
        </div>
    );
};

export default FeaturedProducts;