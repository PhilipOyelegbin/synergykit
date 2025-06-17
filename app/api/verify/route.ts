import { NextResponse } from "next/server";
import { prisma } from "..";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        verification_token: token,
        verification_token_expiration: { gt: new Date() },
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        { message: "Token is invalid" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        isVerify: true,
        verification_token: null,
        verification_token_expiration: null,
      },
    });

    return NextResponse.json({ message: "User verified" }, { status: 200 });
  } catch (err) {
    throw err;
  }
}
