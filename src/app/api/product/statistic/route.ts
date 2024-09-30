import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const prisma = new PrismaClient();
        const result = await prisma.product.aggregate({
            _count: true,
        });
        return NextResponse.json({ status: "success", data: result });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
