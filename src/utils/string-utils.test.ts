import { insertAt } from './string-utils'

////////////////////////////////////////////////////////
// insertAt
////////////////////////////////////////////////////////

test(`insertAt`, () => {
  expect(insertAt('hello', '/', 0)).toBe('/hello')
  expect(insertAt('hello', '/', 1)).toBe('h/ello')
  expect(insertAt('hello', '/', 4)).toBe('hell/o')
  expect(insertAt('hello', '/', 5)).toBe('hello/')

  expect(() => insertAt('hello', '/', -1)).toThrowError()
  expect(() => insertAt('hello', '/', 6)).toThrowError()
  expect(() => insertAt('hello', '/', 10)).toThrowError()
})
