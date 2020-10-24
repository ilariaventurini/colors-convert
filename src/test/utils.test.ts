import { between, betweenMaxNotIncluded, sameContent, applyFnToEachObjValue } from '../lib/utils'

////////////////////////////////////////////////////////
// between
////////////////////////////////////////////////////////

test(`between`, () => {
  expect(between(5, [0, 10])).toBe(true)
  expect(between(5, [5, 10])).toBe(true)
  expect(between(5, [5, 5])).toBe(true)
  expect(between(0, [5, 10])).toBe(false)
})

////////////////////////////////////////////////////////
// betweenMaxNotIncluded
////////////////////////////////////////////////////////

test(`betweenMaxNotIncluded`, () => {
  expect(betweenMaxNotIncluded(5, [0, 10])).toBe(true)
  expect(betweenMaxNotIncluded(5, [5, 10])).toBe(true)
  expect(betweenMaxNotIncluded(5, [4, 5])).toBe(false)
  expect(betweenMaxNotIncluded(0, [5, 10])).toBe(false)
})

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
