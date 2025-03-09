import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChronologyService } from './services/chronology.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from '../../enums/controllerEnum';
import { ChronologyEntity } from '../../database/entities/chronology.entity';
import { ChronologyQueryDto } from './dto/req/chronologyQueryDto';
import { ChronologyMapper } from './services/chronologyMapper';
import { ChronologyListResDto } from './dto/res/chronologyListResDto';

@ApiTags(ControllerEnum.CHRONOLOGY)
@Controller(ControllerEnum.CHRONOLOGY)
export class ChronologyController {
  constructor(private readonly chronologyService: ChronologyService) {}

  @ApiOperation({ summary: 'get date' })
  @Get('dateId')
  public async getById(
    @Param('dateId') dateId: string,
  ): Promise<ChronologyEntity> {
    return await this.chronologyService.getById(dateId);
  }

  @ApiOperation({ summary: 'get list of dates' })
  @Get()
  public async getListofDates(
    @Query() query: ChronologyQueryDto,
  ): Promise<ChronologyListResDto> {
    const [entities, number] =
      await this.chronologyService.getListOfDates(query);
    return ChronologyMapper.toResListDto(entities, number, query);
  }
}
