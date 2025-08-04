import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GedParser } from './services/gedParser';
import { FamilyAndPersonService } from './services/FamilyAndPerson.service';
import { GedcomRecordType } from '../../helpers/types/GedcomRecord.Type';
import { AncestorDataBaseCleaner } from '../../helpers/ancestorDataBaseCleaner';
import { AncestorsEntityEnum } from '../../enums/ancestorsEntityEnum';

@Injectable()
export class GedcomService {
  constructor(
    private readonly gedParser: GedParser,
    private readonly familyAndPersonService: FamilyAndPersonService,
    private readonly ancestorDataBaseCleaner: AncestorDataBaseCleaner,
  ) {}

  public async parseGedcom(fileContent: any): Promise<GedcomRecordType[]> {
    const parcedFile = await this.gedParser.parse(fileContent);
    await this.familyAndPersonService.builder(parcedFile);
    return parcedFile;
  }
  public async clearAllAncestors(): Promise<void> {
    try {
      await this.ancestorDataBaseCleaner.clearAll(AncestorsEntityEnum.PERSON);
      await this.ancestorDataBaseCleaner.clearAll(AncestorsEntityEnum.EVENTS);
      await this.ancestorDataBaseCleaner.clearAll(AncestorsEntityEnum.FAMILY);
    } catch (error) {
      console.error('Помилка при очищенні бази даних:', error);
      throw new InternalServerErrorException('Помилка при очищенні бази даних');
    }
  }
}
