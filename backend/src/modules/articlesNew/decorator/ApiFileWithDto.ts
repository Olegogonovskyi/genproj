// import { applyDecorators, Type } from '@nestjs/common';
// import { ApiBody, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';
//
// export const ApiFileWithDto = <TModel extends Type<any>>(
//   fileName: string,
//   dto: TModel,
//   isArray = true,
//   isRequired = true,
// ): MethodDecorator => {
//   return applyDecorators(
//     ApiExtraModels(dto),
//     ApiBody({
//       schema: {
//         allOf: [
//           { $ref: getSchemaPath(dto) },
//           {
//             type: 'object',
//             required: isRequired ? [fileName] : [],
//             properties: {
//               [fileName]: isArray
//                 ? {
//                     type: 'array',
//                     items: {
//                       type: 'string',
//                       format: 'binary',
//                     },
//                   }
//                 : {
//                     type: 'string',
//                     format: 'binary',
//                   },
//               tags: {
//                 type: 'array',
//                 items: { type: 'string' },
//               },
//             },
//           },
//         ],
//       },
//     }),
//   );
// };

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

              // JSON-об'єкт body передається як stringified JSON (наприклад, через FormData)
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
