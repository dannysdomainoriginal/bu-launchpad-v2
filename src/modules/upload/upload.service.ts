import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

if (!process.env.R2_PUBLIC_URL) {
  console.log("Please provide your r2 bucket public url");
}

class UploadService {
  client;

  constructor() {
    this.client = new S3Client({
      region: "auto",
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY,
        secretAccessKey: process.env.R2_SECRET_KEY,
      },
    });
  }

  async convertToWebp(file: File) {
    // convert images to webp here
  }

  async uploadFile({ file, key }: { file: File; key: string }) {
    let fileBuffer;

    if (file.type === "image/webp") {
      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
    } else {
      fileBuffer = await this.convertToWebp(file);
    }

    await this.client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        Body: fileBuffer,
        ContentType: type,
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
