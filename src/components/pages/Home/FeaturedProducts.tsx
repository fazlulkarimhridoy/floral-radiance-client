"use client"

import Image from "next/image";
import Flower1 from "../../../assets/vas-flowers/1.jpg"
import Flower2 from "../../../assets/vas-flowers/2.jpg"
import { Flex, Rate } from "antd";
import { useState } from "react";

const desc: string[] = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const FeaturedProducts = () => {
    const [value, setValue] = useState<number>(3);
    const [showAddToCart, setShowAddToCart] = useState<boolean>(false);

    // Function to handle mouse enter event
    const handleMouseEnter = () => {
        setShowAddToCart(true);
    };

    // Function to handle mouse leave event
    const handleMouseLeave = () => {
        setShowAddToCart(false);
    };

    return (
        <div className="max-w-[76%] mx-auto my-20">
            <div className="">
                <h3 className="text-center italic font-medium">Wonderful gifts</h3>
                <h1 className="text-center text-5xl font-medium">Featured Products</h1>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-10 mt-20">
                {/* product 1 */}
                <div className="group h-[380px] w-[270px] rounded-sm hover:shadow-lg hover:transition-all hover:duration-400"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative h-[270px] w-[270px]">
                        <Image
                            src={Flower1}
                            alt="1"
                            width={600}
                            className="absolute inset-0 object-cover opacity-100 group-hover:opacity-0"
                        />

                        <Image
                            src={Flower2}
                            alt="2"
                            width={600}
                            className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100"
                        />
                    </div>

                    {/* Product details */}
                    <div className="text-center mt-2">
                        <h3 className="text-lg font-semibold">Flowers daisy pink stick</h3>
                        <Flex gap="middle" vertical className="mt-2">
                            <Rate className="text-base text-pink-600" tooltips={desc} onChange={setValue} value={value} />
                        </Flex>

                        {/* render the price or Add to Cart based on hover */}
                        {!showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2">
                                <span>$90.00</span>
                                <span className="line-through text-gray-400">$95.00</span>
                            </p>
                        )}
                        {showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2 animate-fade-in cursor-pointer hover:text-pink-600">
                                Add to Cart
                            </p>
                        )}
                    </div>
                </div>
                {/* product 2 */}
                <div className="group h-[380px] w-[270px] rounded-sm hover:shadow-lg hover:transition-all hover:duration-400"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative h-[270px] w-[270px]">
                        <Image
                            src={Flower1}
                            alt="1"
                            width={600}
                            className="absolute inset-0 object-cover opacity-100 group-hover:opacity-0"
                        />

                        <Image
                            src={Flower2}
                            alt="2"
                            width={600}
                            className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100"
                        />
                    </div>

                    {/* Product details */}
                    <div className="text-center mt-2">
                        <h3 className="text-lg font-semibold">Flowers daisy pink stick</h3>
                        <Flex gap="middle" vertical className="mt-2">
                            <Rate className="text-base text-pink-600" tooltips={desc} onChange={setValue} value={value} />
                        </Flex>

                        {/* render the price or Add to Cart based on hover */}
                        {!showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2">
                                <span>$90.00</span>
                                <span className="line-through text-gray-400">$95.00</span>
                            </p>
                        )}
                        {showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2 animate-fade-in cursor-pointer hover:text-pink-600">
                                Add to Cart
                            </p>
                        )}
                    </div>
                </div>
                {/* product 3 */}
                <div className="group h-[380px] w-[270px] rounded-sm hover:shadow-lg hover:transition-all hover:duration-400"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative h-[270px] w-[270px]">
                        <Image
                            src={Flower1}
                            alt="1"
                            width={600}
                            className="absolute inset-0 object-cover opacity-100 group-hover:opacity-0"
                        />

                        <Image
                            src={Flower2}
                            alt="2"
                            width={600}
                            className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100"
                        />
                    </div>

                    {/* Product details */}
                    <div className="text-center mt-2">
                        <h3 className="text-lg font-semibold">Flowers daisy pink stick</h3>
                        <Flex gap="middle" vertical className="mt-2">
                            <Rate className="text-base text-pink-600" tooltips={desc} onChange={setValue} value={value} />
                        </Flex>

                        {/* render the price or Add to Cart based on hover */}
                        {!showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2">
                                <span>$90.00</span>
                                <span className="line-through text-gray-400">$95.00</span>
                            </p>
                        )}
                        {showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2 animate-fade-in cursor-pointer hover:text-pink-600">
                                Add to Cart
                            </p>
                        )}
                    </div>
                </div>
                {/* product 4 */}
                <div className="group h-[380px] w-[270px] rounded-sm hover:shadow-lg hover:transition-all hover:duration-400"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative h-[270px] w-[270px]">
                        <Image
                            src={Flower1}
                            alt="1"
                            width={600}
                            className="absolute inset-0 object-cover opacity-100 group-hover:opacity-0"
                        />

                        <Image
                            src={Flower2}
                            alt="2"
                            width={600}
                            className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100"
                        />
                    </div>

                    {/* Product details */}
                    <div className="text-center mt-2">
                        <h3 className="text-lg font-semibold">Flowers daisy pink stick</h3>
                        <Flex gap="middle" vertical className="mt-2">
                            <Rate className="text-base text-pink-600" tooltips={desc} onChange={setValue} value={value} />
                        </Flex>

                        {/* render the price or Add to Cart based on hover */}
                        {!showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2">
                                <span>$90.00</span>
                                <span className="line-through text-gray-400">$95.00</span>
                            </p>
                        )}
                        {showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2 animate-fade-in cursor-pointer hover:text-pink-600">
                                Add to Cart
                            </p>
                        )}
                    </div>
                </div>
                {/* product 5 */}
                <div className="group h-[380px] w-[270px] rounded-sm hover:shadow-lg hover:transition-all hover:duration-400"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative h-[270px] w-[270px]">
                        <Image
                            src={Flower1}
                            alt="1"
                            width={600}
                            className="absolute inset-0 object-cover opacity-100 group-hover:opacity-0"
                        />

                        <Image
                            src={Flower2}
                            alt="2"
                            width={600}
                            className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100"
                        />
                    </div>

                    {/* Product details */}
                    <div className="text-center mt-2">
                        <h3 className="text-lg font-semibold">Flowers daisy pink stick</h3>
                        <Flex gap="middle" vertical className="mt-2">
                            <Rate className="text-base text-pink-600" tooltips={desc} onChange={setValue} value={value} />
                        </Flex>

                        {/* render the price or Add to Cart based on hover */}
                        {!showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2">
                                <span>$90.00</span>
                                <span className="line-through text-gray-400">$95.00</span>
                            </p>
                        )}
                        {showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2 animate-fade-in cursor-pointer hover:text-pink-600">
                                Add to Cart
                            </p>
                        )}
                    </div>
                </div>
                {/* product 6 */}
                <div className="group h-[380px] w-[270px] rounded-sm hover:shadow-lg hover:transition-all hover:duration-400"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative h-[270px] w-[270px]">
                        <Image
                            src={Flower1}
                            alt="1"
                            width={600}
                            className="absolute inset-0 object-cover opacity-100 group-hover:opacity-0"
                        />

                        <Image
                            src={Flower2}
                            alt="2"
                            width={600}
                            className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100"
                        />
                    </div>

                    {/* Product details */}
                    <div className="text-center mt-2">
                        <h3 className="text-lg font-semibold">Flowers daisy pink stick</h3>
                        <Flex gap="middle" vertical className="mt-2">
                            <Rate className="text-base text-pink-600" tooltips={desc} onChange={setValue} value={value} />
                        </Flex>

                        {/* render the price or Add to Cart based on hover */}
                        {!showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2">
                                <span>$90.00</span>
                                <span className="line-through text-gray-400">$95.00</span>
                            </p>
                        )}
                        {showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2 animate-fade-in cursor-pointer hover:text-pink-600">
                                Add to Cart
                            </p>
                        )}
                    </div>
                </div>
                {/* product 7 */}
                <div className="group h-[380px] w-[270px] rounded-sm hover:shadow-lg hover:transition-all hover:duration-400"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative h-[270px] w-[270px]">
                        <Image
                            src={Flower1}
                            alt="1"
                            width={600}
                            className="absolute inset-0 object-cover opacity-100 group-hover:opacity-0"
                        />

                        <Image
                            src={Flower2}
                            alt="2"
                            width={600}
                            className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100"
                        />
                    </div>

                    {/* Product details */}
                    <div className="text-center mt-2">
                        <h3 className="text-lg font-semibold">Flowers daisy pink stick</h3>
                        <Flex gap="middle" vertical className="mt-2">
                            <Rate className="text-base text-pink-600" tooltips={desc} onChange={setValue} value={value} />
                        </Flex>

                        {/* render the price or Add to Cart based on hover */}
                        {!showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2">
                                <span>$90.00</span>
                                <span className="line-through text-gray-400">$95.00</span>
                            </p>
                        )}
                        {showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2 animate-fade-in cursor-pointer hover:text-pink-600">
                                Add to Cart
                            </p>
                        )}
                    </div>
                </div>
                {/* product 8 */}
                <div className="group h-[380px] w-[270px] rounded-sm hover:shadow-lg hover:transition-all hover:duration-400"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative h-[270px] w-[270px]">
                        <Image
                            src={Flower1}
                            alt="1"
                            width={600}
                            className="absolute inset-0 object-cover opacity-100 group-hover:opacity-0"
                        />

                        <Image
                            src={Flower2}
                            alt="2"
                            width={600}
                            className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100"
                        />
                    </div>

                    {/* Product details */}
                    <div className="text-center mt-2">
                        <h3 className="text-lg font-semibold">Flowers daisy pink stick</h3>
                        <Flex gap="middle" vertical className="mt-2">
                            <Rate className="text-base text-pink-600" tooltips={desc} onChange={setValue} value={value} />
                        </Flex>

                        {/* render the price or Add to Cart based on hover */}
                        {!showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2">
                                <span>$90.00</span>
                                <span className="line-through text-gray-400">$95.00</span>
                            </p>
                        )}
                        {showAddToCart && (
                            <p className="font-medium flex items-center justify-center gap-2 mt-2 animate-fade-in cursor-pointer hover:text-pink-600">
                                Add to Cart
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;