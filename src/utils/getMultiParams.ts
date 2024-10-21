export const getMultiParams = (centuries: string[], century: string) => {
  return centuries.includes(century)
    ? centuries.filter(c => c !== century)
    : [...centuries, century];
};
