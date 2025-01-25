import { GedcomRecordType } from '../../../helpers/types/GedcomRecord.Type';
import { FamilyRepository } from '../../repository/services/family.repository';
import { IndividualRepository } from '../../repository/services/individual.repository';
import { BaseIndividualParseDto } from '../dto/parseDto/baseIndividual.parse.dto';
import { FamilyEntity } from '../../../database/entities/family.entity';
import { DatesEntity } from '../../../database/entities/dates.entity';
import { DateRepository } from '../../repository/services/date.repository';
import { BaseDatesParseDto } from '../dto/parseDto/baseDates.parse.dto';

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
        // console.log(record.tag);
        await this.buildIndividual(record);
        // наступний if по сім'ях
      } else if (record.tag.startsWith('@F')) {
        // console.log(record.tag);
        await this.FamilyAndIndPusher(record);
      }
    }
  }

  private async buildIndividual(record: GedcomRecordType): Promise<void> {
    // const individual: BaseIndividualParseDto = {
    //   isDead: false,
    //   uid: '',
    //   note: '',
    //   npfx: '',
    //   object: '',
    //   sex: '',
    //   dates: [],
    //   familyAsChild: [],
    //   familyAsParent: [],
    // };
    for (const child of record.children) {
      switch (child.tag) {
        case '_UID':
          // console.log(`_UID`);
          const uid = child.value;
          break;
        case '_UPD':
          // console.log(`_UPD`);
          const updatedmh = child.value;
          break;
        case 'NAME':
          console.log(`NAME`);
          const npfx = this.extractObject(child, 'NPFX');
          console.log(`NPFX`);
          const name = this.extractObject(child, 'GIVN');
          console.log(`GIVN`);
          const surName = this.extractObject(child, 'SURN');
          console.log(`SURN`);
          const marriedSurName = this.extractObject(child, '_MARNM');
          console.log(`_MARNM`);
          break;
        case 'SEX':
          let sex: string;
          child.value === 'F' ? (sex = 'female') : (sex = 'male');
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
          const familyAsParent = await this.familyPusher(child);
          // individual.familyAsParent.push(await this.familyPusher(child));
          // console.log(`individual.familyAsParent ${individual.familyAsParent}`);
          break;
        case 'FAMC':
          const familyAsChild = await this.familyPusher(child);
          // individual.familyAsChild.push(await this.familyPusher(child));
          // console.log(`individual.familyAsChild ${individual.familyAsChild}`);
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
      this.individualRepository.create({
        ...individual,
        familyAsParent,
        familyAsChild,
      }),
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
  ) {
    const dateRecord: BaseDatesParseDto = {
      date: '',
      individuals: [],
      place: '',
      type: tagName,
    };

    for (const child of childRecord) {
      if (child.tag === 'DATE') {
        dateRecord.date = child.value;
      } else if (child.tag === 'PLAC') {
        dateRecord.place = child.value;
      }
    }
    return await this.dateRepository.save(
      this.dateRepository.create(dateRecord),
    );
  }

  private async FamilyAndIndPusher(child: GedcomRecordType) {
    const familyEntity = await this.familyPusher(child);
    const familyToBase: BaseFamilyParseDto = {
      uid: child.tag,
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
              date: this.extractObject(childElement, 'DATE'),
              place: this.extractObject(childElement, 'PLAC'),
              type: 'MARR',
              // family: child.tag,
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
