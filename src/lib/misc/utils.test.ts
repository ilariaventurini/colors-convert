import { sameContent, applyFnToEachObjValue } from './utils'

////////////////////////////////////////////////////////
// sameContent
////////////////////////////////////////////////////////

test(`sameContent`, () => {
  expect(sameContent([1, 2, 3], [1, 2, 3])).toBe(true)
  expect(sameContent([2, 1, 3], [1, 2, 3])).toBe(true)
  expect(sameContent([1, 2, 3], [1, 2, 4])).toBe(false)
  expect(sameContent([1, 2, 3], [1, 2, 3, 4])).toBe(false)
})

////////////////////////////////////////////////////////
// applyFnToEachObjValue
////////////////////////////////////////////////////////

test(`applyFnToEachObjValue`, () => {
  expect(applyFnToEachObjValue({ a: 1, b: 2 }, (d: number) => d * 2)).toEqual({ a: 2, b: 4 })
})
