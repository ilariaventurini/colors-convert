export const between = (value: number, range: [number, number]) => {
  const min = Math.min(...range)
  const max = Math.max(...range)
  return value >= min && value <= max
}

export const sameContent = (a: any[], b: any[]) => a.sort().toString() == b.sort().toString()
