export function stringifyBigIntId<T extends { id: bigint | number }>(obj: T): T & { id: string } {
  return { ...obj, id: obj.id.toString() };
}
