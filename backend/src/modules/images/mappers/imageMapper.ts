export class ImageMapper {
  public static urlMaker(s3ImageUrl: string): string {
    return `${process.env.AWS_S3_BUCKET_URL}/${s3ImageUrl}`;
  }
  public static extractS3Key(fullUrl: string): string {
    if (!process.env.AWS_S3_BUCKET_URL) {
      throw new Error(
        'AWS_S3_BUCKET_URL is not defined in environment variables',
      );
    }

    const baseUrl = process.env.AWS_S3_BUCKET_URL.replace(/\/+$/, ''); // Прибираємо кінцеві слеші
    return fullUrl.replace(baseUrl + '/', '').split('?')[0];
  }
}
