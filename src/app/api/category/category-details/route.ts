import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        let { searchParams }: any = new URL(req.url);
        let name = searchParams.get("name");
        const prisma = new PrismaClient();
        const result = await prisma.category.findFirst({
            where: {
                name: name,
            },
            include: {
                products: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        console.log(result?.products);
        return NextResponse.json({ status: "success", data: result });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
