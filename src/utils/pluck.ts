export function pluck(array: any[], field: string) {
  let result = [];
  for (let i = array.length; i--;) {
    result.push(array[i][field]);
  }

  return result;
}
