"use client"
import { Loading3QuartersOutlined } from "@ant-design/icons";

const loading = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <Loading3QuartersOutlined />
            <h2>loading.....</h2>
        </div>
    );
};

export default loading;