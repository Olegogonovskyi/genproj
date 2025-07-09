import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FileStorageService } from '../filestorage/filestorageService';
import { RegisterAuthResDto } from '../auth/dto/res/register.auth.res.dto';
import { BaseImageReqDto } from './dto/req/baseImageReq.dto';
import { ContentType } from '../filestorage/enums/content-type.enum';

@Injectable()
export class ImagesService {
  constructor(private readonly fileStorageService: FileStorageService) {}

  public async uploadFoto(
    image: Express.Multer.File,
    userData: RegisterAuthResDto,
    uploadFotoDto: BaseImageReqDto,
  ): Promise<string> {
    try {
      return image
        ? await this.fileStorageService.uploadFile(
            image,
            ContentType.ARTICLE,
            userData.id,
            uploadFotoDto.name,
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

  public async getAllOrOne(fotoUrl?: string) {
    try {
      return await this.fileStorageService.getAllFiles(fotoUrl);
    } catch (err) {
      throw new InternalServerErrorException('Images delete failed');
    } // тут поверне фото
  }
}
