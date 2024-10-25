"use client";

import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
    Button,
    Form,
    FormProps,
    Image,
    Input,
    InputNumber,
    message,
    Select,
    Upload,
    UploadFile,
    UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Option } = Select;

// types
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

type CategoryType = {
    id: number;
    name: string;
    description: string;
};

const UpdateProduct = ({ params }: { params: { slug: string } }) => {
    // check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);
    // states and props
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const router = useRouter();
    const { push } = router;

    // get id from url param
    const idString = params?.slug;
    const id = Number(idString);

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
    const { data: singleProductDetails, isLoading } = useQuery({
        queryKey: ["SingleProductDetails", id],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/details/${id}`
            );
            // converting image url's to file type for default display
            const imageList = res?.data?.data?.images.map(
                (imageUrl: string, index: number) => ({
                    uid: String(index), // Unique identifier for each file
                    name: `image-${index}`, // Name of the image
                    status: "done", // Upload status
                    thumbUrl: imageUrl, // The actual URL for the image
                })
            );
            setFileList(imageList);
            return res?.data?.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
        enabled: id ? true : false,
    });

    console.log("single product details", singleProductDetails);

    // function for form submission on finish
    const onFinish: FormProps<SingleProductDetails>["onFinish"] = async (
        values: any
    ) => {
        const thumbUrlsArray = fileList?.map((file) => file?.thumbUrl);
        const product_name =
            values.product_name || singleProductDetails?.product_name;
        const price = values.price || singleProductDetails?.price;
        const discount_price =
            values.discount_price || singleProductDetails?.discount_price;
        const stock = values.stock || singleProductDetails?.stock;
        const category = values.category || singleProductDetails?.category;
        const description =
            values.description || singleProductDetails?.description;
        const rating = values.rating || singleProductDetails?.rating;
        const productId = values.productId || singleProductDetails?.productId;
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
        // updating product on server
        await axios
            .patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/update-product/${id}`,
                productUpdateData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((data) => {
                console.log(data);
                if (data.data.status == "success") {
                    message.success("Product updated successfully");
                    // go back to product list
                    push("/admin/products");
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

    // fetch category from server
    const { data: allCategories = [], isLoading: isCategoryLoading } = useQuery<
        CategoryType[]
    >({
        queryKey: ["allCategories"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/all-category`
            );
            return res.data.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    // checking if loading
    if (isLoading || isCategoryLoading) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <progress className="progress w-56 bg-blue-200 h-4 lg:h-8 lg:w-80"></progress>
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
            <div className="mt-5 w-[90%] 2xl:w-[65%] mx-auto relative">
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
                            name="product_name"
                            initialValue={singleProductDetails?.product_name}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter name!",
                                },
                            ]}
                        >
                            <Input
                                className="w-full"
                                placeholder="Enter product name..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* price & discounted price */}
                    <div className="flex items-center gap-2 md:gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Price"
                            name="price"
                            initialValue={singleProductDetails?.price}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter price!",
                                },
                            ]}
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
                            name="discount_price"
                            initialValue={singleProductDetails?.discount_price}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter discounted price!",
                                },
                            ]}
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter discounted..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* stock & category */}
                    <div className="flex flex-col md:flex-row items-center md:gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Stock"
                            name="stock"
                            initialValue={singleProductDetails?.stock}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter stock!",
                                },
                            ]}
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
                            name="category"
                            initialValue={singleProductDetails?.category}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: "Please select category!",
                                },
                            ]}
                        >
                            <Select
                                className="w-full"
                                placeholder="Select category..."
                                size="large"
                            >
                                {allCategories?.length > 0 &&
                                    allCategories?.map((item) => (
                                        <Option
                                            key={item?.id}
                                            value={item?.name}
                                        >
                                            {item?.name}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </div>

                    {/* rating & product id */}
                    <div className="flex items-center gap-2 md:gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Rating"
                            name="rating"
                            initialValue={singleProductDetails?.rating}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter rating!",
                                },
                            ]}
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
                            name="productId"
                            initialValue={singleProductDetails?.productId}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter product id!",
                                },
                            ]}
                        >
                            <InputNumber
                                className="w-full"
                                placeholder="Enter product id..."
                                size="large"
                                disabled
                            />
                        </Form.Item>
                    </div>

                    {/* description */}
                    <div className="flex items-center gap-10">
                        <Form.Item<FieldType>
                            className="w-full"
                            label="Product Description"
                            name="description"
                            initialValue={singleProductDetails?.description}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter description!",
                                },
                            ]}
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
                                onChange={handleChange}
                            >
                                {fileList && fileList.length >= 5
                                    ? null
                                    : uploadButton}
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
