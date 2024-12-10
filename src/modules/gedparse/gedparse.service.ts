import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../filestorage/filestorageService';
import { GedParser } from '../../helpers/gedParser';

@Injectable()
export class GedcomService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly gedParser: GedParser,
  ) {}

  public async parseGedcom(fileGed: Express.Multer.File) {
    const gedPath = await this.fileStorageService.uploadFile(fileGed, 'gedcom');
    const result = this.gedParser.parse(gedPath);
    console.log(result);
    return result;
  }
}
