import { orRegex } from './regex-utils'

////////////////////////////////////////////////////////
// orRegex
////////////////////////////////////////////////////////

test(`orRegex`, () => {
  expect(orRegex([/[a-z]/, /[0-9]/])).toEqual(/[a-z]|[0-9]/i)
  expect(orRegex([/[a-z]/, /[0-9]/], 'i')).toEqual(/[a-z]|[0-9]/i)
  expect(orRegex([/[a-z]/])).toEqual(/[a-z]/i)
  expect(orRegex([])).toEqual(/(?:)/i)
})
