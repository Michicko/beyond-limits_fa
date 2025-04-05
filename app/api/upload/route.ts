import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: Request) {
  try {
    const uploadsFolder = "beyondlimitsfa";
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const filename = formData.get("name") as string;

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }
    const fileBuffer = await file.arrayBuffer();
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "auto", folder: uploadsFolder, public_id: filename },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result);
          }
        )
        .end(Buffer.from(fileBuffer));
    });

    return Response.json({ data: result });
  } catch (error) {
    return Response.json({ error: "Error uploading file" }, { status: 500 });
  }
}
