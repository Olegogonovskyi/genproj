import { Injectable } from '@nestjs/common';
import { FamilyRepository } from '../../repository/services/family.repository';
import { EventRepository } from '../../repository/services/event.repository';
import { PersonRepository } from '../../repository/services/person.repository';
import { In } from 'typeorm';

import { GedcomRecordType } from '../../../helpers/types/GedcomRecord.Type';
import {
  exeptionFieldsLevelOne,
  familyArrFields,
  fieldsDate,
  fieldsLevelOne,
  fieldsLeveltwo,
  problemFields,
} from '../../../helpers/costants/fieldconstants';
import { PersonToBaseType } from '../../../helpers/types/personToBaseType';
import { FamilyType } from '../../../helpers/types/familyType';
import { ArrObjectType } from '../../../helpers/types/arrObjectType';
import { FamilyToBase } from '../../../helpers/types/familyToBase';
import { PersonToBase } from '../../../helpers/types/personToBase';
import { FamilyEntity } from '../../../database/entities/family.entity';
import { EventsEntity } from '../../../database/entities/events.entity';
import { CleanfromHTMLandCSS } from '../../../helpers/cleanfromHTMLandCSS/cleanfromHTMLandCSS';

@Injectable()
export class FamilyAndPersonService {
  constructor(
    private readonly familyRepository: FamilyRepository,
    private readonly personRepository: PersonRepository,
    private readonly eventRepository: EventRepository,
    private readonly cleanfromHTMLandCSS: CleanfromHTMLandCSS,
  ) {}

  public async builder(records: GedcomRecordType[]) {
    const personRecords = records.filter((record) =>
      record.tag.startsWith('@I'),
    );
    const familyRecords = records.filter((record) =>
      record.tag.startsWith('@F'),
    );

    for (const record of familyRecords) {
      await this.processFamily(record);
    }
    for (const record of personRecords) {
      await this.processPerson(record);
    }
  }

  private async processPerson(record: GedcomRecordType) {
    try {
      const parsedPerson = await this.buildObjects<PersonToBaseType>(
        record,
        record.tag,
      );
      const personToBase: PersonToBase = {
        insideId: parsedPerson.insideId,
        uid: parsedPerson._UID,
        familyAsChild: await this.familyPusher(parsedPerson.FAMC),
        familyAsParent: await this.familyPusher(parsedPerson.FAMS),
        events: parsedPerson.EVENTS,
        isDead: parsedPerson.DEAT,
        npfx: parsedPerson.NPFX,
        name: parsedPerson.GIVN,
        surName: parsedPerson.SURN,
        marriedSurName: parsedPerson._MARNM,
        sex: parsedPerson.SEX,
        note: parsedPerson.NOTE,
        object: parsedPerson.FILE,
        updated: parsedPerson._UPD,
      };
      await this.personRepository.save(personToBase);
    } catch (error) {
      console.error(
        `Error parsing a person with з insideId ${record.tag}:`,
        error,
      );
    }
  }

  private async processFamily(record: GedcomRecordType) {
    const parsedFamily = await this.buildObjects<FamilyType>(
      record,
      record.tag,
    );

    const parentIds = [parsedFamily.HUSB, parsedFamily.WIFE].filter(Boolean);
    const parents = parentIds.length
      ? await this.personRepository.findBy({ insideId: In(parentIds) })
      : [];
    const children = parsedFamily.CHIL?.length
      ? await this.personRepository.findBy({ insideId: In(parsedFamily.CHIL) })
      : [];

    const familyToBase: FamilyToBase = {
      insideId: parsedFamily.insideId,
      updated: parsedFamily._UPD,
      children,
      events: parsedFamily.EVENTS,
      parents,
      uid: parsedFamily._UID,
    };

    await this.familyRepository.upsert(familyToBase, ['insideId']);
  }

  private async buildObjects<T extends ArrObjectType>(
    record: GedcomRecordType,
    insideId: string,
  ): Promise<T> {
    const baseObject = { insideId, EVENTS: [] } as T;

    for (const value of record.children) {
      if (fieldsLevelOne.includes(value.tag)) {
        baseObject[value.tag] = value.value;
      } else if (exeptionFieldsLevelOne.includes(value.tag)) {
        for (const valueOne of value.children) {
          if (fieldsLeveltwo.includes(valueOne.tag)) {
            baseObject[valueOne.tag] = valueOne.value;
          }
        }
      } else if (fieldsDate.includes(value.tag)) {
        baseObject.EVENTS.push(await this.eventsPusher(value, value.tag));
        if (value.tag === 'DEAT') {
          baseObject[value.tag] = true;
        }
      } else if (familyArrFields.includes(value.tag)) {
        if (!baseObject[value.tag]) {
          baseObject[value.tag] = [];
        }
        baseObject[value.tag].push(value.value);
      } else if (problemFields.includes(value.tag)) {
        console.log('note');
        if (!value.children) {
          baseObject[value.tag] = value.value;
          console.log(value.value);
        } else {
          baseObject[value.tag] =
            `${value.value} ${this.parseArray(value.children)}`;
        }
      }
    }

    return baseObject;
  }

  private async eventsPusher(
    value: GedcomRecordType,
    tagName: string,
  ): Promise<EventsEntity> {
    const dateToBase = { type: tagName } as any;

    for (const valueElement of value.children) {
      if (valueElement.tag === 'DATE') {
        dateToBase.date = valueElement.value;
      } else {
        dateToBase.place = valueElement.value;
      }
    }

    return this.eventRepository.save(dateToBase);
  }

  private async familyPusher(families?: string[]): Promise<FamilyEntity[]> {
    if (!families?.length) return [];

    const existingFamilies = await this.familyRepository.findBy({
      insideId: In(families),
    });
    const existingIds = new Set(existingFamilies.map((f) => f.insideId));
    const newFamilies = families.filter((id) => !existingIds.has(id));

    if (!newFamilies.length) return existingFamilies;

    const savedFamilies = await this.familyRepository.save(
      newFamilies.map((id) => this.familyRepository.create({ insideId: id })),
    );

    return [...existingFamilies, ...savedFamilies];
  }

  private async parseArray(array: GedcomRecordType[]): Promise<string> {
    let result = '';
    const iterateObjects = async (
      objects: GedcomRecordType[],
    ): Promise<void> => {
      for (const obj of objects) {
        if (obj.level === 2) {
          result += this.cleanfromHTMLandCSS.stripHtmlAndCss(obj.value) + ' ';
        } else if (obj.level === null) {
          result +=
            this.cleanfromHTMLandCSS.stripHtmlAndCss(
              obj.tag + ' ' + obj.value,
            ) + ' ';
        } else if (obj.level === 0) {
          await this.builder([obj]);
        }
        if (obj.children && obj.children.length > 0) {
          await iterateObjects(obj.children);
        }
      }
    };

    await iterateObjects(array);

    return result.trim();
  }
}
