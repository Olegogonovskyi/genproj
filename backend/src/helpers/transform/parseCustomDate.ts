import { Injectable } from '@nestjs/common';
import { months } from '../costants/fieldconstants';

@Injectable()
export class ParseCustomDate {
  public static stringToDate(dateString: string): Date | string {
    const parts = dateString.split(' ');
    console.log(parts);

    if (parts.length === 3) {
      const [day, month, year] = parts;
      const monthIndex = this.getMonthIndex(month);
      return monthIndex !== null
        ? new Date(Number(year), monthIndex, Number(day))
        : new Date(Number(year), 0); // Якщо місяць невідомий
    } else if (parts.length === 2) {
      const [month, year] = parts;
      const monthIndex = this.getMonthIndex(month);
      return monthIndex !== null
        ? new Date(Number(year), monthIndex)
        : new Date(Number(year), 0);
    } else if (parts.length === 1) {
      const [year] = parts;
      return this.formatYearOnly(Number(year));
    }
  }

  private static getMonthIndex(monthName: string): number | null {
    const month = months.find((m) => m.monthName === monthName.toUpperCase());
    return month ? month.monthIndex : null;
  }

  private static formatYearOnly(year: number): string {
    return `${year}`; // Зберігаємо лише рік у вигляді рядка
  }
}
