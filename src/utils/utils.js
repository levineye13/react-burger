export const sumByKey = (arr, key) =>
  arr.reduce((acc, item) => acc + (item[key] || 0), 0);
