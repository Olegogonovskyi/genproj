import { GedcomRecordType } from '../../../helpers/types/GedcomRecord.Type';
import { FamilyRepository } from '../../repository/services/family.repository';
import { IndividualRepository } from '../../repository/services/individual.repository';
import { IndividualParseDto } from '../dto/parseDto/individual.parse.dto';
import { FamilyEntity } from '../../../database/entities/family.entity';
import { DatesEntity } from '../../../database/entities/dates.entity';
import { DateRepository } from '../../repository/services/date.repository';
import { DatesParseDto } from '../dto/parseDto/dates.parse.dto';
import { ParseCustomDate } from '../../../helpers/transform/parseCustomDate';

export class BuildFamilyAndPersonService {
  constructor(
    private readonly familyRepository: FamilyRepository,
    private readonly individualRepository: IndividualRepository,
    private readonly dateRepository: DateRepository,
  ) {}

  public async builder(records: GedcomRecordType[]) {
    const individual: IndividualParseDto = {
      isDead: false,
      note: '',
      npfx: '',
      object: '',
      sex: '',
    };
    for (const record of records) {
      // наступний if по персонах
      if (record.tag === '@I' && record.value.endsWith('INDI')) {
        for (const child of record.children) {
          switch (child.tag) {
            case '_UID':
              individual.uid = child.value;
              break;
            case '_UPD':
              individual.updated = child.value;
              break;
            case 'NAME':
              individual.npfx = this.extractObject(child, 'NPFX');
              individual.name = this.extractObject(child, 'GIVN');
              individual.surName = this.extractObject(child, 'SURN');
              individual.marriedSurName = this.extractObject(child, '_MARNM');
              break;
            case 'SEX':
              child.value === 'F'
                ? (individual.sex = 'female')
                : (individual.sex = 'male');
              break;
            case 'NOTE':
              individual.note = child.value;
              break;
            case 'OBJE':
              individual.object = this.extractObject(child, 'FILE');
              break;
            case 'BIRT':
              if (child.children.length < 0) {
                individual.dates.push(
                  await this.dataPusher(child.children, child.tag),
                );
              }
          }
        }
        // наступний if по сім'ях
      } else if (record.tag === '@F') {
        for (const child of record.children) {
          switch (child.tag) {
            case 'FAMS':
              await this.FamilyAndIndPusher(child, individual);
              break;
            case 'FAMC':
              await this.FamilyAndIndPusher(child, individual);
              break;
          }
        }
      }
    }
    await this.individualRepository.save(
      this.individualRepository.create({ ...individual }),
    );
  }

  private async familyPusher(child: GedcomRecordType): Promise<FamilyEntity> {
    let family: FamilyEntity = await this.familyRepository.findOne({
      where: { uid: child.value },
    });
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
    const dateRecord: DatesParseDto = {
      date: undefined,
      id: '',
      individuals: [],
      place: '',
      type: '',
    };
    for (const child of childRecord) {
      if (child.tag === 'DATE') {
        dateRecord.date = ParseCustomDate.stringToDate(child.value);
      } else if (child.tag === 'PLAC') {
        dateRecord.place = child.value;
      }
    }
    if (tagName === 'MARR') {
      dateRecord.family = familyEntity;
    }
    return await this.dateRepository.save(
      this.dateRepository.create({ ...dateRecord }),
    );
  }

  private async FamilyAndIndPusher(
    child: GedcomRecordType,
    individual: IndividualParseDto,
  ) {
    const familyEntity = await this.familyPusher(child);
    individual.familyAsChild.push(familyEntity);
    for (const childElement of child.children) {
      if (childElement.tag === 'MARR') {
        individual.dates.push(
          await this.dataPusher(
            childElement.children,
            childElement.tag,
            familyEntity,
          ),
        );
      }
    }
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
