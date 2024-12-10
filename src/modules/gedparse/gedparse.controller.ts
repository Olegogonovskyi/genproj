import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GedcomService } from './gedparse.service';
import { ApiConsumes } from '@nestjs/swagger';
import { ApiFile } from '../../common/decorators/apiFileDecorator';

@Controller('genio')
export class GedcomController {
  constructor(private readonly gedcomService: GedcomService) {}

  @Post('upload')
  @ApiFile('file', false, false)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadGedcom(@UploadedFile() file: Express.Multer.File) {
    return await this.gedcomService.parseGedcom(file);
  }
}
