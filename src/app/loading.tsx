"use client"
import { Loading3QuartersOutlined } from "@ant-design/icons";

const loading = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Loading3QuartersOutlined />
            <h2>loading.....</h2>
        </div>
    );
};

export default loading;