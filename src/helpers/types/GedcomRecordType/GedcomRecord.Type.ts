export type GedcomRecordType = {
  level: number;
  tag: string;
  value: string;
  children: GedcomRecordType[];
};
