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
    const filePath = await this.fileStorageService.uploadFile(
      fileGed,
      'gedcom',
    );
    const readedFile = await this.fileStorageService.readFile(filePath);
    console.log(`readedFile ****************** ${readedFile}`);
    const parsedFile = this.gedParser.parse(readedFile);
    console.log(`parsedFile --------------- ${parsedFile}`);

    // const FullFilePath = FileGedMaper.combainUrl(filePath);
    // console.log(` gedParseService FullFilePath ${FullFilePath}`);
    // const parsedFile = this.gedParser.parse(FullFilePath);
    // console.log(` gedParseService parsedFile ${parsedFile}`);

    return parsedFile;
  }
}
