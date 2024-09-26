import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const prisma = new PrismaClient();
        const { productId, customerId, rating, comment } = await req.json();
        const newReview = await prisma.review.create({
            data: {
                productId,
                customerId,
                rating,
                comment,
            },
        });
        return NextResponse.json({ status: "success", data: newReview });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
