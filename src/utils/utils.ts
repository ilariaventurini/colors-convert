/**
 * Return true if two arrays have the same content, false otherwise.
 * @param a array
 * @param b array
 * @returns true if two arrays have the same content, false otherwise
 * @private
 */
export function sameContent(a: any[], b: any[]): boolean {
  return a.sort().toString() === b.sort().toString()
}

/**
 * Return a new object to which the fn function has been applied to each value.
 * @param obj object to which the function is to be applied to each value
 * @param fn function to be applied
 * @returns a new object to which the fn function has been applied to each value
 * @private
 */
export function applyFnToEachObjValue(obj: object, fn: any): any {
  const newObj = Object.assign({}, obj)
  Object.entries(newObj).forEach(([key, value]) => {
    //@ts-ignore
    newObj[key] = fn(value)
  })
  return newObj
}
