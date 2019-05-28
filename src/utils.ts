export function pick<TObject, TKey extends keyof TObject>(
  object: TObject,
  keys: TKey[]
): Pick<TObject, TKey> {
  const picked: Partial<TObject> = {};
  for (const key of Object.keys(object)) {
    if (keys.includes(key as TKey)) {
      (picked as any)[key] = (object as any)[key];
    }
  }

  return picked as Pick<TObject, TKey>;
}

export function isFunction(value: any): boolean {
  return (
    !!value && Object.prototype.toString.call(value) === '[object Function]'
  );
}
