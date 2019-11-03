import { COLOR, isHex, isRgb, isRgba, isCmyk } from '../types/types'
import { toUpper } from 'lodash'

export const color2string = (color: COLOR): string => {
  if (isHex(color)) {
    return toUpper(color)
  } else if (isRgb(color)) {
    return `${color.r}, ${color.g}, ${color.b}`
  } else if (isRgba(color)) {
    return `${color.r}, ${color.g}, ${color.b}, ${color.a}`
  } else if (isCmyk(color)) {
    return `${color.c}%, ${color.m}%, ${color.y}%, ${color.k}%`
  } else return ''
}

export const color2cssString = (color: COLOR): string => {
  if (isHex(color)) {
    return toUpper(color)
  } else if (isRgb(color)) {
    return `rgb(${color.r}, ${color.g}, ${color.b})`
  } else if (isRgba(color)) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  } else if (isCmyk(color)) {
    return `cmyk(${color.c}%, ${color.m}%, ${color.y}%, ${color.k}%)`
  } else return ''
}