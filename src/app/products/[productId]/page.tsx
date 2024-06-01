"use client"
import { useEffect, useState } from 'react';

interface singleProductData {
    product_id : string
}

const Page = ({params} : {params: {productId:string}}) => {
    const [products, setProducts] = useState([]);
    const [singleProduct,setSingleProduct] = useState()

    useEffect(() => {
        fetch('/productData/productData.json')
          .then(response => response.json())
          .then(data => setProducts(data))
          .catch(error => console.error('Error fetching products:', error));
          
      }, []);
    
    useEffect(() => {
        if(products.length > 0){
            const singleProduct = products.find( (p : singleProductData) => p.product_id === params.productId)
            setSingleProduct(singleProduct)
        }
        console.log(singleProduct);
    },[products , params.productId , singleProduct])
   


    console.log(singleProduct);
    console.log(products);

   

    return (
        <div>
            <h1 className='text-4xl'>details about</h1>
        </div>
    );
}

export default Page;
