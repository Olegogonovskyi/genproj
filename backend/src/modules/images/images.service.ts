import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FileStorageService } from '../filestorage/filestorageService';
import { BaseImageReqDto } from './dto/req/baseImageReq.dto';
import { ContentType } from '../filestorage/enums/content-type.enum';
import { ImagesResDto } from './dto/res/images.res.dto';
import { ImagesQueryDto } from './dto/req/images.query.dto';
import * as path from 'node:path';

@Injectable()
export class ImagesService {
  constructor(private readonly fileStorageService: FileStorageService) {}

  public async uploadFoto(
    image: Express.Multer.File,
    uploadFotoDto: BaseImageReqDto,
  ): Promise<string> {
    try {
      const fileName = path.basename(uploadFotoDto.name);
      return image
        ? await this.fileStorageService.uploadFile(
            image,
            ContentType.ARTICLE,
            fileName,
          )
        : '';
    } catch (err) {
      throw new InternalServerErrorException('Images upload failed');
    } // вантажу фото
  }

  public async deleteFoto(fotoUrl: string): Promise<void> {
    try {
      return await this.fileStorageService.deleteFile(fotoUrl);
    } catch (err) {
      throw new InternalServerErrorException('Images delete failed');
    } // тут я виждаляю фото
  }

  public async getAllOrOne(
    query: ImagesQueryDto,
    contentType: ContentType,
  ): Promise<ImagesResDto> {
    const { limitUrls, contineToken } = query;
    try {
      return await this.fileStorageService.getAllFiles(
        limitUrls,
        contentType,
        contineToken,
      );
    } catch (err) {
      throw new InternalServerErrorException('Images load failed');
    } // тут поверне фото
  }
}
