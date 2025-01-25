import { Injectable } from '@nestjs/common';
import { FamilyRepository } from '../../repository/services/family.repository';
import { IndividualRepository } from '../../repository/services/individual.repository';
import { DateRepository } from '../../repository/services/date.repository';
import { GedcomRecordType } from '../../../helpers/types/GedcomRecord.Type';
import {
  exeptionFieldsLevelOne,
  fieldsDate,
  fieldsLevelOne,
  fieldsLeveltwo,
} from './fieldconstants';
import { PersonToBaseType } from './personToBaseType';
import { DateToBaseType } from './dateToBaseType';
import { DatesEntity } from '../../../database/entities/dates.entity';

@Injectable()
export class BuildFamilyAndPersonService {
  constructor(
    private readonly familyRepository: FamilyRepository,
    private readonly individualRepository: IndividualRepository,
    private readonly dateRepository: DateRepository,
  ) {}

  public async builder(records: GedcomRecordType[]) {
    for (const record of records) {
      if (record.tag.startsWith('@I')) {
        await this.buildPersons(record);
      } else if (record.tag.startsWith('@F')) {
        // await this.FamilyAndIndPusher(record);
      }
    }
  }

  private async buildPersons(record: GedcomRecordType) {
    const personToBase: PersonToBaseType = {};
    for (const value of record.children) {
      if (fieldsLevelOne.includes(value.tag)) {
        personToBase[value.tag] = value.value;
      } else if (exeptionFieldsLevelOne.includes(value.tag)) {
        for (const valueOne of value.children) {
          if (fieldsLeveltwo.includes(valueOne.tag)) {
            personToBase[valueOne.tag] = valueOne.value;
          }
        }
      } else if (fieldsDate.includes(value.tag) && value.children) {
        personToBase.DATES.push(await this.dataPusher(value, value.tag));
      } else if (value.tag === 'DEAT' && !value.children) {
        personToBase.DEAT = true;
      }
    }
    return personToBase;
  }

  private async dataPusher(
    value: GedcomRecordType,
    tagName: string,
  ): Promise<DatesEntity> {
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
    return await this.dateRepository.save(
      this.dateRepository.create(dateToBase),
    );
  }
}
