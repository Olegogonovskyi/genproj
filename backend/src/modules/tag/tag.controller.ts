import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '../auth/decorators/skipAuthDecorator';
import { TagMapper } from './tagMapper';
import { TagsResDto } from './dto/res/tagsResDto';
import { ControllerEnum } from '../../enums/controllerEnum';

@ApiTags(ControllerEnum.TAG)
@Controller(ControllerEnum.TAG)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @SkipAuth()
  @Get('popular')
  public async getPopular(): Promise<TagsResDto[]> {
    const result = await this.tagService.getPopular();
    return TagMapper.toResponseListDTO(result);
  }
}
