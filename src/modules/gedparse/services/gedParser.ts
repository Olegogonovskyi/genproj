import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GedcomRecordType } from '../../../helpers/types/GedcomRecord.Type';
import { CleanfromHTMLandCSS } from '../../../helpers/cleanfromHTMLandCSS/cleanfromHTMLandCSS';

@Injectable()
export class GedParser {
  constructor(private readonly cleanfromHTMLandCSS: CleanfromHTMLandCSS) {}

  public async parse(fileContent: any): Promise<GedcomRecordType[]> {
    try {
      const lines = fileContent
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

      const records: GedcomRecordType[] = [];
      const stack: GedcomRecordType[] = [];

      const parseLine = (line: string) => {
        const parts = line.split(' ');
        const level = parseInt(parts[0], 10);

        if (isNaN(level)) {
          console.warn('Invalid line without level:', line);
          return null;
        }

        const tag = parts[1];
        const rawValue = parts.slice(2).join(' ');
        const value = this.cleanfromHTMLandCSS.stripHtmlAndCss(rawValue);
        return { level, tag, value };
      };

      for (const line of lines) {
        const parsedLine = parseLine(line);
        if (!parsedLine) continue;

        const { level, tag, value } = parsedLine;
        const record: GedcomRecordType = { level, tag, value, children: [] };

        // Обробка багаторядкових нотаток
        if (tag === 'CONC' && stack.length > 0) {
          stack[stack.length - 1].value += value;
          continue;
        }

        if (tag === 'CONT' && stack.length > 0) {
          stack[stack.length - 1].value += '\n' + value;
          continue;
        }

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

      return records;
    } catch (error) {
      console.error('Error reading file', error);
      throw new InternalServerErrorException(
        'An internal server error occurred.',
      );
    }
  }
}
