import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AncestorsService } from './services/ancestors.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from '../../enums/controllerEnum';
import { PersonsQueryDto } from './dto/req/personsQuery.dto';
import { AncestorMaper } from './mappers/ancestor.maper';
import { PersonsListQueryDto } from './dto/res/persons.listQuery.dto';
import { JwtAccessGuard } from '../auth/quards/jwtAccesGuard';
import { PersonResDto } from './dto/res/person.res.dto';

@ApiTags(ControllerEnum.ANCESTORS)
@Controller(ControllerEnum.ANCESTORS)
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
export class AncestorsController {
  constructor(private readonly ancestorsService: AncestorsService) {}

  @ApiOperation({
    summary: `get all ancestors`,
  })
  @Get('all')
  public async getAllAncestors(
    @Query() query: PersonsQueryDto,
  ): Promise<PersonsListQueryDto> {
    console.log(query);
    const [entities, number] =
      await this.ancestorsService.getAllAncestors(query);
    const resPersons = entities.map((entity) =>
      AncestorMaper.personMapper(entity),
    );
    return { data: resPersons, total: number, ...query };
  }

  @ApiOperation({ summary: 'get ancestor by id' })
  @Get(':id')
  public async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PersonResDto> {
    const result = await this.ancestorsService.getById(id);
    return AncestorMaper.personMapper(result);
  }
}
