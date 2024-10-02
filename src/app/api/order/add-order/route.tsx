import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const prisma = new PrismaClient();

    try {
        const orderData = await req.json();

        // Create the order with Prisma
        const result = await prisma.order.create({
            data: orderData,
        });

        return NextResponse.json({ status: "success", data: result });
    } catch (error: any) {
        // Log the full error for debugging
        console.error("Prisma Error: ", error.message); // Detailed error message
        console.error("Full Error Object: ", error); // Full error object

        // Return the error message in the response
        return NextResponse.json({
            status: "fail",
            message: error.message || "Something went wrong",
            error: error, // Optional: include the full error for detailed insights
        });
    } finally {
        // Clean up the Prisma client connection
        await prisma.$disconnect();
    }
}
