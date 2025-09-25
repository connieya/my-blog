export function isEmptyArray<T>(array: T[]) {
  return Array.isArray(array) && array.length === 0;
}
