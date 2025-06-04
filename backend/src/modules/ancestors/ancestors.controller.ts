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
import { FamilesListQueryDto } from './dto/res/familes.listQuery.dto';
import { FamilyResDto } from './dto/res/family.res.dto';
import { EventsQueryDto } from './dto/req/eventsQuery.dto';
import { EventsListQueryDto } from './dto/res/events.listQuery.dto';
import { EventEntityResDto } from './dto/res/eventEntity.res.dto';

@ApiTags(ControllerEnum.ANCESTORS)
@Controller(ControllerEnum.ANCESTORS)
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
export class AncestorsController {
  constructor(private readonly ancestorsService: AncestorsService) {}

  @ApiOperation({
    summary: `get all ancestors`,
  })
  @Get('allAncestors')
  public async getAllAncestors(
    @Query() query: PersonsQueryDto,
  ): Promise<PersonsListQueryDto> {
    const [entities, number] =
      await this.ancestorsService.getAllAncestors(query);
    const resPersons = entities.map((entity) =>
      AncestorMaper.transformPersonEntity(entity),
    );
    return { data: resPersons, total: number, ...query };
  }

  @ApiOperation({
    summary: `get all events`,
  })
  @Get('allEvents')
  public async getAllEvents(
    @Query() query: EventsQueryDto,
  ): Promise<EventsListQueryDto> {
    const [entities, number] = await this.ancestorsService.getAllEvents(query);
    const resEvents = entities.map((entity) =>
      AncestorMaper.eventEntityTransform(entity),
    );
    return { data: resEvents, total: number, ...query };
  }

  @ApiOperation({
    summary: `get all families`,
  })
  @Get('allFamilies')
  public async getAllFamilies(
    @Query() query: PersonsQueryDto,
  ): Promise<FamilesListQueryDto> {
    const [entities, number] =
      await this.ancestorsService.getAllFamilies(query);
    const resFamilies = AncestorMaper.transformFamilyPerson(entities);
    return { data: resFamilies, total: number, ...query };
  }

  @ApiOperation({ summary: 'get ancestor by id' })
  @Get(':id')
  public async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PersonResDto> {
    const result = await this.ancestorsService.getById(id);
    return AncestorMaper.transformPersonEntity(result);
  }

  @ApiOperation({ summary: 'get event by id' })
  @Get('/event/:eventId')
  public async getEventById(
    @Param('eventId', ParseUUIDPipe) eventId: string,
  ): Promise<EventEntityResDto> {
    const result = await this.ancestorsService.getByEventId(eventId);
    return AncestorMaper.eventEntityTransform(result);
  }

  @ApiOperation({ summary: 'get family by id' })
  @Get('families/:familyId')
  public async getFamilyById(
    @Param('familyId', ParseUUIDPipe) id: string,
  ): Promise<FamilyResDto> {
    const result = await this.ancestorsService.getFamilyById(id);
    return AncestorMaper.transformOneFam(result);
  }
}
