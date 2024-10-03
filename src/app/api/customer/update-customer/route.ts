import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const prisma = new PrismaClient();

        const {
            id,
            name,
            email,
            phone,
            address,
        } = await req.json();
        const result = await prisma.customer.update({
            where: {
                id: id,
            },
            data: {
                name,
                email,
                phone,
                address,
            },
        });
        return NextResponse.json({ status: "success", data: result });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
