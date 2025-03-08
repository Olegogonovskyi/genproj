import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChronologyService } from './services/chronology.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from '../../enums/controllerEnum';
import { CreateUpdateDto } from './dto/req/createUpdate.dto';
import { ChronologyEntity } from '../../database/entities/chronology.entity';
import { Roles } from '../users/decorators/roleDecorator';
import { RoleEnum } from '../../database/enums/role.enum';
import { RolesGuard } from '../users/guards/RolesGuard';

@ApiTags(ControllerEnum.CHRONOLOGYADMIN)
@Controller(ControllerEnum.CHRONOLOGYADMIN)
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(RoleEnum.ADMIN)
export class ChronologyAdminController {
  constructor(private readonly chronologyService: ChronologyService) {}

  @ApiOperation({ summary: 'create date to chronology' })
  @Post('create')
  public async register(
    @Body() createUpdateDto: CreateUpdateDto,
  ): Promise<ChronologyEntity> {
    return await this.chronologyService.create(createUpdateDto);
  }

  @ApiOperation({ summary: 'update date to chronology' })
  @Post('update')
  public async update(
    @Body() createUpdateDto: CreateUpdateDto,
    @Param('id') id: string,
  ): Promise<ChronologyEntity> {
    return await this.chronologyService.update(createUpdateDto, id);
  }

  @ApiOperation({ summary: 'delete some date' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async deleteDate(@Param('id') id: string): Promise<void> {
    await this.chronologyService.delete(id);
  }
}
