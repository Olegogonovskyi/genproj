import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '../auth/decorators/skipAuthDecorator';
import { TagMapper } from './tagMapper';
import { TagsResDto } from './dto/res/tagsRes.dto';
import { ControllerEnum } from '../../enums/controllerEnum';
import { TagsQertyDto } from './dto/req/tags.qerty.dto';
import { TagsEntity } from '../../database/entities/tag.entity';
import { RoleEnum } from '../../database/enums/role.enum';
import { Roles } from '../users/decorators/roleDecorator';
import { RolesGuard } from '../articlesNew/guards/RolesGuard';
import { JwtAccessGuard } from '../auth/quards/jwtAccesGuard';
import { UpdateTagDto } from './dto/req/update-tag.dto';
import { TagsListDto } from './dto/res/tagsList.dto';

@ApiTags(ControllerEnum.TAG)
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller(ControllerEnum.TAG)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @SkipAuth()
  @Get('popular')
  public async getPopular(): Promise<TagsResDto[]> {
    const result = await this.tagService.getPopular();
    return TagMapper.toResponseListDTO(result);
  }

  @ApiOperation({
    summary: `Get list of Tags *only for ${RoleEnum.ADMIN} and ${RoleEnum.WRITTER}*`,
  })
  @Roles(RoleEnum.ADMIN, RoleEnum.WRITTER)
  @UseGuards(RolesGuard)
  @Get()
  public async getListOfTags(
    @Query() query: TagsQertyDto,
  ): Promise<TagsListDto> {
    const [entities, total] = await this.tagService.getListofTags(query);
    return TagMapper.toResListDto(entities, total, query);
  }

  @ApiOperation({
    summary: `Remove tag *only for ${RoleEnum.ADMIN}*`,
  })
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':tagId')
  public async deleteTag(
    @Param('tagId', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.tagService.deleteTag(id);
  }

  @ApiOperation({
    summary: `Update tags *only for ${RoleEnum.ADMIN}*`,
  })
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':tagId')
  public async updateTag(
    @Body() updateTagDto: UpdateTagDto,
    @Param('tagId', ParseUUIDPipe) id: string,
  ): Promise<TagsEntity> {
    return await this.tagService.updateTag(updateTagDto, id);
  }
}
