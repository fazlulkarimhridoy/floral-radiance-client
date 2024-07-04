"use client";

import AllProducts from "@/components/pages/Shop/AllProducts";
import Banner from "@/components/pages/Shop/Banner";
import ButtonGroup from "@/components/pages/Shop/ScrollBarSlider";
import Search from "@/components/pages/Shop/Search";
import SideBarMenu from "@/components/pages/Shop/SideBarMenu";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductType {
  product_id: number;
  images: string[];
  product_name: string;
  price: number;
  discount_price: number;
  description: string;
  rating: number;
}

const Page = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    fetch("/productData/productData.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  console.log(products);

  const images = [
    '/images/flowerVector.png',  '/images/floweOne.jpeg','/images/flowerTwo.jpeg', '/images/flowerThree.jpeg'
  ];

  return (
    <div className="flex flex-col-reverse  lg:flex-row  gap-4 max-w-[1440px]">
      {/* <h1 className="text-xl"> All Products</h1> */}
      <div className="border-r-2 ">
          <SideBarMenu></SideBarMenu>
      </div>
      <div className=" space-y-4 flex flex-col h-screen overflow-scroll">
        <div className="flex flex-col lg:flex-row  gap-4 lg:items-center">
          <Search></Search>
          <ButtonGroup></ButtonGroup>
        </div>
        <div className="max-w-[1090px]"><Banner images={images}></Banner></div>
        <div className="bg-[#f4f4f4]">
            <AllProducts/>
        </div>
        
        
      </div>
    </div>
  );
};

export default Page;

