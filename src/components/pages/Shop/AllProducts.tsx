import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../Home/ProductCard";

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
const desc: string[] = ["terrible", "bad", "normal", "good", "wonderful"];

const AllProducts = () => {
  const [data, setData] = useState<ProductType[] | null>(null);
  // const { data: featuredProducts = [] } = useQuery<ProductType[]>({
  //   queryKey: ["featuredProducts"],
  //   queryFn: async () => {
  //     const res = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/all-products`
  //     );
  //     return res.data.data;
  //   },
  //   retry: 2,
  //   refetchOnWindowFocus: false,
  // });

  useEffect(() => {
    fetch("/productData/productData.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-10 mt-20  ">
        {data?.map((item) => (
          <ProductCard key={item.id} item={item} desc={desc} />
        ))}

    </div>
  );
};

export default AllProducts;
