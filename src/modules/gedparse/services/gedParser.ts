import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GedcomRecordType } from '../../../helpers/types/GedcomRecord.Type';

@Injectable()
export class GedParser {
  public async parse(fileContent: any) {
    try {
      const lines = fileContent
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

      const records: GedcomRecordType[] = [];
      const stack: GedcomRecordType[] = [];
      for (const line of lines) {
        const [levelStr, tag, ...valueParts] = line.split(' ');
        const level = parseInt(levelStr, 10);
        const value = valueParts.join(' ');

        const record: GedcomRecordType = { level, tag, value, children: [] };

        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
          stack.pop();
        }

        if (stack.length === 0) {
          records.push(record);
        } else {
          stack[stack.length - 1].children.push(record);
        }

        stack.push(record);
      }

      return JSON.stringify(records, null, 2);
    } catch (error) {
      console.error('Error reading file', error);
      throw new InternalServerErrorException(
        'An internal server error occurred.',
      );
    }
  }
}
