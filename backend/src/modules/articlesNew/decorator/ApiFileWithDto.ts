import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, getSchemaPath, ApiBody } from '@nestjs/swagger';

export const ApiFileWithDto = <TModel extends Type<any>>(
  fileFieldName: string,
  dto: TModel,
  isArray = true,
  isRequired = true,
): MethodDecorator => {
  return applyDecorators(
    ApiExtraModels(dto),
    ApiBody({
      schema: {
        allOf: [
          { $ref: getSchemaPath(dto) },
          {
            type: 'object',
            required: isRequired ? [fileFieldName] : [],
            properties: {
              [fileFieldName]: isArray
                ? {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                  }
                : {
                    type: 'string',
                    format: 'binary',
                  },

              // JSON-об'єкт body передається через FormData, але ще потестую)
              body: {
                type: 'string',
                description: 'JSON.stringify array of article blocks',
              },

              tags: {
                type: 'array',
                items: { type: 'string' },
              },
            },
          },
        ],
      },
    }),
  );
};
