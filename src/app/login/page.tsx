"use client";
import { Button, Form, FormProps, Input, message, Spin } from "antd";
import Password from "antd/es/input/Password";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// types
type LoginType = {
    email: string;
    password: string;
};

const LoginPage = () => {
    // states and calls
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { push } = router;

    // handle form submission finish
    const onFinish: FormProps<LoginType>["onFinish"] = async (values) => {
        setLoading(true);
        console.log("Success:", values);
        await axios
            .post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, values, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            .then((data) => {
                console.log(data);
                const token = data.data.token;
                if (token) {
                    localStorage.setItem("token", token);
                    setLoading(false);
                    push("/admin");
                    message.success("Login successful   ");
                } else {
                    setLoading(false);
                    message.error("Invalid email or password");
                }
            })
            .catch((error) => {
                setLoading(false);
                message.error(error.data.message);
            });
    };

    // handle form submission failed
    const onFinishFailed: FormProps<LoginType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    // show loader if data loads
    if (loading) {
        return (
            <Spin fullscreen={true} style={{ color: "white" }} size="large" />
        );
    }

    return (
        <div className="my-[156px]">
            <h1 className="text-center text-4xl font-bold">Admin Login</h1>
            <Form
                className="mt-10 px-5 md:px-0"
                initialValues={{ remember: false }}
                autoComplete="off"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {/* category name */}
                <div className="flex items-center gap-10">
                    <Form.Item<LoginType>
                        className="w-full md:w-1/2 lg:w-1/4 mx-auto"
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter email address!",
                            },
                        ]}
                    >
                        <Input
                            className="w-full"
                            placeholder="Enter email address..."
                            size="large"
                            type="email"
                        />
                    </Form.Item>
                </div>

                {/* category id */}
                <div className="flex items-center gap-2 md:gap-10">
                    <Form.Item<LoginType>
                        className="w-full md:w-1/2 lg:w-1/4 mx-auto"
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter category id!",
                            },
                        ]}
                    >
                        <Password
                            className="w-full"
                            placeholder="Enter password..."
                            size="large"
                        />
                    </Form.Item>
                </div>

                {/* submit button */}
                <div>
                    <Form.Item className="w-full md:w-1/2 lg:w-1/4 mx-auto">
                        <Button
                            className="w-full"
                            type="primary"
                            size="large"
                            htmlType="submit"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;
