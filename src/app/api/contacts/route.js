import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

let contacts = [];

// GET
export async function GET() {
  return NextResponse.json(contacts);
}

// POST
export async function POST(request) {
  const formData = await request.formData();

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const phoneNumber = formData.get("phoneNumber");
  const info = formData.get("info");
  const file = formData.get("file");
  const background = formData.get("background");

  if (!phoneNumber || phoneNumber.length !== 10) {
    return NextResponse.json(
      { error: "Needs to be 10 digit number" },
      { status: 400 },
    );
  }

  //Profile Pic
  let imageUrl = null;
  if (file && file.name) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    await writeFile(filePath, buffer);
    imageUrl = `/uploads/${fileName}`;
  }

  //Background Pic
  let backgroundUrl = null;
  if (background && background.name) {
    const bytes = await background.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const backgroundName = `${Date.now()}-${background.name}`;
    const backgroundPath = path.join(
      process.cwd(),
      "public/uploads",
      backgroundName,
    );

    await writeFile(backgroundPath, buffer);
    backgroundUrl = `/uploads/${backgroundName}`;
  }

  const newContact = {
    id: Date.now(),
    firstName,
    lastName,
    phoneNumber,
    info,
    imageUrl,
    backgroundUrl,
  };

  contacts.push(newContact);

  return NextResponse.json(newContact, { status: 201 });
}

// DELETE
export async function DELETE(request) {
  const { id } = await request.json();
  contacts = contacts.filter((contact) => contact.id !== id);
  return new NextResponse(null, { status: 204 });
}

// PUT (Edit)
export async function PUT(request) {
  const { id, firstName, lastName, phoneNumber, info, imageUrl } =
    await request.json();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);

  if (contactIndex !== -1) {
    contacts[contactIndex] = {
      id,
      firstName,
      lastName,
      phoneNumber,
      info,
      imageUrl,
    };
    return NextResponse.json(contacts[contactIndex], { status: 200 });
  }
  return new NextResponse(null, { status: 404 });
}
