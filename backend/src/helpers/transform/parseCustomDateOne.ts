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
        ? toString((year), monthIndex, Number(day))
        : toString(Number(year), 0); // Якщо місяць невідомий
    } else if (parts.length === 2) {
      const [month, year] = parts;
      const monthIndex = this.getMonthIndex(month);
      return monthIndex !== null
        ? toString(Number(year), monthIndex)
        : toString(Number(year), 0);
    } else if (parts.length === 1) {
      const [year] = parts;
      return year
    }
  }

  private static getMonthIndex(monthName: string): number | null {
    const month = months.find((m) => m.monthName === monthName.toUpperCase());
    return month ? month.monthIndex : null;
  }
}
