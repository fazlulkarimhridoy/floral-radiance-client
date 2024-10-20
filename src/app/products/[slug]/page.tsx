"use client";
// import ProductImage from "@/components/pages/DetailsPage/productImage";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import Link from "next/link";
import ImageDetails from "@/components/pages/DetailsPage/ImaegDetails";
import { message } from "antd";

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
        return Number(params.slug) === item?.id;
    };

    //single product data
    const singleProduct = featuredProducts?.find(findProduct);
    console.log(singleProduct);

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


    // show loader if data loads

    return (
        <div className=" lg:p-4">
            <h1 className="text-4xl">Details about product</h1>
            {singleProduct ? (
                <div className=" rounded-xl border-[#f472b6] md:flex gap-4 w-full lg:w-[83%] mx-auto p-6 ">
                    <div className="">
                        <ImageDetails srcList={singleProduct.images} />
                    </div>
                    <div className=" space-y-4">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-semibold font-outfit text-[#0b0f3b]">
                                {singleProduct.product_name}
                            </h1>
                            <p className="text-xl playfair font-semibold ">
                                {singleProduct.description}
                            </p>
                        </div>
                        <div className="space-y-4 max-w-[400px] ">
                            <div className="flex justify-between gap-2">
                                <div className=" border-2 border-[#0b0f3b] flex-1  text-center rounded-lg py-4 text-[#184364] font-bold text-xl flex justify-center items-center">
                                    <span className={`${singleProduct.discount_price ? "line-through text-red-500" : ""} line-through text-red-500`}>{singleProduct.price}</span>{" "}
                                    <span>
                                        {" "}
                                        <TbCurrencyTaka />
                                    </span>
                                </div>
                                {singleProduct.discount_price ? (<div className="border-2 border-[#0b0f3b] flex-1  text-center rounded-lg py-4 text-[#184364] font-bold text-xl flex justify-center items-center">
                                    {singleProduct.discount_price}{" "}
                                    <span>
                                        {" "}
                                        <TbCurrencyTaka />
                                    </span>
                                </div> ): ""}

                                <Link
                                    href={`/cart`}
                                    className="border-2 flex-shrink-0 border-[#0b0f3b] rounded-lg text-[#0b0f3b] hover:bg-[#0b0f3b] hover:text-white px-2 font-bold flex items-center"
                                >
                                    <button onClick={() =>
                                        handleCart(
                                            singleProduct?.id,
                                            singleProduct?.product_name,
                                            singleProduct?.images[0],
                                            singleProduct?.price
                                        )
                                    } className="">Add to cart</button>
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
