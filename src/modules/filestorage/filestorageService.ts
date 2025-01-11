import { randomUUID } from 'node:crypto';
import * as path from 'node:path';

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsConfig, Config } from '../../config/config.types';
import * as stream from 'node:stream';
import { promisify } from 'util';

const pipeline = promisify(stream.pipeline);

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
    itemType: string,
  ): Promise<string> {
    const filePath = this.buildPath(itemType, file.originalname);
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.awsConfig.bucketName,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }),
    );
    return filePath;
  }

  public async readFile(filePath: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.awsConfig.bucketName,
      Key: filePath,
    });
    const response = await this.s3Client.send(command);

    if (response.Body) {
      const chunks: Uint8Array[] = [];
      await pipeline(
        response.Body as stream.Readable,
        async function* (source) {
          for await (const chunk of source) {
            chunks.push(chunk as Uint8Array);
          }
        },
      );
      return Buffer.concat(chunks).toString('utf-8');
    }
    throw new Error('Unable to read file from S3');
  }

  public async deleteFile(filePath: string): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.awsConfig.bucketName,
          Key: filePath,
        }),
      );
    } catch (error) {
      throw new Error('filestorageServise 60');
    }
  }

  private buildPath(itemType: string, fileName: string): string {
    return `${itemType}/${randomUUID()}${path.extname(fileName)}`; // use only  template string
  }
}
