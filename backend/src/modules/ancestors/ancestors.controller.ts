import { Controller, Get, Param, Query } from '@nestjs/common';
import { AncestorsService } from './services/ancestors.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from '../../enums/controllerEnum';
import { PersonsQueryDto } from './dto/req/personsQuery.dto';
import { AncestorMaper } from './mappers/ancestor.maper';
import { PersonsListQueryDto } from './dto/res/persons.listQuery.dto';

@ApiTags(ControllerEnum.ANCESTORS)
@Controller(ControllerEnum.ANCESTORS)
export class AncestorsController {
  constructor(private readonly ancestorsService: AncestorsService) {}

  @ApiOperation({ summary: 'get ancestor by id' })
  @Get('ancestorId')
  public async getById(@Param('ancestorId') ancestorId: string) {
    const result = await this.ancestorsService.getById(ancestorId);
    return AncestorMaper.personMapper(result);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: `get all ancestors`,
  })
  @Get('all')
  public async getAllAncestors(
    @Query() query: PersonsQueryDto,
  ): Promise<PersonsListQueryDto> {
    const [entities, number] =
      await this.ancestorsService.getAllAncestors(query);
    const resPersons = entities.map((entity) =>
      AncestorMaper.personMapper(entity),
    );
    return { data: resPersons, total: number, ...query };
  }
}
