import { Color, ColorName, RGB } from '../types/types'
import { color2rgb } from './rgb'
import { colorNames } from '../constants/colorNames'
import { minBy } from 'lodash'

export function name(color: Color): ColorName {
  const colorRgb = color2rgb(color)
  const distances = colorNames.map(({ name, hex, rgb }) => {
    const d = distance(rgb, colorRgb)
    return { name, distance: d, hex, rgb }
  })
  const nearestColor = minBy(distances, 'distance')
  if (!nearestColor) throw new Error(`Something went wrong finding a name to ${color}.`)
  return nearestColor.name
}

function distance(color1: Color, color2: Color): number {
  const c1Rgb = color2rgb(color1)
  const c2Rgb = color2rgb(color2)
  const distance = euclideanRgbDistance(c1Rgb, c2Rgb)
  return distance
}

function euclideanRgbDistance(color1: RGB, color2: RGB): number {
  const rDiff = Math.pow(color1.r - color2.r, 2)
  const gDiff = Math.pow(color1.g - color2.g, 2)
  const bDiff = Math.pow(color1.b - color2.b, 2)
  return Math.sqrt(rDiff + gDiff + bDiff)
}
