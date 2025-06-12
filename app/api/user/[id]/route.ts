import { NextResponse } from "next/server";
import { User } from "../../entity/user.entity";
import { AppDataSource } from "../../database";
import * as argon from "argon2";

const userRepository = AppDataSource.getRepository(User);

export async function GET(req: Request, { params }) {
  try {
    const { id } = params;
    const user = await userRepository.findOneBy(id);
    if (!user) {
      throw NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "All user fetched succesfully", data: user },
      { status: 200 }
    );
  } catch (err) {
    throw NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const existingUser = await userRepository.find({
      where: { id },
    });
    if (!existingUser) {
      throw NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (body.password) {
      const hashedPassword = await argon.hash(body.password);
      await userRepository.update(id, {
        ...body,
        password: hashedPassword,
      });

      return NextResponse.json(
        { message: "User updated succesfully" },
        { status: 204 }
      );
    }

    await userRepository.update(id, body);

    return NextResponse.json(
      { message: "User updated succesfully" },
      { status: 204 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}
