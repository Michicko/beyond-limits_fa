import { NextRequest, NextResponse } from "next/server";
import cloudinary from 'cloudinary';

const cloud = cloudinary.v2;

const API_SECRET = process.env.CLOUDINARY_API_SECRET || '';
const API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

cloud.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const public_id = body.public_id;

    const timestamp = Math.round((new Date).getTime()/1000);
    const signature = cloud.utils.api_sign_request(
      {
        timestamp,
        folder: "beyondlimitsfa",
        public_id
      },
      API_SECRET
    )
    const result = { timestamp, signature, API_KEY, CLOUD_NAME };
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to sign upload",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
