"use client";
// import ProductImage from "@/components/pages/DetailsPage/productImage";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import Link from "next/link";

import { Flex, message, Rate } from "antd";
import { FaStar } from "react-icons/fa";
import { Spin } from "antd";
import { div } from "framer-motion/client";
import ImageDetails from "@/components/pages/DetailsPage/ImageDetails";

const desc: string[] = ["terrible", "bad", "normal", "good", "wonderful"];

interface ProductType {
    id: number;
    productId: number;
    images: string[];
    product_name: string;
    price: number;
    discount_price: number;
    description: string;
    rating: number;
    category: string;


}

interface CartItem {
    id: number;
    product_name: string;
    images: string;
    price: number;
}

const Page = ({ params }: { params: { slug: string } }) => {

    console.log(params.slug);


    const [modal1Open, setModal1Open] = useState(false);
    const [activeButton, setActiveButton] = useState<number | null>(null);
    // const [singleProduct , setSingleProduct] = useState<Array<string>>([])
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



    const { data: singleProduct } = useQuery<ProductType>({
        queryKey: ["singleProduct"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/details/${params.slug}`
            );
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        // Load cart data from localStorage
        const storedData = localStorage.getItem("cartItem");
        if (storedData) {
            setCartData(JSON.parse(storedData));
        }
    }, []);

    const [cartData, setCartData] = useState<CartItem[]>([]);

    const handleCart = async (
        id: number,
        product_name: string,
        images: string,
        price: number
    ) => {
        // Use functional state update to ensure you're working with the latest state
        setCartData((prevCardData) => [
            ...prevCardData,
            { product_name, images, price, id },
        ]);
        localStorage.setItem("cartItem", JSON.stringify(cartData));
        setModal1Open(true)
    };
    // Synchronize localStorage whenever the cardData state changes
    useEffect(() => {
        // Store the entire updated cart into localStorage
        localStorage.setItem("cartItem", JSON.stringify(cartData));
    }, [cartData]);


    console.log('single product', singleProduct)

    // show loader if data loads

    return (
        <div className=" md:w-[70%] mx-auto lg:p-4">
            {singleProduct ? (
                <div className=" rounded-xl border-[#f472b6] md:flex gap-4 w-full lg:w-[83%] mx-auto p-6">
                    <div className="">
                        <ImageDetails srcList={singleProduct?.images} />
                    </div>
                    <div className=" space-y-4">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-semibold font-outfit text-[#0b0f3b]">
                                {singleProduct?.product_name}
                            </h1>
                            {/* price ...............................*/}
                            <div className="flex items-center font-semibold text-2xl">
                                <div className={`max-w-52 flex gap-2 ${singleProduct.discount_price ? "flex-row-reverse justify-end items-center " : ""}`}>
                                    <div className="text-center rounded-lg py-4 text-[#184364] font-bold text-xl flex justify-center items-center">

                                        <span className={`${singleProduct?.discount_price ? "line-through text-red-500 text-xl" : ""} text-3xl font-semibold`}>{singleProduct?.price}</span>{" "}
                                        <span>
                                            {" "}
                                            <TbCurrencyTaka />
                                        </span>
                                    </div>
                                    {singleProduct?.discount_price ? (<div className="t text-center rounded-lg py-4 text-[#184364] font-bold text-4xl flex justify-center items-center">
                                        {singleProduct?.discount_price}{" "}
                                        <span>
                                            {" "}
                                            <TbCurrencyTaka />
                                        </span>
                                    </div>) : ""}
                                </div>
                            </div>
                            <p className="text-xl font-outfit font-semibold ">
                                {singleProduct?.description}
                            </p>
                            <Flex gap="middle" className="mt-2">
                                <Rate
                                    className="flex items-center justify-center text-base text-pink-600"
                                    tooltips={desc}
                                    value={singleProduct?.rating}
                                />
                            </Flex>
                            <p className="flex items-center gap-2 text-2xl font-semibold"><span>Category:</span>{singleProduct?.category}</p>
                        </div>
                        <div className="space-y-4 max-w-[400px] ">
                            <div className="flex  gap-2">
                                <Link
                                    href={`/cart`}
                                    className=" btn w-36 border-2 flex-shrink-0 border-[#0b0f3b] rounded-lg hover:text-white bg-[#0b0f3b]   text-white px-2 font-bold flex items-center"
                                >
                                    <button onClick={() =>
                                        handleCart(
                                            singleProduct?.id,
                                            singleProduct?.product_name,
                                            singleProduct?.images[0],
                                            singleProduct?.discount_price ?? singleProduct?.price
                                        )
                                    } className="">Add to cart</button>
                                </Link>
                                {/* <Link href={`/purchaseOrder`} className="btn border-2 flex-shrink-0 border-[#0b0f3b] rounded-lg text-[#0b0f3b] hover:bg-[#0b0f3b] hover:text-white px-2 font-bold flex items-cente">
                                    <button className="">Buy it now</button>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <Spin />
                </div>
            )}
        </div>
    );
};

export default Page;
