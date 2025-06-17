import { NextResponse } from "next/server";
import { prisma } from "../..";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const note = await prisma.note.findUnique({ where: { id: parseInt(id) } });
    if (!note) {
      throw NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Note fetched succesfully", data: note },
      { status: 200 }
    );
  } catch (err) {
    throw NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const existingNote = await prisma.note.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingNote) {
      throw NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    await prisma.note.update({
      where: { id: parseInt(id) },
      data: { ...body },
    });

    return NextResponse.json(
      { message: "Note updated succesfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const note = await prisma.note.findUnique({ where: { id: parseInt(id) } });

    if (!note) {
      throw NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    await prisma.note.delete({ where: { id: parseInt(id) } });

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
}
