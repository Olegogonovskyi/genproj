import { Controller, Get, Param } from '@nestjs/common';
import { AncestorsService } from './ancestors.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from '../../enums/controllerEnum';

@ApiTags(ControllerEnum.ANCESTORS)
@Controller(ControllerEnum.ANCESTORS)
export class AncestorsController {
  constructor(private readonly ancestorsService: AncestorsService) {}

  @ApiOperation({ summary: 'get ancestor by id' })
  @Get('ancestorId')
  public async getById(@Param('ancestorId') ancestorId: string) {
    return await this.ancestorsService.getById(ancestorId)
  }
}
