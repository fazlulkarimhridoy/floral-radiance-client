import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../Home/ProductCard";
import { Empty, message, Spin } from "antd";
import { useCategory } from "@/context/CategoryContext";

interface ProductType {
    id: number;
    product_id: number;
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

const AllProducts = () => {
    const { categoryName } = useCategory();

    // fetch all products froom server
    const { data: shopProducts = [], isLoading } = useQuery<ProductType[]>({
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

    // Handle product filter for search
    const filteredProducts =
        shopProducts?.length > 0
            ? shopProducts?.filter((product) => {
                  const searchText = categoryName;
                  if (searchText) {
                      const searchString = searchText.toLowerCase();

                      // Check product name, category (strings), and productId (number)
                      return product?.category
                          ?.toLowerCase()
                          ?.includes(searchString);
                  }
                  return true; // If no searchText, return all products
              })
            : [];

    const [cartData, setCartData] = useState<CartItem[]>([]);

    useEffect(() => {
        // Load cart data from localStorage
        const storedData = localStorage.getItem("cartItem");
        if (storedData) {
            setCartData(JSON.parse(storedData));
        }
    }, []);

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
        message.success("Product Addded To Cart!");
    };
    // Synchronize localStorage whenever the cardData state changes
    useEffect(() => {
        // Store the entire updated cart into localStorage
        localStorage.setItem("cartItem", JSON.stringify(cartData));
    }, [cartData]);
    // show loader if data loads
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center gap-5 absolute top-[75%] left-[55%] lg:left-[60%] transform -translate-x-1/2 -translate-y-1/2">
                <Spin style={{ color: "white" }} size="large" />
            </div>
        );
    }

    return (
        <div className="flex flex-wrap justify-center gap-10 mt-20 pb-20">
            {shopProducts?.length > 0 ? (
                filteredProducts?.length > 0 ? (
                    filteredProducts?.map((item) => (
                        <ProductCard
                            key={item?.id}
                            item={item}
                            handleCart={handleCart}
                        />
                    ))
                ) : (
                    <Empty description="No product for this category!" />
                )
            ) : (
                <Empty description="No product added yet!" />
            )}
        </div>
    );
};

export default AllProducts;
