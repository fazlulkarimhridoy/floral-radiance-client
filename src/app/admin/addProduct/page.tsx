"use client";

import { PlusOutlined } from "@ant-design/icons";
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
import React, { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type FieldType = {
    product_name: string;
    price: number;
    discounted_price: number;
    stock: number;
    category: string;
    description: string;
    rating: number;
    productId: number;
    images: JSON;
};

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const AddProduct = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
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

        const productData = {
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

        console.log(productData);

        await axios
            .post(
                "http://localhost:3001/api/product/add-product",
                productData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((data) => {
                if (data.data.status == "success") {
                    alert("Product added successfully");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
            <div>
                <h3 className="text-center pt-4 text-blue-200 text-4xl font-bold">
                    Add Product
                </h3>
            </div>
            <div className="mt-5 w-[95%] md:w-[65%] mx-auto relative">
                <Form
                    initialValues={{ remember: false }}
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
                            name="product_name"
                        >
                            <Input
                                className="w-full"
                                placeholder="Enter product name..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* price & discounted price */}
                    <div className="flex items-center gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Price"
                            required
                            name="price"
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter price..."
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Discounted Price"
                            required
                            name="discounted_price"
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter discounted..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* stock & category */}
                    <div className="flex items-center gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Stock"
                            required
                            name="stock"
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter stock..."
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Product Category"
                            required
                            name="category"
                        >
                            <Input
                                className="w-full"
                                placeholder="Enter product category..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* rating & product id */}
                    <div className="flex items-center gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Rating"
                            required
                            name="rating"
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter rating (1~5)"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Product Id"
                            required
                            name="productId"
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter product id..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* description */}
                    <div className="flex items-center gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Product Description"
                            required
                            name="description"
                        >
                            <TextArea
                                rows={4}
                                className="w-full"
                                placeholder="Enter product description..."
                                size="large"
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

export default AddProduct;
