export class FileService {
  static async uploadFile(
    file: Express.Multer.File,
    orgId: number,
    userId: number,
  ) {
    const fileExtension = file.originalname.split(".").pop();
    const uniqueS3Key = `${orgId}/${crypto.randomUUID()}.${fileExtension}`;
  }
}
