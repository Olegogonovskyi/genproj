export class FileGedMaper {
  public static combainUrl(baseUrl: string): string {
    return `${process.env.AWS_S3_BUCKET_URL}/${baseUrl}`;
  }
}
