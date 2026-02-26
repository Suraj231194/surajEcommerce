import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(req) {
    try {
        const { email, password, firstName, lastName } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
            },
        });
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: false, // process.env.NODE_ENV === "production", // TODO: Enable this when we have HTTPS
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });
        return NextResponse.json({ message: "User created successfully", user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } }, { status: 201 });
    }
    catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
