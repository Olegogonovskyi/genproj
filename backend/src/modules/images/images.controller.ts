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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { ControllerEnum } from '../../enums/controllerEnum';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAccessGuard } from '../auth/quards/jwtAccesGuard';
import { RolesGuard } from '../articlesNew/guards/RolesGuard';
import { Roles } from '../users/decorators/roleDecorator';
import { RoleEnum } from '../../database/enums/role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ContentType } from '../filestorage/enums/content-type.enum';
import { CurrentUser } from '../auth/decorators/currentUserDecorator';
import { RegisterAuthResDto } from '../auth/dto/res/register.auth.res.dto';
import { BaseImageReqDto } from './dto/req/baseImageReq.dto';
import { ImagesQueryDto } from './dto/req/images.query.dto';
import { ApiFileWithuploadImageReqDto } from './decorators/ApiFileWithBaseImageDto';
import { uploadImageReqDto } from './dto/req/upload.image.req.dto';


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
  @UseInterceptors(FilesInterceptor(ContentType.ARTICLE, 10))
  @ApiFileWithuploadImageReqDto()
  @Post()
  public async uploadfoto(
    @CurrentUser() userData: RegisterAuthResDto,
    @UploadedFiles() image: Express.Multer.File,
    @Body() uploadFotoDto: BaseImageReqDto,
  ) {
    return await this.imagesService.uploadFoto(image, userData, uploadFotoDto);
  }

  @ApiOperation({ summary: 'delete image by url' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.WRITTER)
  @Delete(':photoUrl')
  public async deleteFoto(@Param('fotoUrl') fotoUrl: string): Promise<void> {
    return await this.imagesService.deleteFoto(fotoUrl);
  }

  @ApiOperation({ summary: 'get all images' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.WRITTER)
  @Get()
  public async getAll(@Query() query: ImagesQueryDto) {
    return await this.imagesService.getAllOrOne(query);
  }
}
