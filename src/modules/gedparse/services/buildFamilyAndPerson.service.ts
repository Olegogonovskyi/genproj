import { GedComFieldNamesEnum } from '../enums/gedComFieldNames.enum';
import { individualType } from '../../../helpers/types/Individual.Type';
import { GedcomRecordType } from '../../../helpers/types/GedcomRecord.Type';
import { FamilyType } from '../../../helpers/types/familyType';
import { FamilyRepository } from '../../repository/services/family.repository';
import { IndividualRepository } from '../../repository/services/individual.repository';

type FamilyField = Extract<
  GedComFieldNamesEnum,
  GedComFieldNamesEnum.FAMC | GedComFieldNamesEnum.FAMS
>;

export class buildIndividuals {
  constructor(
    private readonly familyRepository: FamilyRepository,
    private readonly individualRepository: IndividualRepository,
  ) {}

  public async builder(records: GedcomRecordType[]) {
    const individuals: individualType[] = [];
    const individual: individualType = {};
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
              await this.familyPusher(
                individual.uid,
                child,
                GedComFieldNamesEnum.FAMS,
              );
              break;
            case 'FAMC':
              await this.familyPusher(
                individual.uid,
                child,
                GedComFieldNamesEnum.FAMC,
              );
              break;
          }
        }

        // Resolve children
        individual.CHILDREN = childrenUIDs
          .map((uid) => individualsById[uid])
          .filter(Boolean);

        individuals.push(individual);
        if (individual.UID) {
          individualsById[individual.UID] = individual;
        }
      }
    }
  }

  private async familyPusher(
    indUid: string,
    child: GedcomRecordType,
    tagName: FamilyField,
  ) {
    let family: FamilyType = {};
    family = await this.familyRepository.findOne({
      where: { uid: child.value },
    });
    if (tagName === GedComFieldNamesEnum.FAMC) {
      family.children.push(indUid);
    } else {
      family.parents.push(indUid);
    }
    family.uid = child.value;
  }
}
