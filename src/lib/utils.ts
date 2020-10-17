/**
 * Return true if range[0] <= value <= range[1] or range[1] <= value <= range[0],
 * false otherwise.
 * @param value number to check is inside the range
 * @param range numeric range. Could be [min, max] or [max, min]
 */
export function between(value: number, range: [number, number]): boolean {
  const min = Math.min(...range)
  const max = Math.max(...range)
  return value >= min && value <= max
}

/**
 * Return true if value is >= the min range value and value < max,
 * false otherwise.
 * @param value number to check is inside the range
 * @param range numeric range. Could be [min, max] or [max, min]
 */
export function betweenMaxNotIncluded(value: number, range: [number, number]): boolean {
  const min = Math.min(...range)
  const max = Math.max(...range)
  return value >= min && value < max
}

/**
 * Return true if two arrays have the same content, false otherwise.
 * @param a array
 * @param b array
 */
export function sameContent(a: any[], b: any[]): boolean {
  return a.sort().toString() === b.sort().toString()
}

/**
 * Return a new object to which the fn function has been applied to each value.
 * @param obj object to which the function is to be applied to each value
 * @param fn function to be applied
 */
export function applyFnToEachObjValue(obj: object, fn: any): any {
  const newObj = Object.assign({}, obj)
  Object.entries(newObj).forEach(([key, value]) => {
    //@ts-ignore
    newObj[key] = fn(value)
  })
  return newObj
}
