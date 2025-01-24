import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../filestorage/filestorageService';
import { GedParser } from './services/gedParser';
import { BuildFamilyAndPersonService } from './services/buildFamilyAndPerson.service';
import { ParseCustomDate } from '../../helpers/transform/parseCustomDate';

@Injectable()
export class GedcomService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly gedParser: GedParser,
    private readonly buildFamilyAndPersonService: BuildFamilyAndPersonService,
  ) {}

  public async parseGedcom(fileContent: any) {
    const parcedFile = await this.gedParser.parse(fileContent);
    console.log(parcedFile);
    const mounth = ['25 JUN 1941', '6 AUG 1935', '2018', 'AUG 1935'];
    mounth.map((value) => {
      ParseCustomDate.stringToDate(value);
      console.log(
        `-------------------------------------------------------------${value}`,
      );
    });
    return await this.buildFamilyAndPersonService.builder(parcedFile);


  }
}
