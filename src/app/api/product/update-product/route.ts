import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const prisma = new PrismaClient();
        let { searchParams }: any = new URL(req.url);
        let id = parseInt(searchParams.get("id"));
        const productUpdateData = await req.json();
        const result = await prisma.product.update({
            where: {
                id: id,
            },
            data: productUpdateData,
        });
        return NextResponse.json({ status: "success", data: result });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
