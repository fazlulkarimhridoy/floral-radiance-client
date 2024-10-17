"use client";

import {
    Button,
    Form,
    FormInstance,
    FormProps,
    Input,
    InputNumber,
    message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect } from "react";

// types
type CategoryType = {
    id: number;
    categoryId: number;
    name: string;
    description: string;
};

const AddCategory = () => {
    // check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);
    // states and calls
    const formRef = React.useRef<FormInstance<CategoryType>>(null);

    // handle form submission finish
    const onFinish: FormProps<CategoryType>["onFinish"] = async (
        values: any
    ) => {
        const name = values.name;
        const categoryId = values.categoryId;
        const description = values.description;

        const categoryData = {
            name,
            categoryId,
            description,
        };

        console.log(categoryData);

        await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/add-category`,
                categoryData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((data) => {
                if (data.data.status == "success") {
                    message.success("Category added successfully");
                    // clear form values
                    formRef.current?.resetFields();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // handle form submission failure
    const onFinishFailed: FormProps<CategoryType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    // checking if loading
    // if (isLoading) {
    //     return (
    //         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    //             <progress className="progress w-56 bg-blue-200 h-4 lg:h-8 lg:w-80"></progress>
    //         </div>
    //     );
    // }

    return (
        <div>
            <div>
                <h3 className="text-center pt-4 text-blue-200 text-4xl font-bold">
                    Add Category
                </h3>
            </div>
            <div className="mt-5 w-[90%] 2xl:w-[65%] mx-auto relative">
                <Form
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                    ref={formRef}
                >
                    {/* category name */}
                    <div className="flex items-center gap-10">
                        <Form.Item<CategoryType>
                            className="w-full"
                            label="Category Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter category name!",
                                },
                            ]}
                        >
                            <Input
                                className="w-full"
                                placeholder="Enter category name..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* category id */}
                    <div className="flex items-center gap-2 md:gap-10">
                        <Form.Item<CategoryType>
                            className="w-full"
                            label="Category Id"
                            name="categoryId"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter category id!",
                                },
                            ]}
                        >
                            <InputNumber
                                maxLength={4}
                                className="w-full"
                                placeholder="Enter category id..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* description */}
                    <div className="flex items-center gap-2 md:gap-10">
                        <Form.Item<CategoryType>
                            className="w-full"
                            label="Category Description"
                            name="description"
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
                                placeholder="Enter category description..."
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    {/* submit button */}
                    <div className="absolute right-0 w-full md:w-[50%] lg:w-[25%]">
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

export default AddCategory;
