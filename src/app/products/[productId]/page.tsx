"use client";
import ProductImage from "@/components/pages/DetailsPage/productImage";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import Link from "next/link";

interface ProductType {
    id: number;
    product_id: number;
    images: string[];
    product_name: string;
    price: number;
    discount_price: number;
    description: string;
    rating: number;
}

interface SingleProductData {
    product_id: string;
    images: string[];
}

const Page = ({ params }: { params: { productId: string } }) => {
    console.log(params.productId);

    const [activeButton, setActiveButton] = useState<number | null>(null);
    // const [quantity, setQuantity] = useState(10)
    const [price, setPrice] = useState(250);

    const handlePrice = (quantity: number) => {
        if (price > 0) {
            setPrice(0);
        }
        setPrice(quantity * 250);
    };

    const handleClick = (buttonIndex: number): void => {
        setActiveButton(buttonIndex);
        handlePrice(buttonIndex);
    };

    //Fetching all product data

    const { data: featuredProducts = [] } = useQuery<ProductType[]>({
        queryKey: ["featuredProducts"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/all-products`
            );
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    console.log(featuredProducts);

    // Funtion for finding the selected product
    const findProduct = (item: ProductType) => {
        return Number(params.productId) === item?.id;
    };

    //single product data
    const singleProduct = featuredProducts?.find(findProduct);
    console.log(singleProduct);

    return (
        <div className=" lg:p-4">
            <h1 className="text-4xl">Details about product</h1>
            {singleProduct ? (
                <div className=" rounded-xl border-[#f472b6] md:flex gap-4 w-full lg:w-[83%] mx-auto p-6 bg-[#f4f4f4]">
                    <div className="">
                        <ProductImage srcList={singleProduct.images} />
                    </div>
                    <div className=" space-y-4">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-semibold text-pink-400">
                                Red Rose
                            </h1>
                            <p className="text-xl">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quas, officiis. Cumque
                                consequatur a quia natus ipsa veniam earum
                                quisquam fuga?
                            </p>
                        </div>
                        <div className="space-y-4 max-w-[400px] ">
                            <h1 className="text-xl font-dm font-semibold">
                                Quantity:
                            </h1>
                            <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-row justify-between ">
                                <button
                                    onClick={() => handleClick(1)}
                                    className={`  ${
                                        activeButton === 1
                                            ? "border-2 border-pink-950 border-spacing-4 btn-purple "
                                            : "border-none btn-purple"
                                    }`}
                                >
                                    10
                                </button>

                                <button
                                    onClick={() => handleClick(2)}
                                    className={` btn-purple ${
                                        activeButton === 2
                                            ? "border-2 border-black border-spacing-4"
                                            : "border-none"
                                    }`}
                                >
                                    20
                                </button>
                                <button
                                    onClick={() => handleClick(3)}
                                    className={` btn-purple ${
                                        activeButton === 3
                                            ? "border-2 border-black border-spacing-4"
                                            : "border-none"
                                    }`}
                                >
                                    50
                                </button>
                                <button className="btn-purple text-xl webkit-center">
                                    <FaPlus />
                                </button>
                            </div>
                            <div className="flex justify-between gap-2">
                                <div className="border-2 border-[#f635bf] flex-1  text-center rounded-lg py-4 text-[#184364] font-bold text-xl flex justify-center items-center">
                                    {price}{" "}
                                    <span>
                                        {" "}
                                        <TbCurrencyTaka />
                                    </span>
                                </div>
                                <Link
                                    href={`/purchaseOrder`}
                                    className="border-2 flex-shrink-0 border-[#f635bf] rounded-lg text-[#f635bf] hover:bg-[#f635bf] hover:text-white px-2 font-bold flex items-center"
                                >
                                    <button className="">Purchase</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default Page;
