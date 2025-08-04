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
  UseGuards,
  HttpCode,
  HttpStatus,
  Delete,
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
import { ContentType } from '../filestorage/enums/content-type.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiFileWithDto } from './decorator/ApiFileWithDto';
import { RegisterAuthResDto } from '../auth/dto/res/register.auth.res.dto';
import { ArticleMapper } from './mapers/ArticleMapper';
import { SkipAuth } from '../auth/decorators/skipAuthDecorator';
import { RolesGuard } from './guards/RolesGuard';
import { Roles } from '../users/decorators/roleDecorator';
import { RoleEnum } from '../../database/enums/role.enum';
import { JwtAccessGuard } from '../auth/quards/jwtAccesGuard';

@ApiTags(ControllerEnum.ARTICLES)
@Controller(ControllerEnum.ARTICLES)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: 'Create a new article' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.WRITTER)
  @ApiExtraModels(CreateUpdateArticleDto)
  @UseInterceptors(FilesInterceptor(ContentType.ARTICLE, 10))
  @ApiBody({ type: CreateUpdateArticleDto })
  @ApiFileWithDto(ContentType.MAINIMAGES, CreateUpdateArticleDto, true, true)
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

  @ApiOperation({ summary: 'Get all articles' })
  @SkipAuth()
  @Get()
  public async getList(
    @Query() query: ArticleListRequeryDto,
  ): Promise<ArticleListResDto> {
    const [entities, number] = await this.articleService.getList(query);
    return ArticleMapper.toResListDto(entities, number, query);
  }

  @ApiOperation({ summary: 'Find an article' })
  @SkipAuth()
  @Get(':articleId')
  public async getById(
    @Param('articleId') articleId: string,
  ): Promise<ArticleResDto> {
    const [article, statInfo] = await this.articleService.getById(articleId);
    return ArticleMapper.toResCreateUpdateDto(article, statInfo);
  }

  @ApiOperation({ summary: 'Update article' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.WRITTER)
  @ApiExtraModels(CreateUpdateArticleDto)
  @UseInterceptors(FilesInterceptor(ContentType.ARTICLE, 10))
  @ApiBody({ type: CreateUpdateArticleDto })
  @ApiFileWithDto(ContentType.ARTICLE, CreateUpdateArticleDto, true, true)
  @Patch(':articleId')
  public async update(
    @CurrentUser() userData: RegisterAuthResDto,
    @Param('articleId') articleId: string,
    @Body() updateArticleDto: CreateUpdateArticleDto,
    @UploadedFiles() image: Array<Express.Multer.File>,
  ): Promise<ArticleResDto> {
    const result = await this.articleService.updateArticle(
      userData,
      articleId,
      updateArticleDto,
      image,
    );
    return ArticleMapper.toResCreateUpdateDto(result);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: `Delete article by id`,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.WRITTER)
  @Delete(':articleId')
  public async deleteArticle(@Param('id') id: string): Promise<void> {
    await this.articleService.deleteArticle(id);
  }
}
