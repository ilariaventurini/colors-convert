export const between = (value: number, range: [number, number]) => {
  const min = Math.min(...range)
  const max = Math.max(...range)
  return value >= min && value <= max
}

export const sameContent = (a: any[], b: any[]) => a.sort().toString() == b.sort().toString()

export const applyFnToEachObjValue = (obj: Object, fn: Function) => {
  Object.entries(obj).forEach(([key, value]) => {
    // @ts-ignore
    obj[key] = fn(value)
  })
  return obj
}
