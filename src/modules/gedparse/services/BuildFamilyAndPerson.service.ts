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
} from '../../../helpers/costants/fieldconstants';
import { PersonToBaseType } from '../../../helpers/types/personToBaseType';
import { DateToBaseType } from '../../../helpers/types/dateToBaseType';
import { EventsEntity } from '../../../database/entities/events.entity';
import { PersonRepository } from '../../repository/services/person.repository';
import { FamilyType } from '../../../helpers/types/familyType';
import { ArrObjectType } from '../../../helpers/types/arrObjectType';
import { FamilyEntity } from '../../../database/entities/family.entity';
import { PersonToBase } from '../../../helpers/types/personToBase';
import { In } from 'typeorm';
import { FamilyToBase } from '../../../helpers/types/familyToBase';
import { PersonEntity } from '../../../database/entities/person.entity';

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
        const parsedPerson = await this.buildObjects<PersonToBaseType>(
          record,
          record.tag,
        );
        const personToBase: PersonToBase = {
          insideId: parsedPerson.insideId,
          uid: parsedPerson._UID,
          familyAsChild: await this.famalyPusher(parsedPerson.FAMC),
          familyAsParent: await this.famalyPusher(parsedPerson.FAMS),
          events: parsedPerson.EVENTS,
          isDead: parsedPerson.DEAT,
          npfx: parsedPerson.NPFX,
          name: parsedPerson.GIVN,
          surName: parsedPerson.SURN,
          marriedSurName: parsedPerson._MARNM,
          sex: parsedPerson.SEX,
          note: parsedPerson.NOTE,
          object: parsedPerson.OBJE,
          updated: parsedPerson._UPD,
        };
        await this.personRepository.save(
          this.personRepository.create(personToBase),
        );
      } else if (record.tag.startsWith('@F')) {
        const parsedFamily = await this.buildObjects<FamilyType>(
          record,
          record.tag,
        );
        const ids = [parsedFamily.HUSB, parsedFamily.WIFE].filter(
          (id) => id !== undefined && id !== null,
        );
        let parents: PersonEntity[];
        console.log(parsedFamily.insideId);
        console.log([parsedFamily.HUSB, parsedFamily.WIFE]);
        if (ids.length) {
          parents = await this.personRepository.findBy({
            insideId: In(ids),
          });
        }
        let children: PersonEntity[];
        if (parsedFamily.CHIL && parsedFamily.CHIL.length) {
          children = await this.personRepository.findBy({
            insideId: In(parsedFamily.CHIL),
          });
        }
        const familyToBase: FamilyToBase = {
          updated: parsedFamily._UPD,
          children: children,
          events: parsedFamily.EVENTS,
          parents: parents,
          uid: parsedFamily._UID,
        };
        const isFamily = await this.familyRepository.findOne({
          where: { insideId: familyToBase.insideId },
        });
        if (!isFamily) {
          await this.familyRepository.save(
            this.familyRepository.create(familyToBase),
          );
        }
        console.log('merge');
        await this.familyRepository.save(
          this.familyRepository.merge(isFamily, familyToBase),
        );
      }
    }
  }

  private async buildObjects<T extends ArrObjectType>(
    record: GedcomRecordType,
    insideId: string,
  ) {
    const baseObject = { insideId: insideId, EVENTS: [] } as T;
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
        if (!baseObject[value.tag]) {
          baseObject[value.tag] = [];
        }
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

  private async famalyPusher(famalies: string[]): Promise<FamilyEntity[]> {
    if (!famalies || !famalies.length) return [];

    const entities = await this.familyRepository.findBy({
      insideId: In(famalies),
    });
    const existingFamiles = entities.map((value) => value.insideId);
    const newFamiles = famalies.filter(
      (value) => !existingFamiles.includes(value),
    );
    const family = await this.familyRepository.save(
      newFamiles.map((family) =>
        this.familyRepository.create({ insideId: family }),
      ),
    );
    return [...entities, ...family];
  }
}
