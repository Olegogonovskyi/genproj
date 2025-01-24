import { Injectable } from '@nestjs/common';
import { FamilyRepository } from '../../repository/services/family.repository';
import { IndividualRepository } from '../../repository/services/individual.repository';
import { DateRepository } from '../../repository/services/date.repository';
import { GedcomRecordType } from '../../../helpers/types/GedcomRecord.Type';
import {
  exeptionFieldsLevelOne,
  fieldsLevelOne,
  fieldsLeveltwo,
} from './fieldconstants';
import { PersonToBaseType } from './personToBaseType';

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
        // await this.buildIndividual(record);
      } else if (record.tag.startsWith('@F')) {
        // await this.FamilyAndIndPusher(record);
      }
    }
  }

  private async buildPersons(record: GedcomRecordType) {
    const personToBase: PersonToBaseType = {};
    record.children.map((value) => {
      if (fieldsLevelOne.includes(value.tag)) {
        personToBase[value.tag] = value.value;
      } else if (exeptionFieldsLevelOne.includes(value.tag)) {
        value.children.map((valueOne) => {
          if (fieldsLeveltwo.includes(valueOne.tag)) {
            personToBase[value.tag] = valueOne.value;
          }
        });
      }
    });
    return personToBase;
  }
}
