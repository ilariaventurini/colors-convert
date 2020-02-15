import { mix } from '../index'

////////////////////////////////////////////////////////
// mix
////////////////////////////////////////////////////////

test(`mix`, () => {
  expect(mix(['#FF0000'])).toStrictEqual({ r: 255, g: 0, b: 0 })
  expect(mix(['#FF0000', '#00FF00'])).toStrictEqual({ r: 180, g: 180, b: 0 })
  expect(mix(['#FF0000', '#00FF00'], [0.7, 0.3])).toStrictEqual({ r: 213, g: 140, b: 0 })
})
