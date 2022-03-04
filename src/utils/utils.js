export function sumByKey(arr, property) {
  return arr.reduce((sum, item) => sum + (item[property] || 0), 0);
}
