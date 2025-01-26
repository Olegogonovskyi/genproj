import { Injectable } from '@nestjs/common';
import { FamilyRepository } from '../../repository/services/family.repository';
import { EventRepository } from '../../repository/services/event.repository';
import { GedcomRecordType } from '../../../helpers/types/GedcomRecord.Type';
import {
  exeptionFieldsLevelOne,
  familyArrFields,
  fieldsDate,
  fieldsLevelOne,
  fieldsLeveltwo,
} from './fieldconstants';
import { PersonToBaseType } from './personToBaseType';
import { DateToBaseType } from './dateToBaseType';
import { EventsEntity } from '../../../database/entities/events.entity';
import { PersonRepository } from '../../repository/services/person.repository';
import { FamilyType } from '../../../helpers/types/familyType';
import { ArrObjectType } from './arrObjectType';
import { FamilyEntity } from '../../../database/entities/family.entity';
import { PersonToBase } from '../../../helpers/types/personToBase';

@Injectable()
export class BuildFamilyAndPersonService {
  constructor(
    private readonly familyRepository: FamilyRepository,
    private readonly personRepository: PersonRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  public async builder(records: GedcomRecordType[]) {
    for (const record of records) {
      if (record.tag.startsWith('@I')) {
        const parsedperson = await this.buildObjects<PersonToBaseType>(
          record,
          record.tag,
        );
        const personToBase: PersonToBase = {
          insideId: parsedperson.insideId,
          uid: parsedperson._UID,
          familyAsChild: await this.famalyPusher(parsedperson.FAMC),
          familyAsParent: await this.famalyPusher(parsedperson.FAMS),
          events: parsedperson.EVENTS,
          isDead: parsedperson.DEAT,
          npfx: parsedperson.NPFX,
          name: parsedperson.GIVN,
          surName: parsedperson.SURN,
          marriedSurName: parsedperson._MARNM,
          sex: parsedperson.SEX,
          note: parsedperson.NOTE,
          object: parsedperson.OBJE,
          updated: parsedperson._UPD,
        };
        await this.personRepository.save(
          this.personRepository.create(personToBase),
        );
      } else if (record.tag.startsWith('@F')) {
        const familyToBase = await this.buildObjects<FamilyType>(
          record,
          record.tag,
        );
        await this.familyRepository.save(
          this.familyRepository.create({
            children: familyToBase.CHIL,
            events: familyToBase.EVENTS,
            insideId: familyToBase.insideId,
            parents: [familyToBase.HUSB, familyToBase.WIFE],
            uid: familyToBase._UID,
          }),
        );
      }
    }
  }

  private async buildObjects<T extends ArrObjectType>(
    record: GedcomRecordType,
    insideId: string,
  ) {
    const baseObject = { insideId: insideId } as T;
    for (const value of record.children) {
      if (fieldsLevelOne.includes(value.tag)) {
        baseObject[value.tag] = value.value;
      } else if (exeptionFieldsLevelOne.includes(value.tag)) {
        for (const valueOne of value.children) {
          if (fieldsLeveltwo.includes(valueOne.tag)) {
            baseObject[valueOne.tag] = valueOne.value;
          }
        }
      } else if (fieldsDate.includes(value.tag) && value.children) {
        baseObject.EVENTS.push(await this.eventsPusher(value, value.tag));
      } else if (value.tag === 'DEAT' && !value.children) {
        baseObject[value.tag] = true;
      } else if (familyArrFields.includes(value.tag)) {
        baseObject[value.tag].push(value.value);
      }
    }
    return baseObject;
  }

  private async eventsPusher(
    value: GedcomRecordType,
    tagName: string,
  ): Promise<EventsEntity> {
    const dateToBase: DateToBaseType = {
      type: tagName,
    };
    if (value.children) {
      for (const valueElement of value.children) {
        valueElement.tag === 'DATE'
          ? (dateToBase.date = valueElement.value)
          : (dateToBase.place = valueElement.value);
      }
    }
    return await this.eventRepository.save(
      this.eventRepository.create(dateToBase),
    );
  }

  private async famalyPusher(famalies: string[]) {
    let familyAsChild: FamilyEntity[] = [];
    if (famalies.length) {
      familyAsChild = await this.familyRepository.save(
        famalies.map((family) =>
          this.familyRepository.create({ insideId: family }),
        ),
      );
    } else {
      familyAsChild = [];
    }
    return familyAsChild;
  }
}

// у famsles додати: 1. пошук персон по insideId, 2. ентіті що знайшли додати у відповідні поля
