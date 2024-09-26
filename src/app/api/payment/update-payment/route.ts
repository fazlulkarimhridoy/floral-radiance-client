import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const prisma = new PrismaClient();
        const { id, paymentStatus } = await req.json();

        const updatedPayment = await prisma.payment.update({
            where: { id: parseInt(id) },
            data: {
                paymentStatus,
            },
        });

        return NextResponse.json({ status: "success", data: updatedPayment });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
