import { Button } from "antd";
import { FaTrash } from "react-icons/fa";

interface CustomerType {
    id: number;
    customerId: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

const CustomerRow = ({
    customerData,
    index,
    handleDeleteProduct,
}: {
    customerData: CustomerType;
    index: number;
    handleDeleteProduct: Function;
}) => {
    const { id, customerId, name, email, phone, address } = customerData;

    return (
        <tr>
            <th>{index + 1}</th>
            <th>{id}</th>
            <th>{customerId}</th>
            <td>
                <div className="text-gray-600 font-bold">{name}</div>
            </td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{address}</td>
            <td>
                <Button
                    onClick={() => handleDeleteProduct(id)}
                    className="btn btn-square"
                >
                    <FaTrash size={20} className="text-red-600"></FaTrash>
                </Button>
            </td>
        </tr>
    );
};

export default CustomerRow;
