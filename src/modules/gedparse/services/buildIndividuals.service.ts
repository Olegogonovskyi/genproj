// import { GedcomRecordType } from '../../../helpers/types/GedcomRecord.Type';
// import { individualType } from '../../../helpers/types/Individual.Type';
// import { FamilyType } from '../../../helpers/types/familyType';
// import { GedComFieldNamesEnum } from '../enums/gedComFieldNames.enum';
//
// type FamilyField = Extract<GedComFieldNamesEnum, GedComFieldNamesEnum.FAMC | GedComFieldNamesEnum.FAMS>;
//
//
// function buildIndividuals(records: GedcomRecordType[]): individualType[] {
//   const individuals: individualType[] = [];
//
//   for (const record of records) {
//     if (record.tag === '@I' && record.value.endsWith('INDI')) {
//       const individual: individualType = {};
//       const family: FamilyType = {};
//
//       for (const child of record.children) {
//         switch (child.tag) {
//           case '_UID':
//             individual.uid = child.value;
//             break;
//           case '_UPD':
//             individual.updated = child.value;
//             break;
//           case 'NAME':
//             individual.name = child.value;
//             break;
//           case 'SEX':
//             individual.sex = child.value;
//             break;
//           case 'NOTE':
//             individual.note = child.value;
//             break;
//           case 'NPFX':
//             individual.npfx = child.value;
//             break;
//           case 'OBJE':
//             individual.object = extractObject(child);
//             break;
//           case 'FAMS':
//             family.parents.push(individual.uid);
//             family.uid = child.value; // створюємо об'єкт family
//             break;
//           case 'FAMC':
//             family.children.push(individual.uid);
//             family.uid = child.value; // створюємо об'єкт family
//             break;
//         }
//       }
// function familyPusher(indUid: string, child: GedcomRecordType, tagName: FamilyField) {
// if (tagName === GedComFieldNamesEnum.FAMC) {
//   family.children.push(individual.uid);
// } else {
//   family.parents.push(individual.uid);
// }
//   family.uid = child.value;
//
// }
//
//   family.uid = child.value; // створюємо об'єкт family
//       }
//       // Resolve children
//       individual.CHILDREN = childrenUIDs
//         .map((uid) => individualsById[uid])
//         .filter(Boolean);
//
//       individuals.push(individual);
//       if (individual.UID) {
//         individualsById[individual.UID] = individual;
//       }
//     }
//   }
//
//   return individuals;
// }
//
// function extractDateAndPlace(record: GedcomRecordType): {
//   DATE?: string;
//   PLACE?: string;
// } {
//   const result: { DATE?: string; PLACE?: string } = {};
//   for (const child of record.children) {
//     if (child.tag === 'DATE') {
//       result.DATE = child.value;
//     } else if (child.tag === 'PLAC') {
//       result.PLACE = child.value;
//     }
//   }
//   return result;
// }
//
// function extractObject(record: GedcomRecordType): string {
//   for (const child of record.children) {
//     if (child.tag === 'FILE') {
//       return child.value;
//     }
//   }
// }
//
// function extractUID(value: string): string {
//   const match = value.match(/@(.+?)@/);
//   return match ? match[1] : value;
// }
