/** @type {import('next').NextConfig} */
import { Module } from "module";

// next.config.js
Module.exports = {
    output: "standalone",
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
