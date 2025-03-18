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
} from '../../../helpers/costants/fieldconstants';
import { PersonToBaseType } from '../../../helpers/types/personToBaseType';
import { FamilyType } from '../../../helpers/types/familyType';
import { ArrObjectType } from '../../../helpers/types/arrObjectType';
import { PersonToBase } from '../../../helpers/types/personToBase';
import { FamilyEntity } from '../../../database/entities/family.entity';
import { EventsEntity } from '../../../database/entities/events.entity';
import { FamilyToBase } from 'src/helpers/types/familyToBase';

@Injectable()
export class FamilyAndPersonService {
  constructor(
    private readonly familyRepository: FamilyRepository,
    private readonly personRepository: PersonRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  public async builder(records: GedcomRecordType[]) {
    const personRecords = records.filter((record) =>
      record.tag.startsWith('@I'),
    );
    const familyRecords = records.filter((record) =>
      record.tag.startsWith('@F'),
    );

    for (const record of personRecords) {
      await this.processPerson(record);
    }
    for (const record of familyRecords) {
      await this.processFamily(record);
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

      await this.personRepository.save(
        this.personRepository.create({ ...personToBase }),
      );
    } catch (error) {
      console.error(
        `Error parsing a person with з insideId ${record.tag}:`,
        error,
      );
    }
  }

  private async processFamily(record: GedcomRecordType) {
    let familyEntity = await this.familyRepository.findOne({
      where: { insideId: record.tag },
    });
    if (!familyEntity) {
      familyEntity = this.familyRepository.create({ uid: record.tag });
    }

    const parsedFamily = await this.buildObjects<FamilyType>(
      record,
      record.tag,
    );

    const personIds = [
      parsedFamily.HUSB,
      parsedFamily.WIFE,
      ...(parsedFamily.CHIL || []),
    ].filter(Boolean);

    const people = personIds.length
      ? await this.personRepository.findBy({ insideId: In(personIds) })
      : [];

    const parents = people.filter((p) =>
      [parsedFamily.HUSB, parsedFamily.WIFE].includes(p.insideId),
    );

    const children = people.filter((p) =>
      parsedFamily.CHIL?.includes(p.insideId),
    );

    const familyToBase: FamilyToBase = {
      ...(familyEntity && { id: familyEntity.id }), // Зберігаємо ID для існуючого запису
      insideId: parsedFamily.insideId || '',
      updated: parsedFamily._UPD || '',
      children: children ?? [],
      events: parsedFamily.EVENTS || [],
      parents: parents ?? [],
      uid: parsedFamily._UID || '',
    };
    if (familyEntity) {
      this.familyRepository.merge(familyEntity, familyToBase);
    } else {
      familyEntity = this.familyRepository.create(familyToBase);
    }
    await this.familyRepository.save(familyEntity);
  }

  private async buildObjects<T extends ArrObjectType>(
    record: GedcomRecordType,
    insideId: string,
    familyEntity?: FamilyEntity,
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
        baseObject.EVENTS.push(
          await this.eventsPusher(value, value.tag, familyEntity),
        );
        if (value.tag === 'DEAT') {
          baseObject[value.tag] = true;
        }
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
    familyEntity?: FamilyEntity,
  ): Promise<EventsEntity> {
    const dateToBase = {
      type: tagName,
      family: familyEntity ? [familyEntity] : [],
    } as any;

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

    // Створюємо об'єкти для upsert
    const familiesToUpsert = families.map((id) => ({
      insideId: id,
    }));

    // Виконуємо upsert
    await this.familyRepository.upsert(familiesToUpsert, ['insideId']);

    // Повертаємо всі сім'ї
    return await this.familyRepository.findBy({ insideId: In(families) });
  }
}
