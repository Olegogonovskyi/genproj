export class ImageMapper {
  public static urlMaker(s3ImageUrl: string): string {
    return `${process.env.AWS_S3_BUCKET_URL}/${s3ImageUrl}`;
  }
}
