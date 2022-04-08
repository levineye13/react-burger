export function sumByKey(arr: Array<any>, property: string): number {
  return arr.reduce((sum, item) => sum + (item[property] || 0), 0);
}
