import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";

if (!process.env.R2_PUBLIC_URL) {
  console.log("Please provide your r2 bucket public url");
}

class UploadService {
  client;

  constructor() {
    this.client = new S3Client({
      region: "auto",
      endpoint: process.env.R2_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY!,
        secretAccessKey: process.env.R2_SECRET_KEY!,
      },
    });
  }

  async convertToWebp(fileBuffer: Buffer): Promise<Buffer> {
    return await sharp(fileBuffer).webp({ quality: 80 }).toBuffer();
  }

  async uploadImageFile({ file, key }: { file: File; key: string }) {
    const arrayBuffer = await file.arrayBuffer();
    let fileBuffer: Buffer = Buffer.from(arrayBuffer);

    if (file.type !== "image/webp") {
      fileBuffer = await this.convertToWebp(fileBuffer);
    }

    const safeBuffer = Buffer.from(fileBuffer);

    await this.client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        Body: safeBuffer,
        ContentType: "image/webp",
      }),
    );

    return {
      key,
      url: `${process.env.R2_PUBLIC_URL}/${key}`,
    };
  }

  async deleteFile(key: string) {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET,
          Key: key,
        }),
      );
      return true;
    } catch (err) {
      console.error("R2 delete error:", err);
      return false;
    }
  }
}

const uploadService = new UploadService();
export default uploadService;
