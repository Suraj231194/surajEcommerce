import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma.js";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function GET() {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
            },
        });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
}
