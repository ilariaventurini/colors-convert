import { isRgba } from '../../types/isType'
import { RGB, RGBA } from '../../types/types'
import { fromLongToShortRgbaFormat, shortRgbaFormatToRgbaObject } from '../../utils/rgba-utils'

// TODO: rgba2hex
// TODO: rgba2cmyk
// TODO: rgba2hsl

/**
 * Convert a rgba color object to a rgb color removing the alpha value.
 * @param rgba color to convert to rgb
 * @returns rgb color object
 */
export function rgba2rgb(rgba: RGBA): RGB {
  if (!isRgba(rgba)) throw new Error(`${rgba} is not a rgba color.`)

  return { r: rgba.r, g: rgba.g, b: rgba.b }
}

/**
 * Covert a string in these two formats to a rgba object:
 *  - 255, 0, 255, 0.5 (short format) -> {r: 255, g: 0, b: 255, a: 0.5}
 *  - rgba(255, 0, 255, 0.5) (long format) -> {r: 255, g: 0, b: 255, a: 0.5}.
 * @param rgbaString rgba string
 * @returns rgba object
 */
// TODO: check
// TODO: do also for other color models
// TODO: change regex to accept also a = .4
export function rgbaString2Object(rgbaString: string): RGBA {
  // check short and long formats
  const regexShortFormat = /^(([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*((0(\.\d+)?|1(\.0+)?)))/gi
  const regexLongFormat = /^((rgba(\s)*\()(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*, (\s)*((0(\.\d+)?|1(\.0+)?))(\s)*(\)))/gi
  const isShortFormat = regexShortFormat.test(rgbaString)
  const isLongFormat = regexLongFormat.test(rgbaString)

  if (!isShortFormat && !isLongFormat)
    throw new Error(
      `${rgbaString} is not a valid format. The accepted formats are 'r, g, b, a' and 'rgba(r, g, b, a)' with r, g, b in [0, 255] and a in [0, 1].`
    )

  const rgbaStringCleanShortFormat = isShortFormat
    ? rgbaString
    : fromLongToShortRgbaFormat(rgbaString)
  return shortRgbaFormatToRgbaObject(rgbaStringCleanShortFormat)
}

// TODO: colorToRgba
