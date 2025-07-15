import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { ControllerEnum } from '../../enums/controllerEnum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAccessGuard } from '../auth/quards/jwtAccesGuard';
import { RolesGuard } from '../articlesNew/guards/RolesGuard';
import { Roles } from '../users/decorators/roleDecorator';
import { RoleEnum } from '../../database/enums/role.enum';
import { ContentType } from '../filestorage/enums/content-type.enum';
import { BaseImageReqDto } from './dto/req/baseImageReq.dto';
import { ImagesQueryDto } from './dto/req/images.query.dto';
import { ApiFileWithuploadImageReqDto } from './decorators/ApiFileWithBaseImageDto';
import { uploadImageReqDto } from './dto/req/upload.image.req.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageMapper } from './mappers/imageMapper';
import { ImagesResDto } from './dto/res/images.res.dto';

@ApiTags(ControllerEnum.IMAGES)
@Controller(ControllerEnum.IMAGES)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOperation({ summary: 'Upload image' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.WRITTER)
  @ApiExtraModels(uploadImageReqDto)
  @UseInterceptors(FileInterceptor(ContentType.ARTICLE))
  @ApiBody({ type: uploadImageReqDto })
  @ApiFileWithuploadImageReqDto()
  @Post()
  public async uploadfoto(
    @UploadedFile() image: Express.Multer.File,
    @Body() uploadFotoDto: BaseImageReqDto,
  ): Promise<string> {
    const result = await this.imagesService.uploadFoto(image, uploadFotoDto);
    return ImageMapper.urlMaker(result);
  }

  @ApiOperation({ summary: 'delete image by url' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.WRITTER)
  @Delete(':photoUrl')
  public async deleteFoto(@Param('photoUrl') photoUrl: string): Promise<void> {
    console.log(`deleteFoto fotoUrl ${photoUrl}`);
    return await this.imagesService.deleteFoto(photoUrl);
  }

  @ApiOperation({ summary: 'get all images' })
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.WRITTER)
  @Get()
  public async getAll(@Query() query: ImagesQueryDto): Promise<ImagesResDto> {
    return await this.imagesService.getAllOrOne(query, ContentType.ARTICLE);
  }
}
