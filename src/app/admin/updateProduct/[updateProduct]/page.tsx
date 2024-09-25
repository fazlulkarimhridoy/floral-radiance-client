"use client";

import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
    Button,
    Form,
    FormProps,
    GetProp,
    Image,
    Input,
    InputNumber,
    Upload,
    UploadFile,
    UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";

// types
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type FieldType = {
    product_name: string;
    price: number;
    discount_price: number;
    stock: number;
    category: string;
    description: string;
    rating: number;
    productId: number;
    images: JSON;
};

// product types
type SingleProductDetails = {
    product_name: string;
    price: number;
    discount_price: number;
    stock: number;
    category: string;
    description: string;
    rating: number;
    productId: number;
    images: JSON;
};

// make file from images
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const UpdateProduct = ({ params }: { params: { updateProduct: string } }) => {
    // states and props
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // get id from url param
    const idString = params?.updateProduct;
    const id = Number(idString);

    // preview image
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    // file upload changes
    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    // file upload button
    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    // fetch data from server
    const {
        data: singleProductDetails,
        isLoading,
        isFetching,
        isPending,
    } = useQuery({
        queryKey: ["SingleProductDetails", id],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/details?id=${id}`
            );
            return res?.data?.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    // function for form submission on finish
    const onFinish: FormProps<SingleProductDetails>["onFinish"] = async (
        values: any
    ) => {
        const thumbUrlsArray = fileList.map((file) => file.thumbUrl);
        const product_name = values.product_name;
        const price = values.price;
        const discount_price = values.discounted_price;
        const stock = values.stock;
        const category = values.category;
        const description = values.description;
        const rating = values.rating;
        const productId = values.productId;
        const images = thumbUrlsArray;

        const productUpdateData = {
            product_name,
            price,
            discount_price,
            stock,
            category,
            description,
            rating,
            productId,
            images,
        };

        console.log(productUpdateData);

        await axios
            .put(
                `http://localhost:3001/api/product/update-product?id=${id}`,
                productUpdateData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((data) => {
                if (data.data.status == "success") {
                    alert("Product updated successfully");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // if form submission fails
    const onFinishFailed: FormProps<SingleProductDetails>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    // checking if loading
    if (isLoading || isPending || isFetching) {
        return (
            <div className="flex justify-center mt-28 mb-28 lg:mt-80 lg:mb-60">
                <progress className="progress w-56 bg-blue-200 h-2 lg:h-8 lg:w-80"></progress>
            </div>
        );
    }

    return (
        <div>
            <div>
                <h3 className="text-center pt-4 text-blue-200 text-4xl font-bold">
                    Update Product
                </h3>
            </div>
            <div className="mt-5 w-[95%] md:w-[65%] mx-auto relative">
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    {/* product name */}
                    <div className="flex items-center gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Product Name"
                            required
                        >
                            <Input
                                defaultValue={
                                    singleProductDetails?.product_name || null
                                }
                                className="w-full"
                                placeholder="Enter product name..."
                                size="large"
                                name="product_name"
                            />
                        </Form.Item>
                    </div>

                    {/* price & discounted price */}
                    <div className="flex items-center gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Price"
                            required
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter price..."
                                size="large"
                                defaultValue={
                                    singleProductDetails?.price || null
                                }
                                name="price"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Discounted Price"
                            required
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter discounted..."
                                size="large"
                                defaultValue={
                                    singleProductDetails?.discount_price || null
                                }
                                name="discount_price"
                            />
                        </Form.Item>
                    </div>

                    {/* stock & category */}
                    <div className="flex items-center gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Stock"
                            required
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter stock..."
                                size="large"
                                defaultValue={
                                    singleProductDetails?.stock || null
                                }
                                name="stock"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Product Category"
                            required
                        >
                            <Input
                                className="w-full"
                                placeholder="Enter product category..."
                                size="large"
                                defaultValue={
                                    singleProductDetails?.category || null
                                }
                                name="category"
                            />
                        </Form.Item>
                    </div>

                    {/* rating & product id */}
                    <div className="flex items-center gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Rating"
                            required
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter rating (1~5)"
                                size="large"
                                defaultValue={
                                    singleProductDetails?.rating || null
                                }
                                name="rating"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Product Id"
                            required
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter product id..."
                                size="large"
                                defaultValue={
                                    singleProductDetails?.productId || null
                                }
                                name="productId"
                            />
                        </Form.Item>
                    </div>

                    {/* description */}
                    <div className="flex items-center gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Product Description"
                            required
                        >
                            <TextArea
                                rows={4}
                                className="w-full"
                                placeholder="Enter product description..."
                                size="large"
                                defaultValue={
                                    singleProductDetails?.description || null
                                }
                                name="description"
                            />
                        </Form.Item>
                    </div>

                    {/* upload images */}
                    <div className="flex items-center gap-10">
                        <Form.Item<FieldType>
                            label="Upload Five Images"
                            required
                            valuePropName="fileList"
                            name="images"
                        >
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            {previewImage && (
                                <Image
                                    alt="upload-images"
                                    wrapperStyle={{ display: "none" }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) =>
                                            setPreviewOpen(visible),
                                        afterOpenChange: (visible) =>
                                            !visible && setPreviewImage(""),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Form.Item>
                    </div>

                    {/* submit button */}
                    <div className="absolute right-0 w-full md:w-[25%]">
                        <Form.Item className="w-full">
                            <Button
                                className="w-full"
                                type="primary"
                                size="large"
                                htmlType="submit"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default UpdateProduct;
