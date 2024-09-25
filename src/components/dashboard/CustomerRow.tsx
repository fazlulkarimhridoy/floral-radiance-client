import { Button } from "antd";
import { FaTrash } from "react-icons/fa";

interface CustomerType {
    id: number;
    customerId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
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
    const {
        id,
        customerId,
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
    } = customerData;

    return (
        <tr>
            <th className="hidden md:table-cell">{index + 1}</th>
            <th className="hidden md:table-cell">{customerId}</th>
            <td>
                <div className="text-gray-600 font-bold">{firstName}</div>
            </td>
            <td className="hidden md:table-cell">
                <div className="text-gray-600 font-bold">{lastName}</div>
            </td>
            <td className="hidden md:table-cell">{email}</td>
            <td className="hidden md:table-cell">{phone}</td>
            <td className="hidden md:table-cell">{address}</td>
            <td className="hidden md:table-cell">{city}</td>
            <td className="hidden md:table-cell">{state}</td>
            <td className="hidden md:table-cell">{zipCode}</td>
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

export default CustomerRow;
