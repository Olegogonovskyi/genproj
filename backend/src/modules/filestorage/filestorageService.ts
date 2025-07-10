import { randomUUID } from 'node:crypto';
import * as path from 'node:path';

import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsConfig, Config } from '../../config/config.types';
import { ContentType } from './enums/content-type.enum';
import { ImagesResDto } from '../images/dto/res/images.res.dto';

@Injectable()
export class FileStorageService {
  private readonly awsConfig: AwsConfig;
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService<Config>) {
    this.awsConfig = this.configService.get<AwsConfig>('aws');

    this.s3Client = new S3Client({
      forcePathStyle: true,
      endpoint: this.awsConfig.endpoint,
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
    itemId: string,
    fileName?: string,
  ): Promise<string> {
    const nameToFile = fileName ? fileName : file.originalname;
    const fotoUrl = this.buildPath(itemType, itemId, nameToFile);
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
  }

  public async getAllFiles(
    limitUrls: number,
    fotoUrl?: string | undefined,
    contineToken?: string,
  ): Promise<ImagesResDto> {
    const response = await this.s3Client.send(
      new ListObjectsV2Command({
        Bucket: this.awsConfig.bucketName,
        Prefix: fotoUrl, // БЕЗ  @Param('articleId') articleId: string, ПОверне всьо
        MaxKeys: limitUrls,
        ContinuationToken: contineToken,
      }),
    );

    return {
      urls: response.Contents?.map((item) => item.Key!) ?? [],
      nextToken: response.NextContinuationToken,
    };
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

  private buildPath(
    itemType: ContentType,
    itemId: string,
    fileName: string,
  ): string {
    return `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`; // use only  template string
  }
}
