import { blend } from '../index'

////////////////////////////////////////////////////////
// blend
////////////////////////////////////////////////////////

test(`blend`, () => {
  expect(blend(['#FF0000'])).toStrictEqual({ r: 255, g: 0, b: 0 })
  expect(blend(['#FF0000', '#00FF00'])).toStrictEqual({ r: 180, g: 180, b: 0 })
  expect(blend(['#FF0000', '#00FF00'], [0.7, 0.3])).toStrictEqual({ r: 213, g: 140, b: 0 })
  // expect(blend(['#FF0000', '#00FF00', '#0000FF'], [10, 0, 1])).toThrow(new Error('The sum of the weights should be 1, instead is 11.'))
  // expect(blend(['#FF0000', '#00FF00'], [1])).toThrow(new Error('Colors and weights should be in the same number. Colors are 2 and weights are 1.'))
})
