import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateUpdateArticleDto } from './dto/req/createUpdate.article.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ArticleResDto } from './dto/res/articleRes.dto';
import { ArticleListRequeryDto } from './dto/req/query.dto';
import { ArticleListResDto } from './dto/res/articleListRes.dto';
import { ControllerEnum } from '../../enums/controllerEnum';
import { CurrentUser } from '../auth/decorators/currentUserDecorator';
import { GetMeReq } from '../users/dto/res/GetMeReq.dto';
import { ContentType } from '../filestorage/enums/content-type.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiFileWithDto } from './decorator/ApiFileWithDto';
import { RegisterAuthResDto } from '../auth/dto/res/register.auth.res.dto';
import { ArticleMapper } from './mapers/ArticleMapper';

@ApiTags(ControllerEnum.ARTICLES)
@Controller(ControllerEnum.ARTICLES)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new article' })
  @ApiConsumes('multipart/form-data')
  @ApiExtraModels(CreateUpdateArticleDto)
  @UseInterceptors(FilesInterceptor(ContentType.ARTICLE, 10))
  @ApiBody({ type: CreateUpdateArticleDto })
  @ApiFileWithDto(ContentType.ARTICLE, CreateUpdateArticleDto, true, true)
  @Post()
  public async create(
    @CurrentUser() userData: RegisterAuthResDto,
    @Body() createArticleDto: CreateUpdateArticleDto,
    @UploadedFiles() image: Array<Express.Multer.File>,
  ): Promise<ArticleResDto> {
    const result = await this.articleService.create(
      userData,
      createArticleDto,
      image,
    );
    return ArticleMapper.toResCreateUpdateDto(result);
  }

  @Get()
  public async getList(
    @CurrentUser() userData: GetMeReq,
    @Query() query: ArticleListRequeryDto,
  ): Promise<ArticleListResDto> {
    const [entites, number] = await this.articleService.getList(
      userData,
      query,
    );
    return ArticleMapper.toResListDto(entites, number, query);
  }

  @Get(':postId')
  public async getById(
    @CurrentUser() userData: GetMeReq,
    @Param('articleId') articleId: string,
  ): Promise<ArticleResDto> {
    const result = await this.articleService.getById(userData, articleId);

    return ArticleMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Patch(':articleId')
  public async update(
    @CurrentUser() userData: GetMeReq,
    @Param('articleId') articleId: string,
    @Body() updateArticleDto: CreateUpdateArticleDto,
  ): Promise<ArticleResDto> {
    const result = await this.articleService.updateuserData(
      userData,
      articleId,
      updateArticleDto,
    );
    return ArticleMapper.toResDto(result);
  }
}
