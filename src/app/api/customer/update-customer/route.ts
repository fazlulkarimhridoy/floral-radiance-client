import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const prisma = new PrismaClient();

        const {
            id,
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            state,
            zipCode,
        } = await req.json();
        const result = await prisma.customer.update({
            where: {
                id: id,
            },
            data: {
                firstName,
                lastName,
                email,
                phone,
                address,
                city,
                state,
                zipCode,
            },
        });
        return NextResponse.json({ status: "success", data: result });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
