import { GedcomRecordType } from '../../../helpers/types/GedcomRecord.Type';
import { individualType } from '../../../helpers/types/Individual.Type';

function buildIndividuals(records: GedcomRecordType[]): individualType[] {
  const individuals: individualType[] = [];
  const individualsById: Record<string, individualType> = {};

  for (const record of records) {
    if (record.tag === '@I' && record.value.endsWith('INDI')) {
      const individual: individualType = {};
      let motherUID: string | undefined;
      let fatherUID: string | undefined;
      const childrenUIDs: string[] = [];

      for (const child of record.children) {
        switch (child.tag) {
          case '_UID':
            individual.UID = child.value;
            break;
          case '_UPD':
            individual.UPDATED = child.value;
            break;
          case 'NAME':
            individual.NAME = child.value;
            break;
          case 'SEX':
            individual.SEX = child.value;
            break;
          case 'NOTE':
            individual.NOTE = child.value;
            break;
          case 'NPFX':
            individual.NPFX = child.value;
            break;
          case 'OBJE':
            individual.OBJECT = extractObject(child);
            break;
          case 'FAMC':
            if (child.value.includes('MOTHER')) {
              motherUID = extractUID(child.value);
            } else if (child.value.includes('FATHER')) {
              fatherUID = extractUID(child.value);
            }
            break;
          case 'FAMS':
            childrenUIDs.push(extractUID(child.value));
            break;
        }
      }

      individual.MOTHER_UID = motherUID;
      individual.FATHER_UID = fatherUID;

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

  return individuals;
}

function extractDateAndPlace(record: GedcomRecordType): {
  DATE?: string;
  PLACE?: string;
} {
  const result: { DATE?: string; PLACE?: string } = {};
  for (const child of record.children) {
    if (child.tag === 'DATE') {
      result.DATE = child.value;
    } else if (child.tag === 'PLAC') {
      result.PLACE = child.value;
    }
  }
  return result;
}

function extractObject(record: GedcomRecordType): { FILE?: string } {
  const result: { FILE?: string } = {};
  for (const child of record.children) {
    if (child.tag === 'FILE') {
      result.FILE = child.value;
    }
  }
  return result;
}

function extractUID(value: string): string {
  const match = value.match(/@(.+?)@/);
  return match ? match[1] : value;
}
