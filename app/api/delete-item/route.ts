import { deleteRouter } from "@/app/_actions/deleteRouter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, module, images } = await req.json();

  try {
    const result = await deleteRouter({ id, module, images });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Deletion failed",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
