"use client";

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
    'https://images.pexels.com/photos/931147/pexels-photo-931147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1484657/pexels-photo-1484657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ];

  return (
    <div className="flex gap-4 ">
      {/* <h1 className="text-xl"> All Products</h1> */}
      <div className="border-r-2 ">
          <SideBarMenu></SideBarMenu>
      </div>
      <div className=" space-y-4">
        <div className="flex gap-4 items-center">
          <Search></Search>
          <ButtonGroup></ButtonGroup>
        </div>
        <div className=""><Banner images={images}></Banner></div>
        
      </div>
    </div>
  );
};

export default Page;

