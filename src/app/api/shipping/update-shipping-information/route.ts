import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const prisma = new PrismaClient();
        const {
            id,
            shippingAddress,
            city,
            state,
            zipCode,
            shippingDate,
            deliveryDate,
        } = await req.json();

        const updatedShipping = await prisma.shipping.update({
            where: { id: parseInt(id) },
            data: {
                shippingAddress,
                city,
                state,
                zipCode,
                shippingDate: shippingDate ? new Date(shippingDate) : undefined,
                deliveryDate: deliveryDate ? new Date(deliveryDate) : undefined,
            },
        });

        return NextResponse.json({ status: "success", data: updatedShipping });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
