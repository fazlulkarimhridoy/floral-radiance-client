import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        let { searchParams }: any = new URL(req.url);
        let id = parseInt(searchParams.get("id"));
        const prisma = new PrismaClient();
        const result = await prisma.order.findUnique({
            where: {
                id: id,
            },
            include: {
                items: true,
                customer: true,
                payment: true,
                shipping: true,
            },
        });
        return NextResponse.json({ status: "success", data: result });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}