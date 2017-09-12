export function get(obj: any, path: string, def: any = undefined) {
  if (!obj || !path) {
    return def;
  }

  let arr = path.split('.');
  let current = obj;

  for (let i = 0; i < arr.length; i++) {
    if (!current[arr[i]]){
      return def;
    }
    current = current[arr[i]];
  }

  return current || def;

}