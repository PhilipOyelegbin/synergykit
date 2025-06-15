import { NextResponse } from "next/server";
import { prisma } from "..";

export async function POST(req: Request) {
  try {
    const { userId, description } = await req.json();
    if (!userId || !description) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newNote = await prisma.note.create({
      data: {
        userId,
        description,
      },
    });
    return NextResponse.json(
      { message: "Note created succesfully", data: newNote },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}

export async function GET() {
  try {
    const noteData = await prisma.note.findMany();
    if (!noteData || noteData.length <= 0) {
      return NextResponse.json({ message: "No notes found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "All note fetched succesfully", data: noteData },
      { status: 200 }
    );
  } catch (err) {
    throw NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}
