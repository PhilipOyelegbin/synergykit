import { NextResponse } from "next/server";
import * as argon from "argon2";
import { prisma } from "..";
import { Token } from "@/app/_helper";
import { Mailer } from "../mailer";

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
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await argon.hash(password);
    const token = Token.generate(32);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verification_token: token,
        verification_token_expiration: new Date(
          Date.now() + 1 * 60 * 60 * 1000
        ),
      },
    });

    delete newUser.password;
    const mailBody = `
      <p>Hello ${newUser.name},</p>

      <p>Thank you for registering with us, we are excited to have you on board. Your account has been created successfully.</p>

      <p>Kindly click the <a href="${process.env.NEXTAUTH_URL}/me/${newUser.verification_token}">LINK</a> to verify your account.</p>

      <p>Best regards,</p>
      <p><b>SynergyKit Team</b></p>
    `;
    await Mailer.sendMail(newUser.email, "Welcome to SynergyKit", mailBody);

    return NextResponse.json(
      { message: "User created, check your email!", data: newUser },
      { status: 201 }
    );
  } catch (err) {
    throw err;
  }
}

export async function GET() {
  try {
    const userData = await prisma.user.findMany();
    if (!userData || userData.length <= 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "All user fetched succesfully", data: userData },
      { status: 200 }
    );
  } catch (err) {
    throw err;
  }
}

export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (existingUser.isVerify) {
      return NextResponse.json(
        { message: "User already verified" },
        { status: 400 }
      );
    }

    const token = Token.generate(32);
    await prisma.user.update({
      where: { id },
      data: {
        verification_token: token,
        verification_token_expiration: new Date(
          Date.now() + 1 * 60 * 60 * 1000
        ),
      },
    });

    const mailBody = `
      <p>Hello ${existingUser.name},</p>

      <p>Thank you for registering with us, we are excited to have you on board.</p>
      
      <p>Kindly click the <a href="${process.env.NEXTAUTH_URL}/me/${token}">LINK</a> to verify your account.</p>
      
      <p>Best regards,</p>
      <p><b>SynergyKit Team</b></p>
    `;
    await Mailer.sendMail(existingUser.email, "Verify your account", mailBody);

    return NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 }
    );
  } catch (err) {
    throw err;
  }
}
