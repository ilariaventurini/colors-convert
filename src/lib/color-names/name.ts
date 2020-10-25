import { Color, RGB } from '../../types/types'
import { color2rgb } from '../color-models/rgb'
import { colorNames } from '../../constants/colorNames'
import { minBy } from 'lodash'

/**
 * Return the name of the color passed in input.
 * @param color colr to be named
 * @returns color name
 */
export function name(color: Color): string {
  const colorRgb = color2rgb(color)
  const distances = colorNames.map(({ name, rgb }) => ({ name, distance: distance(rgb, colorRgb) }))
  const nearestColor = minBy(distances, 'distance') as { name: string; distance: number }
  return nearestColor.name
}

/**
 * Return the Euclidean distance between two colors.
 * @param color1 first color
 * @param color2 second color
 * @returns Euclidean distance between two colors
 */
function distance(color1: Color, color2: Color): number {
  const c1Rgb = color2rgb(color1)
  const c2Rgb = color2rgb(color2)
  const distance = euclideanRgbDistance(c1Rgb, c2Rgb)
  return distance
}

/**
 * Compute the Euclidean distance between two rgb colors, defined as the following:
 *   distance = sqrt((r₁ - r₂)² + (g₁ - g₂)² + (b₁ - b₂)²)
 * The minimum distance is zero (the difference between the same color),
 * The maximum distance is ≈ 441.67 between black and white.
 * @param color1 first rgb color
 * @param color2 second rgb color
 * @returns numeric value in [0, ≈ 441.67] that represents the Euclidean difference between two rgb colors
 */
function euclideanRgbDistance(color1: RGB, color2: RGB): number {
  const rDiff = Math.pow(color1.r - color2.r, 2)
  const gDiff = Math.pow(color1.g - color2.g, 2)
  const bDiff = Math.pow(color1.b - color2.b, 2)
  return Math.sqrt(rDiff + gDiff + bDiff)
}
