export const dateMatcher = (
  birdBase: string | null | undefined,
  deathBase: string | null | undefined
): [number | null, number | null] => {
  let [parseBird, parseDeath] = [birdBase, deathBase].map(dateStr => {
    if (typeof dateStr !== 'string') return null;
    const match = dateStr.match(/\b\d{4}\b/);
    return match ? parseInt(match[0], 10) : null;
  });

  if (typeof parseBird === 'number' && parseDeath === null) {
    parseDeath = parseBird + 50;
  } else if (typeof parseDeath === 'number' && parseBird === null) {
    parseBird = parseDeath - 50;
  }

  return [parseBird, parseDeath];
};
