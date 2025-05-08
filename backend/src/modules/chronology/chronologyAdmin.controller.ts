import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChronologyService } from './services/chronology.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiBody({ type: CreateUpdateDto, isArray: true })
  @Post('create')
  public async create(
    @Body() createUpdateDto: CreateUpdateDto[],
  ): Promise<ChronologyEntity[]> {
    return await this.chronologyService.create(createUpdateDto);
  }

  @ApiOperation({ summary: 'update date to chronology' })
  @Patch(':dateId')
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

  @ApiOperation({ summary: 'upload array of dates' })
  @Post('upload')
  public async uploadFileWithDates(
    @Body() arrayOfDates: CreateUpdateDto[],
  ): Promise<ChronologyEntity[]> {
    return await this.chronologyService.addMany(arrayOfDates);
  }
}
