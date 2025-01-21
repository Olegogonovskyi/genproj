import { GedcomRecordType } from '../../../helpers/types/GedcomRecord.Type';
import { FamilyRepository } from '../../repository/services/family.repository';
import { IndividualRepository } from '../../repository/services/individual.repository';
import { BaseIndividualParseDto } from '../dto/parseDto/baseIndividual.parse.dto';
import { FamilyEntity } from '../../../database/entities/family.entity';
import { DatesEntity } from '../../../database/entities/dates.entity';
import { DateRepository } from '../../repository/services/date.repository';
import { BaseDatesParseDto } from '../dto/parseDto/baseDates.parse.dto';
import { ParseCustomDate } from '../../../helpers/transform/parseCustomDate';
import { Injectable } from '@nestjs/common';
import { BaseFamilyParseDto } from '../dto/parseDto/baseFamily.parse.dto';

@Injectable()
export class BuildFamilyAndPersonService {
  constructor(
    private readonly familyRepository: FamilyRepository,
    private readonly individualRepository: IndividualRepository,
    private readonly dateRepository: DateRepository,
  ) {}

  public async builder(records: GedcomRecordType[]) {
    console.log('start');
    for (const record of records) {
      // наступний if по персонах
      if (record.tag.startsWith('@I')) {
        console.log(record.tag);
        await this.buildIndividual(record);
        // наступний if по сім'ях
      } else if (record.tag.startsWith('@F')) {
        console.log(record.tag);
        await this.FamilyAndIndPusher(record);
      }
    }
  }

  private async buildIndividual(record: GedcomRecordType): Promise<void> {
    const individual: BaseIndividualParseDto = {
      isDead: false,
      uid: '',
      note: '',
      npfx: '',
      object: '',
      sex: '',
      dates: [],
      familyAsChild: [],
      familyAsParent: [],
    };
    for (const child of record.children) {
      switch (child.tag) {
        case '_UID':
          console.log(`_UID`);
          individual.uid = child.value;
          break;
        case '_UPD':
          console.log(`_UPD`);
          individual.updatedmh = child.value;
          break;
        case 'NAME':
          console.log(`NAME`);
          individual.npfx = this.extractObject(child, 'NPFX');
          console.log(`NPFX`);
          individual.name = this.extractObject(child, 'GIVN');
          console.log(`GIVN`);
          individual.surName = this.extractObject(child, 'SURN');
          console.log(`SURN`);
          individual.marriedSurName = this.extractObject(child, '_MARNM');
          console.log(`_MARNM`);
          break;
        case 'SEX':
          child.value === 'F'
            ? (individual.sex = 'female')
            : (individual.sex = 'male');
          console.log(`SEX ${individual.sex}`);
          break;
        case 'NOTE':
          individual.note = child.value;
          console.log(`NOTE ${individual.note}`);
          break;
        case 'OBJE':
          console.log(`OBJE`);
          individual.object = this.extractObject(child, 'FILE');
          break;
        case 'FAMS':
          individual.familyAsParent.push(await this.familyPusher(child));
          console.log(`individual.familyAsParent ${individual.familyAsParent}`);
          break;
        case 'FAMC':
          individual.familyAsChild.push(await this.familyPusher(child));
          console.log(`individual.familyAsChild ${individual.familyAsChild}`);
          break;
        case 'BIRT':
        case 'DEAT':
          console.log('birt start');
          if (child.children.length > 0) {
            individual.dates.push(
              await this.dataPusher(child.children, child.tag),
            );
          }
      }
    }
    console.log(`individual ${individual.uid}`);
    await this.individualRepository.save(
      this.individualRepository.create(individual),
    );
  }

  private async familyPusher(child: GedcomRecordType): Promise<FamilyEntity> {
    let family: FamilyEntity = await this.familyRepository.findOne({
      where: { uid: child.value },
    });
    console.log(`if (!family) {`);
    if (!family) {
      family = await this.familyRepository.save(
        this.familyRepository.create({ uid: child.value }),
      );
    }
    return family;
  }

  private async dataPusher(
    childRecord: GedcomRecordType[],
    tagName: string,
    familyEntity?: FamilyEntity,
  ): Promise<DatesEntity> {
    const dateRecord: BaseDatesParseDto = {
      date: undefined,
      individuals: [],
      place: '',
      type: '',
    };

    for (const child of childRecord) {
      if (child.tag === 'DATE') {
        console.log("if (child.tag === 'DATE') {");
        dateRecord.date = ParseCustomDate.stringToDate(child.value);
      } else if (child.tag === 'PLAC') {
        dateRecord.place = child.value;
      }
    }
    console.log("if (tagName === 'MARR') {");
    if (tagName === 'MARR') {
      dateRecord.family = familyEntity;
    }
    console.log('return await this.dateRepository.save(');
    return await this.dateRepository.save(
      this.dateRepository.create(dateRecord),
    );
  }

  private async FamilyAndIndPusher(child: GedcomRecordType) {
    const familyEntity = await this.familyPusher(child);
    const familyToBase: BaseFamilyParseDto = {
      uid: '',
      parents: [],
      children: [],
    };
    for (const childElement of child.children) {
      switch (childElement.tag) {
        case 'HUSB':
        case 'WIFE':
          familyToBase.parents.push(
            await this.individualRepository.findOne({
              where: { uid: childElement.value },
            }),
          );
          console.log('167');
          break;
        case 'CHIL':
          familyToBase.children.push(
            await this.individualRepository.findOne({
              where: { uid: childElement.value },
            }),
          );
          console.log('175');
          break;
        case 'MARR':
          familyToBase.date = await this.dateRepository.save(
            this.dateRepository.create({
              date: ParseCustomDate.stringToDate(childElement.value),
              type: 'MARR',
            }),
          );
          console.log('184');
          break;
      }
      console.log('187');
    }
    console.log(`familyToBase ${familyToBase}`);
    this.familyRepository.merge(familyEntity, familyToBase);
  }

  private extractObject(record: GedcomRecordType, childTag: string): string {
    for (const child of record.children) {
      if (child.tag === childTag) {
        return child.value;
      }
    }
    return '';
  }
}
