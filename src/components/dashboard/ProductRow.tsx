import { useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Rate, Switch } from "antd";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaTools, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { normalizeBackendImages, resolveBackendAssetUrl } from "@/lib/assetUrl";

const desc: string[] = ["terrible", "bad", "normal", "good", "wonderful"];

interface ProductType {
  id: number;
  productId: number;
  images: string[];
  product_name: string;
  price: number;
  discount_price: number;
  description: string;
  rating: number;
  stock: string;
  created_at: string;
  updated_at: string;
  category: string;
}

const ProductRow = ({
  productData,
  index,
  handleDeleteProduct,
}: {
  productData: ProductType;
  index: number;
  handleDeleteProduct: Function;
}) => {
  // states
  const [loading, setLoading] = useState(false);
  // trigger query by key
  const queryClient = useQueryClient();
  const {
    id,
    productId,
    images,
    product_name,
    price,
    discount_price,
    rating,
    stock,
    category,
    created_at,
    updated_at,
  } = productData;

  const normalizedImages = normalizeBackendImages(images);

  const onChange = async (checked: boolean) => {
    console.log(`switch to ${checked}`);

    const productUpdateData = {
      stock: checked === true ? "available" : "unavailable",
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
        },
      )
      .then((data) => {
        setLoading(false);
        if (data.data.status == "success") {
          queryClient.invalidateQueries({ queryKey: ["allProducts"] });
          // go back to product list
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Status updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Status update failed!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <th>{productId}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <Image
                width={500}
                height={500}
                src={
                  resolveBackendAssetUrl(normalizedImages[0]) ||
                  "/Images/miraz.jfif"
                }
                alt="Product image"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{product_name}</div>
            <div className="text-sm opacity-50">
              {category || "No Category"}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="text-gray-600 font-bold">{price}</div>
      </td>
      <td>
        <div className="text-gray-600 font-bold">{discount_price}</div>
      </td>
      <td>
        <Flex gap="middle" className="mt-2">
          <Rate
            className="flex items-center justify-center text-base text-pink-600"
            tooltips={desc}
            value={rating}
          />
        </Flex>
      </td>
      <td>
        {/* <div>{stock}</div> */}
        <Switch
          loading={loading}
          defaultValue={stock === "available"}
          onChange={onChange}
        />
      </td>
      <td>
        <div className="text-gray-600 font-bold">
          {typeof created_at === "string"
            ? new Date(created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Invalid date"}
        </div>
      </td>
      <td>
        <div className="text-gray-600 font-bold">
          {typeof created_at === "string"
            ? new Date(updated_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Invalid date"}
        </div>
      </td>
      <td>
        <Link href={`/products/${id}`}>
          <Button className="btn btn-circle btn-outline btn-sm">
            <FaEye></FaEye>
          </Button>
        </Link>
      </td>
      <td>
        <Link href={`/admin/products/${id}`}>
          <Button
            // onClick={() => handleUpdateProduct(id)}
            className="btn btn-circle btn-outline btn-sm"
          >
            <FaTools color="green" />
          </Button>
        </Link>
      </td>
      <td>
        <Button
          onClick={() => handleDeleteProduct(id)}
          className="btn btn-circle btn-outline btn-sm"
        >
          <FaTrash className="text-red-600"></FaTrash>
        </Button>
      </td>
    </tr>
  );
};

export default ProductRow;
