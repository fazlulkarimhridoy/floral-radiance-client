import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const prisma = new PrismaClient();
        const categoryData = await req.json();
        const result = await prisma.category.create({
            data: categoryData,
        });
        return NextResponse.json({ status: "success", data: result });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
