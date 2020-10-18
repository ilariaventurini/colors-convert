/**
 * Return true if range[0] <= value <= range[1] or range[1] <= value <= range[0],
 * false otherwise.
 * @param {number} value number to check is inside the range
 * @param {[number, number]} range numeric range. Could be [min, max] or [max, min]
 * @returns {boolean} true if range[0] <= value <= range[1] or range[1] <= value <= range[0], false otherwise
 */
export function between(value: number, range: [number, number]): boolean {
  const min = Math.min(...range)
  const max = Math.max(...range)
  return value >= min && value <= max
}

/**
 * Return true if value is >= the min range value and value < max,
 * false otherwise.
 * @param {number} value number to check is inside the range
 * @param {number} range numeric range. Could be [min, max] or [max, min]
 * @returns {boolean} true if value is >= the min range value and value < max, false otherwise
 */
export function betweenMaxNotIncluded(value: number, range: [number, number]): boolean {
  const min = Math.min(...range)
  const max = Math.max(...range)
  return value >= min && value < max
}

/**
 * Return true if two arrays have the same content, false otherwise.
 * @param {number} a array
 * @param {number} b array
 * @returns {boolean} true if two arrays have the same content, false otherwise
 */
export function sameContent(a: any[], b: any[]): boolean {
  return a.sort().toString() === b.sort().toString()
}

/**
 * Return a new object to which the fn function has been applied to each value.
 * @param {number} obj object to which the function is to be applied to each value
 * @param {number} fn function to be applied
 * @returns {boolean} a new object to which the fn function has been applied to each value
 */
export function applyFnToEachObjValue(obj: object, fn: any): any {
  const newObj = Object.assign({}, obj)
  Object.entries(newObj).forEach(([key, value]) => {
    //@ts-ignore
    newObj[key] = fn(value)
  })
  return newObj
}
