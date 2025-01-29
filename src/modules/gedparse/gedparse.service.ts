import { Injectable } from '@nestjs/common';
import { GedParser } from './services/gedParser';
import { BuildFamilyAndPersonService } from './services/buildFamilyAndPerson.service';

@Injectable()
export class GedcomService {
  constructor(
    private readonly gedParser: GedParser,
    private readonly buildFamilyAndPersonService: BuildFamilyAndPersonService,
  ) {}

  public async parseGedcom(fileContent: any) {
    const parcedFile = await this.gedParser.parse(fileContent);
    return await this.buildFamilyAndPersonService.builder(parcedFile);
  }
}
