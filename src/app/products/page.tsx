"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProductType {
  product_id: number,
  images: string[],
  product_name: string,
  price: number,
  discount_price: number,
  description: string,
  rating: number
}

const Page = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    fetch('/productData/productData.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  console.log(products);

  return (
    <div>
      <h1 className='text-xl'> All Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.product_id}>
            <Link href={`/products/${product.product_id}`}>
              {product.product_name}
            </Link>
            {/* Helloooo */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;
