export function between(value: number, range: [number, number]): boolean {
  const min = Math.min(...range)
  const max = Math.max(...range)
  return value >= min && value <= max
}

export function betweenMaxNotIncluded(value: number, range: [number, number]): boolean {
  const min = Math.min(...range)
  const max = Math.max(...range)
  return value >= min && value < max
}

export function sameContent(a: any[], b: any[]): boolean {
  return a.sort().toString() === b.sort().toString()
}

export function applyFnToEachObjValue(obj: object, fn: any): any {
  const newObj = Object.assign({}, obj)
  Object.entries(newObj).forEach(([key, value]) => {
    //@ts-ignore
    newObj[key] = fn(value)
  })
  return newObj
}
