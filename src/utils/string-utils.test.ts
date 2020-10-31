import { insertAt, chunkString } from './string-utils'

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

////////////////////////////////////////////////////////
// chunkString
////////////////////////////////////////////////////////

test(`chunkString`, () => {
  expect(chunkString('hi', 2)).toStrictEqual(['hi'])
  expect(chunkString('more', 2)).toStrictEqual(['mo', 're'])
  expect(chunkString('color', 2)).toStrictEqual(['co', 'lo', 'r'])
  expect(chunkString('apples', 3)).toStrictEqual(['app', 'les'])
})
