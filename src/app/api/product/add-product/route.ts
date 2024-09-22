import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const prisma = new PrismaClient();
        const productData = await req.json();
        const result = await prisma.product.create({
            data: productData,
        });
        return NextResponse.json({ status: "success", data: result });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
