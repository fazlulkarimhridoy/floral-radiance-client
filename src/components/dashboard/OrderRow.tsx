import { Button } from "antd";
import { FaTrash } from "react-icons/fa";

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
    customer: string;
};
const OrderRow = ({
    categoryData,
    index,
}: {
    categoryData: OrderType;
    index: number;
}) => {
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

    // const parsedItems = JSON.parse(items);

    console.log(customer);
    return (
        <tr>
            <th>{index + 1}</th>
            <th>{customerId}</th>
            <th>All Items</th>
            <td>{totalPrice}</td>
            <td>{paymentMethod}</td>
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
            <td>{orderStatus}</td>
            <td>
                <Button className="btn btn-circle btn-outline btn-sm">
                    <FaTrash className="text-red-600"></FaTrash>
                </Button>
            </td>
        </tr>
    );
};

export default OrderRow;
