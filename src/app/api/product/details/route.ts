import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        let { searchParams }: any = new URL(req.url);
        let id = parseInt(searchParams.get("id"));
        const prisma = new PrismaClient();
        const products = await prisma.product.findUnique({
            where: {
                id: id,
            },
        });
        return NextResponse.json({ status: "success", data: products });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
