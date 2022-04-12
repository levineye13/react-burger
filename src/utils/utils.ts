export function sumByKey(arr: Array<any>, property: string): number {
  return arr.reduce((sum, item) => sum + (item[property] || 0), 0);
}

export function extractToken(
  obj: { [key: string]: any },
  field: string,
  schemaType: string
): void {
  obj[field] = obj[field].replace(`${schemaType} `, '');
}