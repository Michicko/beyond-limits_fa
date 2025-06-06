import { deleteUser } from "@/app/_actions/user-actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const result = await deleteUser(userId);
    if (result.status === "error") {
      return NextResponse.json(
        {
          status: result.status,
          message: result.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to create user",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
