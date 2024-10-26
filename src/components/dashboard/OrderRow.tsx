import { Button, message, Modal, Select, Spin } from "antd";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import OrderItem from "./OrderItem";
import axios from "axios";
import Swal from "sweetalert2";

const statusOptions = [
  {
    value: "PENDING",
    label: "PENDING",
  },
  {
    value: "SHIPPED",
    label: "SHIPPED",
  },
  {
    value: "DELIVERED",
    label: "DELIVERED",
  },
  {
    value: "CANCELLED",
    label: "CANCELLED",
  },
];

type OrderType = {
  id: number;
  customerId: number;
  totalPrice: number;
  deliveryDate: string;
  deliveryTime: string;
  orderStatus: string;
  orderDate: string;
  orderTime: string;
  paymentMethod: string;
  items: string[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    customerId: string;
  };
};

const OrderRow = ({
  categoryData,
  refetch,
}: {
  categoryData: OrderType;
  refetch: Function;
}) => {
  const [loading, setLoading] = useState(false);
  // states and calls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onClose = () => {
    setIsModalOpen(false);
  };
  const {
    customerId,
    totalPrice,
    deliveryDate,
    deliveryTime,
    orderDate,
    orderStatus,
    paymentMethod,
    items,
    customer,
  } = categoryData;

  const handleOrderStatus = async (e: any) => {
    setLoading(true);
    const status = e.target.value;
    // update status to server
    await axios
      .patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/update-order/${customerId}`,
        {
          orderStatus: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        if (data.data.status == "success") {
          refetch();
          setLoading(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `ORDER ${status}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: `Status update ${error.response.data.status}`,
            showConfirmButton: false,
            timer: 1500,
          });
      });
  };

  // show loader if uploads takes time
  if (loading) {
    return <Spin fullscreen={true} style={{ color: "white" }} size="large" />;
  }
  return (
    <tr>
      <th>{customerId}</th>
      <th>{customer?.name}</th>

      <td>{totalPrice}</td>
      <td>{paymentMethod === "CASHON" ? "Cash On Delivery" : "Bkash"}</td>
      <td>{deliveryDate}</td>
      <td>{deliveryTime}</td>
      <td>
        <div>
          {typeof orderDate === "string"
            ? new Date(orderDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Invalid date"}
        </div>
      </td>
      <th>
        <Button onClick={showModal}>Oder Details</Button>
      </th>
      {/* <td>{orderStatus}</td> */}
      <td>
        <select
          style={{ width: 130 }}
          className={`${orderStatus === "PENDING" && "bg-yellow-100"} ${
            orderStatus === "SHIPPED" && "bg-blue-100"
          } ${orderStatus === "DELIVERED" && "bg-green-100"} ${
            orderStatus === "CANCELLED" && "bg-red-100"
          } w-full px-3 py-1 rounded-md border border-gray-300 cursor-pointer hover:border-blue-500 hover:text-blue-500`}
          onChange={handleOrderStatus}
          defaultValue={orderStatus}
        >
          {statusOptions
            // .filter((option) => option.value !== orderStatus)
            .map((option) => (
              <option
                className="bg-white"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
        </select>
      </td>

      <Modal
        className="w-full"
        footer={false}
        open={isModalOpen}
        onCancel={onClose}
      >
        <div className="flex flex-col lg:flex-row justify-center gap-2">
          <div className="w-full">
            <h1 className="text-lg font-bold">Customer Details</h1>
            <div className="bg-gray-100 rounded-xl mt-2 p-3">
              <p className="flex gap-2">
                <span className="font-semibold">Customer ID:</span> {customerId}
              </p>
              <p className="flex gap-2">
                <span className="font-semibold">Name:</span> {customer?.name}
              </p>
              <p className="flex gap-2">
                <span className="font-semibold">Email:</span> {customer?.email}
              </p>
              <p className="flex gap-2">
                <span className="font-semibold">Phone:</span> {customer?.phone}
              </p>
              <p className="flex gap-2">
                <span className="font-semibold">Address:</span>{" "}
                {customer?.address}
              </p>
            </div>
          </div>
          <div className="w-full">
            <h1 className="text-lg font-bold">Order Details</h1>
            {items.map((item: any) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="mt-2">
          <p className="text-lg font-bold">Total Price: {totalPrice} Taka</p>
        </div>
      </Modal>
    </tr>
  );
};

export default OrderRow;
