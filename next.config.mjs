/** @type {import('next').NextConfig} */
import { Module } from "module";

// next.config.js
Module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/admin/:id",
                destination: "/api/admin/updateProduct/[id]",
            },
        ];
    },
};

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
            },
        ],
    },
};

export default nextConfig;
