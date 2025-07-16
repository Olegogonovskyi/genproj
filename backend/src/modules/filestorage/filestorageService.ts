import { randomUUID } from 'node:crypto';

import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsConfig, Config } from '../../config/config.types';
import { ContentType } from './enums/content-type.enum';
import { ImagesResDto } from '../images/dto/res/images.res.dto';
import { ImageMapper } from '../images/mappers/imageMapper';

@Injectable()
export class FileStorageService {
  private readonly awsConfig: AwsConfig;
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService<Config>) {
    this.awsConfig = this.configService.get<AwsConfig>('aws');

    this.s3Client = new S3Client({
      // forcePathStyle: true,
      // endpoint: this.awsConfig.endpoint,
      region: this.awsConfig.region,
      credentials: {
        accessKeyId: this.awsConfig.accessKeyId,
        secretAccessKey: this.awsConfig.secretAccessKey,
      },
    });
  }

  public async uploadFile(
    file: Express.Multer.File,
    itemType: ContentType,
    fileName?: string,
  ): Promise<string> {
    try {
      const nameToFile = fileName ? fileName : file.originalname;
      const fotoUrl = this.buildPath(itemType, nameToFile);
      console.log(`fotoUrl ${fotoUrl}`);
      console.log(`this.awsConfig.bucketName ${this.awsConfig.bucketName}`);
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.awsConfig.bucketName,
          Key: fotoUrl,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        }),
      );
      return fotoUrl;
    } catch (error) {
      console.error('❌ Помилка при запиті до S3 PutObjectCommand:');
      console.error('Message:', error.message);
      console.error('Code:', error.code);
      console.error('Stack:', error.stack);
      throw new InternalServerErrorException('S3 list error');
    }
  }

  public async getAllFiles(
    limitUrls: number,
    contentType: ContentType,
    contineToken?: string,
  ): Promise<ImagesResDto> {
    try {
      const response = await this.s3Client.send(
        new ListObjectsV2Command({
          Bucket: process.env.AWS_BUCKET_NAME,
          Prefix: contentType,
          MaxKeys: limitUrls,
          ContinuationToken: contineToken,
        }),
      );
      return {
        urls:
          response.Contents?.map((item) => ImageMapper.urlMaker(item.Key!)) ??
          [],
        nextToken: response.NextContinuationToken,
      };
    } catch (error) {
      console.error('❌ Помилка при запиті до S3 ListObjectsV2Command:');
      console.error('Message:', error.message);
      console.error('Code:', error.code);
      console.error('Stack:', error.stack);
      throw new InternalServerErrorException('S3 list error');
    }
  }

  public async deleteFile(fotoUrl: string): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.awsConfig.bucketName,
          Key: fotoUrl,
        }),
      );
    } catch (error) {
      throw new Error('filestorageServise: fail to deleteFile');
    }
  }

  private buildPath(itemType: ContentType, fileName?: string): string {
    if (fileName) {
      return `${itemType}/${randomUUID()}${fileName}`;
    }
    return `${itemType}/${randomUUID()}`; // use only  template string
  }
}
