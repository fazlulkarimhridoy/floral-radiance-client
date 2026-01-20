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
  Select,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { normalizeBackendImages, resolveBackendAssetUrl } from "@/lib/assetUrl";

const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// types
type FieldType = {
  product_name: string;
  price: number;
  discount_price: number;
  stock: string;
  category: string;
  description: string;
  rating: number;
  productId: number;
  images?: (string | File)[];
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
  images?: (string | File)[];
};

type CategoryType = {
  id: number;
  name: string;
  description: string;
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
  });

const UpdateProduct = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState(false);
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
  const [existingImagePaths, setExistingImagePaths] = useState<string[]>([]);
  const [removedExistingImagePaths, setRemovedExistingImagePaths] = useState<
    string[]
  >([]);
  const router = useRouter();
  const { push } = router;

  // get id from url param
  const idString = params?.slug;
  const id = Number(idString);

  // file upload changes
  const handleChange: UploadProps["onChange"] = ({
    file,
    fileList: newFileList,
  }) => {
    setFileList(newFileList);

    if (file.status === "removed") {
      const removedPath = String(file.uid);
      if (existingImagePaths.includes(removedPath)) {
        setRemovedExistingImagePaths((prev) =>
          Array.from(new Set([...prev, removedPath])),
        );
      }
    }
  };

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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/details/${id}`,
      );

      const imagesFromApi: string[] = normalizeBackendImages(
        res?.data?.data?.images,
      );
      setExistingImagePaths(imagesFromApi);
      setRemovedExistingImagePaths([]);

      // converting image url's to file type for default display
      const imageList: UploadFile[] = imagesFromApi.map(
        (imagePath: string, index: number) => {
          const resolved = resolveBackendAssetUrl(imagePath) || imagePath;
          const nameFromPath = imagePath.split("/").pop() || `image-${index}`;
          return {
            uid: imagePath, // keep original path so we can send it in removeImages
            name: nameFromPath,
            status: "done",
            url: resolved,
            thumbUrl: resolved,
          };
        },
      );

      setFileList(imageList);
      return res?.data?.data;
    },
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: id ? true : false,
  });

  // function for form submission on finish
  const onFinish: FormProps<SingleProductDetails>["onFinish"] = async (
    values: any,
  ) => {
    setLoading(true);

    // Ensure the object has a known type
    const updatedFields: Partial<SingleProductDetails> = {};

    if (
      values.product_name &&
      values.product_name !== singleProductDetails?.product_name
    ) {
      updatedFields.product_name = values.product_name;
    }
    if (values.price && values.price !== singleProductDetails?.price) {
      updatedFields.price = values.price;
    }
    if (
      values.discount_price &&
      values.discount_price !== singleProductDetails?.discount_price
    ) {
      updatedFields.discount_price = values.discount_price;
    }
    if (values.stock && values.stock !== singleProductDetails?.stock) {
      updatedFields.stock = values.stock;
    }
    if (values.category && values.category !== singleProductDetails?.category) {
      updatedFields.category = values.category;
    }
    if (
      values.description &&
      values.description !== singleProductDetails?.description
    ) {
      updatedFields.description = values.description;
    }
    if (values.rating && values.rating !== singleProductDetails?.rating) {
      updatedFields.rating = values.rating;
    }
    if (
      values.productId &&
      values.productId !== singleProductDetails?.productId
    ) {
      updatedFields.productId = values.productId;
    }

    const newFiles = (fileList || []).filter((f) => !!f.originFileObj);
    const addImages = await Promise.all(
      newFiles.map((f) => fileToBase64(f.originFileObj as File)),
    );

    const removeImages = removedExistingImagePaths;

    const payload: Partial<SingleProductDetails> & {
      addImages?: string[];
      removeImages?: string[];
    } = {
      ...updatedFields,
    };

    // Send only new base64 images; server keeps existing ones by default
    if (addImages.length > 0) {
      payload.addImages = addImages;
    }
    if (removeImages.length > 0) {
      payload.removeImages = removeImages;
    }

    try {
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/update-product/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setLoading(false);

      if (data.status === "success") {
        push("/admin/products");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Product update failed!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    }
  };

  // if form submission fails
  const onFinishFailed: FormProps<SingleProductDetails>["onFinishFailed"] = (
    errorInfo,
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/all-category`,
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

  // show loader if uploads takes time
  if (loading) {
    return <Spin fullscreen={true} style={{ color: "white" }} size="large" />;
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
              // rules={[
              //     {
              //         required: true,
              //         message: "Please enter discounted price!",
              //     },
              // ]}
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
              // rules={[
              //     {
              //         required: true,
              //         message: "Please enter stock!",
              //     },
              // ]}
            >
              <Select
                defaultValue="available"
                className="w-full"
                placeholder="Select Availability..."
                size="large"
              >
                <Option value="available">Aavailable</Option>
                <Option value="unavailable">Unavailable</Option>
              </Select>
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
                    <Option key={item?.id} value={item?.name}>
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
              label="Upload Five Images (Size: 1080px*1080px)"
              required
              valuePropName="fileList"
              name="images"
            >
              <Upload
                multiple
                listType="picture-card"
                fileList={fileList}
                beforeUpload={() => false}
                onChange={handleChange}
              >
                {fileList && fileList.length >= 5 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  alt="upload-images"
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
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

export default UpdateProduct;
