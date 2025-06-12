import { NextResponse } from "next/server";
import { User } from "../entity/user.entity";
import { AppDataSource } from "../database";
import * as argon from "argon2";

const userRepository = AppDataSource.getRepository(User);

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await userRepository.find({ where: { email } });
    if (existingUser) {
      throw NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await argon.hash(password);

    const newUser = await userRepository.save({
      name,
      email,
      password: hashedPassword,
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
    const userData = await userRepository.find();
    return NextResponse.json(
      { message: "All user fetched succesfully", data: userData },
      { status: 200 }
    );
  } catch (err) {
    throw NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}
