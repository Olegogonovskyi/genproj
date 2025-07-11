import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FileStorageService } from '../filestorage/filestorageService';
import { BaseImageReqDto } from './dto/req/baseImageReq.dto';
import { ContentType } from '../filestorage/enums/content-type.enum';
import { ImagesResDto } from './dto/res/images.res.dto';
import { ImagesQueryDto } from './dto/req/images.query.dto';

@Injectable()
export class ImagesService {
  constructor(private readonly fileStorageService: FileStorageService) {}

  public async uploadFoto(
    image: Express.Multer.File,
    uploadFotoDto: BaseImageReqDto,
  ): Promise<string> {
    try {
      return image
        ? await this.fileStorageService.uploadFile(
            image,
            ContentType.ARTICLE,
            uploadFotoDto.name,
          )
        : '';
    } catch (err) {
      throw new InternalServerErrorException('Images upload failed');
    } // вантажу фото
  }

  public async deleteFoto(fotoUrl: string): Promise<void> {
    try {
      console.log(`deleteFoto return await this.fileStorageService.deleteFile`);
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
    console.log(`public async getAllOrOne query ${query}`);
    try {
      return await this.fileStorageService.getAllFiles(
        limitUrls,
        contentType,
        contineToken,
      );
    } catch (err) {
      throw new InternalServerErrorException('Images delete failed');
    } // тут поверне фото
  }
}
