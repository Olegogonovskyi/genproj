export const tagsHelper = (tags: string): string[] => {
  return tags
    .split(/[,\s]+/) // розділити по пробілах і комах
    .map(word => word
      .replace(/[^\wа-яіїєґ'-]/gi, '') // видалити все, крім букв, апострофа і дефіса
      .trim()
    )
    .filter(word => word.length > 0); // прибрати порожні елементи

}