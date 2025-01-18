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
  public static stringToDate(dateString: string): Date {
    const parts = dateString.split(' ');

    if (parts.length === 3) {
      const [day, month, year] = parts;
      return this.mounthNameChecker(month)
        ? new Date(Number(year), months[month.toUpperCase()], Number(day))
        : new Date(Number(year), 0);
    } else if (parts.length === 2) {
      const [month, year] = parts;
      return this.mounthNameChecker(month)
        ? new Date(Number(year), months[month.toUpperCase()])
        : new Date(Number(year), 0);
    } else if (parts.length === 1) {
      const [year] = parts;
      return new Date(Number(year), 0);
    }
  }

  private static mounthNameChecker(mounthName: string): boolean {
    return !months.filter((value) => value.monthName.includes(mounthName));
  }
}
