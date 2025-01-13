import { Injectable } from '@nestjs/common';
import { FileStorageService } from '../filestorage/filestorageService';
import { GedParser } from './services/gedParser';

@Injectable()
export class GedcomService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly gedParser: GedParser,
  ) {}

  public async parseGedcom(fileContent: any) {
    return await this.gedParser.parse(fileContent);
  }
}
