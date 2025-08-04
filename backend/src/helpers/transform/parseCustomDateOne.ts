import { Injectable } from '@nestjs/common';
import { months } from '../costants/fieldconstants';

@Injectable()
export class ParseCustomDateOne {
  public static stringToDate(dateString: string): string {
    const parts = dateString.split(' ');

    if (parts.length === 3) {
      const [day, month, year] = parts;
      const monthIndex = this.getMonthIndex(month);
      return monthIndex !== null
        ? `${year}-${monthIndex}-${this.addZero(day)}`
        : year;
    } else if (parts.length === 2) {
      const [month, year] = parts;
      const monthIndex = this.getMonthIndex(month);
      return monthIndex !== null ? `${year}-${monthIndex}` : year;
    } else if (parts.length === 1) {
      const [year] = parts;
      return year;
    }
  }

  private static addZero(value: string): string {
    return value.padStart(2, '0');
  }

  private static getMonthIndex(monthName: string): string | null {
    const month = months.find((m) => m.monthName === monthName.toUpperCase());
    return month ? month.monthIndex : null;
  }
}
