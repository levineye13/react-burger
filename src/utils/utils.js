export function sumForObjSubarrays(obj, property, keyList) {
  let sum = 0;

  for (const key of keyList) {
    sum += obj[key].reduce((acc, item) => acc + item[property], 0);
  }

  return sum;
}
