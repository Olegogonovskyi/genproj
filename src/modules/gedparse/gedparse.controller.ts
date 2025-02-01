import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GedcomService } from './gedparse.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiFile } from '../../common/decorators/apiFileDecorator';
import { ControllerEnum } from '../../enums/controllerEnum';

@ApiTags(ControllerEnum.UPLOADGED)
@Controller(ControllerEnum.UPLOADGED)
export class GedcomController {
  constructor(private readonly gedcomService: GedcomService) {}

  @ApiOperation({ summary: 'upload gedcom file to parce' })
  @Post('upload')
  @ApiFile('file', false, false)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadGedcom(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const fileContent = file.buffer.toString('utf8');
    return await this.gedcomService.parseGedcom(fileContent);
  }
}
