import { Color, RGB } from '../types/types'
import { color2rgb } from './rgb'
import { sum, sumBy, round } from 'lodash'
import { applyFnToEachObjValue } from './utils'

// Blend two or more colors based on their weights.
// Given [c1, c2, c3, ...] and [w1, w2, w3, ...], it returns:
//   blendedCol = {
//      r: sqrt(r1^2 * w1 + r2^2 * w2 + r3^2 * w3 + ...)
//      g: sqrt(g1^2 * w1 + g2^2 * w2 + g3^2 * w3 + ...)
//      b: sqrt(b1^2 * w1 + b2^2 * w2 + b3^2 * w3 + ...)
//   }
export const blend = (colors: Color[], weights?: number[]): RGB => {
  // defaulting weights
  const ws = getWeights(colors, weights)

  // convert colors in rgb
  const rgbs = colors.map(color2rgb)

  // create the blended color
  const weightedRgbs = rgbs.map((rgb, i) => {
    return weightedRgb(rgb, ws[i])
  })

  const weightedR = Math.sqrt(sumBy(weightedRgbs, 'cPwR'))
  const weightedG = Math.sqrt(sumBy(weightedRgbs, 'cPwG'))
  const weightedB = Math.sqrt(sumBy(weightedRgbs, 'cPwB'))

  const blend = { r: weightedR, g: weightedG, b: weightedB }
  return applyFnToEachObjValue(blend, (c: number) => round(c)) as RGB
}

const weightedRgb = (rgb: RGB, weight: number) => {
  const { r, g, b } = rgb
  const cPwR = r * r * weight
  const cPwG = g * g * weight
  const cPwB = b * b * weight
  return { cPwR, cPwG, cPwB }
}

const getWeights = (colors: Color[], weights?: number[]): number[] => {
  const defaultWeight = 1 / colors.length
  const defaultWeights = Array(colors.length).fill(defaultWeight)
  if (weights && checkWeights(colors, weights)) {
    return weights
  } else {
    return defaultWeights
  }
}

const checkWeights = (colors: Color[], weights: number[]) => {
  const tot = sum(weights)
  if (tot !== 1) {
    throw new Error(`The sum of the weights should be 1, instead is ${tot}.`)
  }
  if (weights.length !== colors.length) {
    throw new Error(
      `Colors and weights should be in the same number. Colors are ${colors.length} and weights are ${weights.length}.`
    )
  }
  return true
}
