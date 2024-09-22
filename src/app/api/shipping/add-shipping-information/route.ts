import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const prisma = new PrismaClient();
        const { orderId, shippingAddress, city, state, zipCode } =
            await req.json();
        const newShipping = await prisma.shipping.create({
            data: {
                orderId,
                shippingAddress,
                city,
                state,
                zipCode,
                shippingDate: new Date(),
            },
        });
        return NextResponse.json({ status: "success", data: newShipping });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
