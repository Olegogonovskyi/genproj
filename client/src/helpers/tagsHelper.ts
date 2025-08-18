export const tagsHelper = (tags: string): string[] => {
  return tags
    .split(/[,\s]+/) // коми, пробіли
    .map(word => word
      .replace(/[^\wа-яіїєґ'-]/gi, '') // видалити все, крім букв, апострофа і дефіса
      .trim()
    )
    .filter(word => word.length > 0); // порожні геть

}