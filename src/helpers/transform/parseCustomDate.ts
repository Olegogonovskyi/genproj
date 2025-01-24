import { Injectable } from '@nestjs/common';

type mounthType = {
  monthName: string;
  monthIndex: number;
};

const months: mounthType[] = [
  { monthName: 'JAN', monthIndex: 0 },
  { monthName: 'FEB', monthIndex: 1 },
  { monthName: 'MAR', monthIndex: 2 },
  { monthName: 'APR', monthIndex: 3 },
  { monthName: 'MAY', monthIndex: 4 },
  { monthName: 'JUN', monthIndex: 5 },
  { monthName: 'JUL', monthIndex: 6 },
  { monthName: 'AUG', monthIndex: 7 },
  { monthName: 'SEP', monthIndex: 8 },
  { monthName: 'OCT', monthIndex: 9 },
  { monthName: 'NOV', monthIndex: 10 },
  { monthName: 'DEC', monthIndex: 11 },
];

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
