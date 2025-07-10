import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { uploadImageReqDto } from '../dto/req/upload.image.req.dto';

export const ApiFileWithuploadImageReqDto = (): MethodDecorator => {
  return applyDecorators(
    ApiExtraModels(uploadImageReqDto),
    ApiBody({
      schema: {
        allOf: [
          { $ref: getSchemaPath(uploadImageReqDto) },
          {
            type: 'object',
            required: ['file'],
            properties: {
              file: {
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
