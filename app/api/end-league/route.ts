// app/api/end-league/route.ts

import { endLeague } from "@/app/_actions/actions"; // your server action
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "League ID is required" },
        { status: 400 }
      );
    }

    const result = await endLeague(id);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("API error in /api/end-league", error);
    return NextResponse.json(
      { error: (error as Error).message || "Something went wrong" },
      { status: 500 }
    );
  }
}
