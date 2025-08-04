import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GedcomService } from './gedparse.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiFile } from '../../common/decorators/apiFileDecorator';
import { ControllerEnum } from '../../enums/controllerEnum';
import { RolesGuard } from '../articlesNew/guards/RolesGuard';
import { Roles } from '../users/decorators/roleDecorator';
import { RoleEnum } from '../../database/enums/role.enum';
import { JwtAccessGuard } from '../auth/quards/jwtAccesGuard';

@ApiTags(ControllerEnum.UPLOADGED)
@Controller(ControllerEnum.UPLOADGED)
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
export class GedcomController {
  constructor(private readonly gedcomService: GedcomService) {}

  @ApiOperation({ summary: 'upload gedcom file to parce' })
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiFile('file', false, false)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  public async uploadGedcom(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const fileContent = file.buffer.toString('utf8');
    return await this.gedcomService.parseGedcom(fileContent);
  }

  @ApiOperation({ summary: 'clear all ancestor entity' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('deleteAll')
  public async deleteAll(): Promise<void> {
    await this.gedcomService.clearAllAncestors();
  }
}
