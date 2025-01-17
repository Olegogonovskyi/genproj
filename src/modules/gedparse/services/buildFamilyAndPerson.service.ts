import { GedcomRecordType } from '../../../helpers/types/GedcomRecord.Type';
import { FamilyRepository } from '../../repository/services/family.repository';
import { IndividualRepository } from '../../repository/services/individual.repository';
import { IndividualParseDto } from '../dto/parseDto/individual.parse.dto';
import { FamilyEntity } from '../../../database/entities/family.entity';

export class buildIndividuals {
  constructor(
    private readonly familyRepository: FamilyRepository,
    private readonly individualRepository: IndividualRepository,
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
              individual.name = child.value;
              break;
            case 'SEX':
              individual.sex = child.value;
              break;
            case 'NOTE':
              individual.note = child.value;
              break;
            case 'NPFX':
              individual.npfx = child.value;
              break;
            case 'OBJE':
              individual.object = extractObject(child);
              break;
            case 'FAMS':
              individual.familyAsParent.push(await this.familyPusher(child));
              break;
            case 'FAMC':
              individual.familyAsChild.push(await this.familyPusher(child));
              break;
          }
        }
      }
    }
  }

  private async familyPusher(child: GedcomRecordType) {
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
}
