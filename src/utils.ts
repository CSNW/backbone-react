export function assign(object: any, ...sources: any[]): any {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      object[key] = source[key];
    }
  }

  return object;
}

export function pick(object: any, keys: string[]): any {
  const picked: any = {};
  for (const key of Object.keys(object)) {
    if (keys.includes(key)) {
      picked[key] = object[key];
    }
  }

  return picked;
}

export function isFunction(value: any): boolean {
  return (
    !!value && Object.prototype.toString.call(value) === '[object Function]'
  );
}
