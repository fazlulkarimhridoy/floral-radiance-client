import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const prisma = new PrismaClient();
        let { searchParams }: any = new URL(req.url);
        let productId = parseInt(searchParams.get("productId"));
        const reviews = await prisma.review.findMany({
            where: {
                productId: productId,
            },
            include: {
                customer: true,
            },
        });
        return NextResponse.json({ status: "success", data: reviews });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
