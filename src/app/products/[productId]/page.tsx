import React from 'react';

const Page = ({params} : {params: {productId:string}}) => {
    return (
        <div>
            <h1 className='text-4xl'>details about {params.productId}</h1>
        </div>
    );
}

export default Page;
