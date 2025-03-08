import { Controller, Param, Post } from '@nestjs/common';
import { ChronologyService } from './services/chronology.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from '../../enums/controllerEnum';
import { ChronologyEntity } from '../../database/entities/chronology.entity';

@ApiTags(ControllerEnum.CHRONOLOGY)
@Controller(ControllerEnum.CHRONOLOGY)
export class ChronologyController {
  constructor(private readonly chronologyService: ChronologyService) {}

  @ApiOperation({ summary: 'create date to chronology' })
  @Post('create')
  public async getById(
    @Param('dateId') dateId: string,
  ): Promise<ChronologyEntity> {
    return await this.chronologyService.getById(dateId);
  }
}
