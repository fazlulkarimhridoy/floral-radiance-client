"use client"
import ProductImage from '@/components/pages/DetailsPage/productImage';
import { useEffect, useState } from 'react';

interface SingleProductData {
    product_id: string;
    images: string[];
}

const Page = ({ params }: { params: { productId: string } }) => {
    const [products, setProducts] = useState<SingleProductData[]>([]);
    const [singleProduct, setSingleProduct] = useState<SingleProductData | undefined>();

    useEffect(() => {
        fetch('/productData/productData.json')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const foundProduct = products.find((p: SingleProductData) => p.product_id === params.productId);
            setSingleProduct(foundProduct);
        }
    }, [products, params.productId]);
    // console.log(typeof(singleProduct?.images));
    return ( 
        <div>
            <h1 className='text-4xl'>Details about product</h1>
            {singleProduct ? (
                <div>
                    <ProductImage srcList={singleProduct.images} />
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
}

export default Page;
