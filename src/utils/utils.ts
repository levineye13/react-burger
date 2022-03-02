export function sumForAllObjSubarrays(obj, property) {
  let sum = 0;

  for (const key in obj) {
    sum += obj[key].reduce((acc, item) => acc + item[property], 0);
  }

  return sum;
}
