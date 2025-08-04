import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { uploadImageReqDto } from '../dto/req/upload.image.req.dto';
import { ContentType } from '../../filestorage/enums/content-type.enum';

export const ApiFileWithuploadImageReqDto = (): MethodDecorator => {
  return applyDecorators(
    ApiExtraModels(uploadImageReqDto),
    ApiBody({
      schema: {
        allOf: [
          { $ref: getSchemaPath(uploadImageReqDto) },
          {
            type: 'object',
            required: [ContentType.ARTICLE], // не завтикати дати ту саму назву шо в мультеорі, помилка з артіклів
            properties: {
              [ContentType.ARTICLE]: {
                type: 'string',
                format: 'binary',
              },
            },
          },
        ],
      },
    }),
  );
};
