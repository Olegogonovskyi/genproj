import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as stream from 'node:stream';
import * as csvParser from 'csv-parser';

export type GedcomRecord = {
  level: number;
  tag: string;
  value: string;
  children: GedcomRecord[];
};

@Injectable()
export class GedParser {
  public parse(fileContent: any) {
    try {
      const results: any[] = [];

      const readable = new stream.Readable();
      readable._read = () => {}; // no-op
      readable.push(fileContent);
      readable.push(null);

      return new Promise((resolve, reject) => {
        readable
          .pipe(csvParser())
          .on('data', (data: any) => results.push(data))
          .on('end', () => {
            resolve(results);
          })
          .on('error', (error: any) => {
            reject(error);
          });
      });
    } catch (error) {
      console.error('Error reading file from S3:', error);
      throw new InternalServerErrorException(
        'An internal server error occurred.',
      );
    }
    // const lines = fs.readFileSync(path, 'latin1').split('\n');
    // const result = [];
    // const stack = [];
    // // Обробляємо кожен рядок
    // lines.forEach((line) => {
    //   const match = line.match(/^(\d+) (\w+)(?: (.+))?$/); // Розпізнаємо рівень, тег і дані
    //   if (match) {
    //     const level = parseInt(match[1], 10);
    //     const tag = match[2];
    //     const value = match[3] || null;
    //
    //     const node = { tag, value, children: [] };
    //
    //     if (level === 0) {
    //       result.push(node);
    //       stack.length = 0; // Очищуємо стк
    //       stack.push(node);
    //     } else {
    //       while (stack.length > level) stack.pop(); // Повертаємося до потрібного рівня
    //
    //       stack[stack.length - 1].children.push(node); // Додаємо дочірній елемент
    //       stack.push(node);
    //     }
    //   }
    // });
    // return result;
  }
}
