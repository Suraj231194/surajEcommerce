import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma.js";
import bcrypt from "bcryptjs";
export async function GET() {
    try {
        // Test DB Connection
        const userCount = await prisma.user.count();
        console.log("User count:", userCount);
        // Test Bcrypt
        const hash = await bcrypt.hash("testpassword", 10);
        console.log("Hash generated:", hash);
        return NextResponse.json({
            status: "ok",
            userCount,
            hashGenerated: true,
            databaseUrl: process.env.DATABASE_URL?.split("@")[1] // Log part of URL for verification (safe)
        });
    }
    catch (error) {
        console.error("Debug Error:", error);
        return NextResponse.json({
            status: "error",
            message: error.message,
            stack: error.stack
        }, { status: 200 });
    }
}
