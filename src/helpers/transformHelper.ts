export class TransformHelper {
  public static trim({ value }: { value: string }): string {
    return value ? value.trim() : value;
  }

  public static trimArray({ value }) {
    if (!value) return value;
    // Якщо value є рядком, розбиваємо його по комах (або іншому розділювачу)
    if (typeof value === 'string') {
      value = value.split(',').map((item) => item.trim());
    } else if (Array.isArray(value)) {
      value = value.map((item) => item.trim());
    }
    return value;
  }

  public static uniqueItems({ value }) {
    return value ? Array.from(new Set(value)) : value;
  }
  public static toLowerCaseArray({ value }) {
    return value ? value.map((item) => item.toLowerCase()) : value;
  }
  public static toLowerCase({ value }: { value: string }): string {
    return value ? value.toLowerCase() : value;
  }
}
