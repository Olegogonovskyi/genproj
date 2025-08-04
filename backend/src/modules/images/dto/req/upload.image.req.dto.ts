import { PickType } from '@nestjs/swagger';
import { BaseImageReqDto } from './baseImageReq.dto';

export class uploadImageReqDto extends PickType(BaseImageReqDto, ['name']) {}
