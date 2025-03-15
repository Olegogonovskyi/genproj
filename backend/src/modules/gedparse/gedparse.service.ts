import { Injectable } from '@nestjs/common';
import { GedParser } from './services/gedParser';
import { FamilyAndPersonService } from './services/FamilyAndPerson.service';

@Injectable()
export class GedcomService {
  constructor(
    private readonly gedParser: GedParser,
    private readonly familyAndPersonService: FamilyAndPersonService,
  ) {}

  public async parseGedcom(fileContent: any) {
    const parcedFile = await this.gedParser.parse(fileContent);

    return await this.familyAndPersonService.builder(parcedFile);
  }
}
