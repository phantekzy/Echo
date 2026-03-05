import crypto from "crypto";
import { s3 } from "./s3.client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import "dotenv/config";
export class FileService {
  static async uploadFile(
    file: Express.Multer.File,
    orgId: number,
    userId: number,
  ) {
    const fileExtension = file.originalname.split(".").pop();
    const uniqueS3Key = `${orgId}/${crypto.randomUUID()}.${fileExtension}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: uniqueS3Key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
  }
}
