import { NextResponse } from "next/server";
import { prisma } from "../..";
import * as argon from "argon2";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: { note: true },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User fetched succesfully", data: user },
      { status: 200 }
    );
  } catch (err) {
    throw err;
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (body.password) {
      const hashedPassword = await argon.hash(body.password);
      await prisma.user.update({
        where: { id },
        data: {
          ...body,
          password: hashedPassword,
        },
      });

      return NextResponse.json(
        { message: "User updated succesfully" },
        { status: 200 }
      );
    }

    await prisma.user.update({ where: { id }, data: { ...body } });

    return NextResponse.json(
      { message: "User updated succesfully" },
      { status: 200 }
    );
  } catch (err) {
    throw err;
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    throw err;
  }
}
