import crypto from "crypto";
import { s3 } from "./s3.client.js";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import "dotenv/config";
import { db } from "../db/index.js";
import { files } from "../db/schema.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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
    const [savedFile] = await db
      .insert(files)
      .values({
        fileName: file.originalname,
        s3Key: uniqueS3Key,
        fileSize: file.size,
        mimeType: file.mimetype,
        orgId: orgId,
        uploadedBy: userId,
      })
      .returning();

    return savedFile;
  }
  static async getPresignedUrl(s3Key: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: s3Key,
    });
    return await getSignedUrl(s3, command, { expiresIn: 900 });
  }
}
