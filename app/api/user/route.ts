import { NextResponse } from "next/server";
import * as argon from "argon2";
import { prisma } from "..";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await argon.hash(password);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered succesfully", data: newUser },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}

export async function GET() {
  try {
    const userData = await prisma.user.findMany();
    return NextResponse.json(
      { message: "All user fetched succesfully", data: userData },
      { status: 200 }
    );
  } catch (err) {
    throw NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}
