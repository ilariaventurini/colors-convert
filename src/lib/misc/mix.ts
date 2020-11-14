import { Color, RGB } from '../types/types'
import { color2rgb } from '../color-models/rgb'
import { sum, sumBy, round } from 'lodash'
import { applyFnToEachObjValue } from './utils'

/**
 * Mix two or more colors based on their weights.
 * Given [c1, c2, c3, ...] and [w1, w2, w3, ...], it returns:
 *   mixedCol = {
 *      r: sqrt(r1^2 * w1 + r2^2 * w2 + r3^2 * w3 + ...)
 *      g: sqrt(g1^2 * w1 + g2^2 * w2 + g3^2 * w3 + ...)
 *      b: sqrt(b1^2 * w1 + b2^2 * w2 + b3^2 * w3 + ...)
 *   }
 * @param colors array of Colors
 * @param weights array of weights
 * @returns RGB object
 */
export function mix(colors: Color[], weights?: number[]): RGB {
  // defaulting weights
  const ws = getWeights(colors, weights)

  // convert colors in rgb
  const rgbs = colors.map(color2rgb)

  // create the mixed color

  // weighs each component (r, g, b) of each color
  const weightedRgbs = rgbs.map((rgb, i) => weightedRgb(rgb, ws[i]))

  const weightedR = Math.sqrt(sumBy(weightedRgbs, 'cPwR'))
  const weightedG = Math.sqrt(sumBy(weightedRgbs, 'cPwG'))
  const weightedB = Math.sqrt(sumBy(weightedRgbs, 'cPwB'))

  const mix = { r: weightedR, g: weightedG, b: weightedB }
  return applyFnToEachObjValue(mix, (c: number) => round(c)) as RGB
}

/**
 * Weigh each color component (r, g, b) of the color.
 * @param rgb color to be weighted
 * @param weight weight value
 * @returns weighted rgb color
 */
function weightedRgb(rgb: RGB, weight: number) {
  const { r, g, b } = rgb
  const cPwR = r * r * weight
  const cPwG = g * g * weight
  const cPwB = b * b * weight
  return { cPwR, cPwG, cPwB }
}

/**
 * If weights array is not undefined, checks that its ok (sum must be 1 and colors and weights must the of the same lenght) and returns it.
 * If weight is undefined, fill it with the default values (1 / colors.lenght) and returns it.
 * @param colors array of colors
 * @param weights array of weights
 * @returns array of weights.
 */
function getWeights(colors: Color[], weights?: number[]): number[] {
  const defaultWeight = 1 / colors.length
  const defaultWeights = Array(colors.length).fill(defaultWeight)
  if (weights && checkWeights(colors, weights)) return weights
  else return defaultWeights
}

/**
 * Check that the sum of weights is 1 and that colors and weights have the same lenght.
 * @param colors array of colors
 * @param weights array of weights
 * @returns true if the sum of weights is 1 and if colors and weights have the same lenght, false otherwise
 */
function checkWeights(colors: Color[], weights: number[]) {
  const tot = sum(weights)
  if (weights.length !== colors.length)
    throw new Error(
      `Colors and weights should be in the same number. Colors are ${colors.length} and weights are ${weights.length}.`
    )
  if (tot !== 1) throw new Error(`The sum of the weights should be 1, instead is ${tot}.`)
  return true
}
