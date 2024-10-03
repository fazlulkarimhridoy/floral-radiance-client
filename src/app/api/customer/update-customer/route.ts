import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const prisma = new PrismaClient();
        let { searchParams }: any = new URL(req.url);
        let id = parseInt(searchParams.get("id"));
        const updateData = await req.json();
        const result = await prisma.customer.update({
            where: {
                id: id,
            },
            data: updateData,
        });
        return NextResponse.json({ status: "success", data: result });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
