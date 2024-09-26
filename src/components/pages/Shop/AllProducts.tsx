
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
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

  return (
    <div className="flex flex-wrap justify-center gap-10 mt-20">
      {featuredProducts?.length > 0 &&
        featuredProducts?.map((item) => (
          <ProductCard key={item.id} item={item} desc={desc} />
        ))}
    </div>
  );
};

export default AllProducts;



