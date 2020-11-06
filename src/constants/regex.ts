import { orRegex } from '../utils/regex-utils'

// TODO: test

/////////////////////////////////////////////////////////////////////
// Hex
/////////////////////////////////////////////////////////////////////

/**
 * Match strings containing chars in [0-9a-fA-F], floating hxadecimal values are accepted.
 *
 * ✓ 0, ff, FFAAAAAAAAAA, F0, 0.1, AAAA.F1
 * ✗ #FFF, k, .A, AF4.Z
 */
const HEXADECIMAL = /^(([0-9a-f])+([.]([0-9a-f])+)?)$/i

/**
 * Match strings that respect CSS hexadecimal short notation without opacity:
 * #RGB (3-digit, short form) where R, G, B are in [0-9a-fA-F].
 *
 * ✓ #fff, #FFF
 * ✗ #ffffff, #FFFFFF, #FFFFFF00, FF, KKKKKK
 */
const HEX_SHORT_WITHOUT_ALPHA = /^#(?:([0-9a-f]{3}))$/i

/**
 * Match strings that respect CSS hexadecimal short notation with opacity:
 * #RGBA (3-digit, short form) where R, G, B, A are in [0-9a-fA-F].
 *
 * ✓ #fffa, #FFFf
 * ✗ #fff, #FFFFFF, #FFFFFF00, FF, KKKKKK
 */
const HEX_SHORT_WITH_ALPHA = /^#(?:([0-9a-f]{3})([0-9a-f]{1}))$/i

/**
 * Match strings that respect CSS hexadecimal short notation: #RGB[A] (3/4-digit, short form)
 * where R, G, B, A are in [0-9a-fA-F].
 *
 * ✓ #fff, #FFF, #fffa, #FFFf
 * ✗ #FFFFFF, #FFFFFF00, FF, KKKKKK
 */
const HEX_SHORT = orRegex([HEX_SHORT_WITHOUT_ALPHA, HEX_SHORT_WITH_ALPHA])

/**
 * Match strings that respect CSS hexadecimal long notation without opacity:
 * #RRGGBB (6-digit, long form) where R, G, B are in [0-9a-fA-F].
 *
 * ✓ #ffffff, #FFFFFF
 * ✗ #FFFFFF00, FF, KKKKKK
 */
const HEX_LONG_WITHOUT_ALPHA = /^#(?:([0-9a-f]{6}))$/i

/**
 * Match strings that respect CSS hexadecimal long notation with opacity:
 * #RRGGBBAA (6-digit, long form) where R, G, B, A are in [0-9a-fA-F].
 *
 * ✓ #ffffffaa, #FFFFFF00
 * ✗ #FFFFFF0, #fff, #ffffff, FF, KKKKKK
 */
const HEX_LONG_WITH_ALPHA = /^#(?:([0-9a-f]{6})([0-9a-f]{2}))$/i

/**
 * Match strings that respect CSS hexadecimal long notation #RRGGBB[AA] (6/8-digit, long form)
 * where R, G, B, A are in [0-9a-fA-F].
 *
 * ✓ #ffffff, #FFFFFF, #ffffffaa, #FFFFFF00
 * ✗ #FFFFFF0, #fff, FF, KKKKKK
 */
const HEX_LONG = orRegex([HEX_LONG_WITHOUT_ALPHA, HEX_LONG_WITH_ALPHA])

/**
 * Match strings that respect CSS hexadecimal notation:
 *  - #RRGGBB[AA] (6/8-digit, long form)
 *  - #RGB[A] (3/4-digit, short form)
 * where R, G, B, A are in [0-9a-fA-F].
 * ref: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value.
 *
 * ✓ #ffffff, #FFFFFF, #FFF, #FFF0 #FFFFFF00
 * ✗ FF, #KKKKKK, #FFFFF
 */
const HEX_COLOR = orRegex([HEX_SHORT, HEX_LONG])

/**
 * Match strings of length 2 and containing chars in [0-9a-fA-F].
 *
 * ✓ ff, FF, F0
 * ✗ FFF, #FF
 */
const HEX_ALPHA = /[0-9a-f]{2}$/i

export const HEX_REGEX = {
  generic: HEXADECIMAL,
  shortWithoutAlpha: HEX_SHORT_WITHOUT_ALPHA,
  shortWithAlpha: HEX_SHORT_WITH_ALPHA,
  short: HEX_SHORT,
  longWithoutAlpha: HEX_LONG_WITHOUT_ALPHA,
  longWithAlpha: HEX_LONG_WITH_ALPHA,
  long: HEX_LONG,
  color: HEX_COLOR,
  alpha: HEX_ALPHA,
}

/////////////////////////////////////////////////////////////////////
// Rgb
/////////////////////////////////////////////////////////////////////

/**
 * Match strings in the format 'R, G, B' where R, G, B are in [0-9].
 *
 * ✓ '0, 0, 0', '0,0, 0', '0,    0, 0', '255, 0, 4', '244, 0, 300'
 * ✗ '-1, 0, 0'
 */
const RGB_SHORT = /^(([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+))$/i

/**
 * Match strings in the format 'rgb(R, G, B)' where R, G, B are in [0-9].
 *
 * ✓ 'rgb(0, 0, 0)', 'rgb(0,0, 0)', 'rgb(0,    0, 0)', 'rgb(255, 0, 4)', 'rgb(244, 0, 300)'
 * ✗ '(-1, 0, 0)'
 */
const RGB_LONG = /^((rgb(\s)*\()(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*(\)))$/i

export const RGB_REGEX = {
  short: RGB_SHORT,
  long: RGB_LONG,
}

/////////////////////////////////////////////////////////////////////
// Rgba
/////////////////////////////////////////////////////////////////////

/**
 * Match strings in the format 'R, G, B, A' where R, G, B, A are in [0-9].
 *
 * ✓ '0, 0, 0, 0.5', '0,0, 0, 1', '0,    0, 0, 0', '255, 0, 4, 1', '244, 0, 300, 0'
 * ✗ '-1, 0, 0, 0'
 */
const RGBA_SHORT = /^(([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*(0(\.\d+)?|1(\.0+)?))$/i

/**
 * Match strings in the format 'rgb(R, G, B, A)' where R, G, B, A are in [0-9].
 *
 * ✓ 'rgb(0, 0, 0, 0.5)', 'rgb(0,0, 0, 1)', 'rgb(0,    0, 0, 0)', 'rgb(255, 0, 4, 0)', 'rgb(244, 0, 300, 0)'
 * ✗ '(-1, 0, 0, 0)'
 */
const RGBA_LONG = /^((rgba(\s)*\()(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+),(\s)*(0(\.\d+)?|1(\.0+)?)(\s)*(\)))$/i

export const RGBA_REGEX = {
  short: RGBA_SHORT,
  long: RGBA_LONG,
}

/////////////////////////////////////////////////////////////////////
// Cmyk
/////////////////////////////////////////////////////////////////////

/**
 * Match strings in the format 'N, N, N, N' where N is in [0-9].
 *
 * ✓ '0, 0, 0, 5', '0,0, 0, 10000', '0,    0, 0, 0', '255, 0, 4, 1', '244, 0, 300, 0'
 * ✗ '-1, 0, 0, 0'
 */
const CMYK_SHORT = /^(([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+),(\s)*([0-9]+))$/i

/**
 * Match strings in the format 'cmyk(N, N, N, N)' where N is in [0-9].
 *
 * ✓ 'cmyk(0, 0, 0, 5)', 'cmyk(0,0, 0, 1)', 'cmyk(0,    0, 0, 0)', 'cmyk(255, 0, 4, 0)', 'cmyk(244, 0, 300, 0)'
 * ✗ '(-1, 0, 0, 0)'
 */
const CMYK_LONG = /^((cmyk(\s)*\()(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*,(\s)*([0-9]+)(\s)*(\)))$/i

export const CMYK_REGEX = {
  short: CMYK_SHORT,
  long: CMYK_LONG,
}

/////////////////////////////////////////////////////////////////////
// Hsl
/////////////////////////////////////////////////////////////////////

/**
 * Match strings in the format 'A, N%, N%' where A, N are numbers.
 *
 * ✓ '322, 79%, 52%', '322 , 79%, 52%', '322, 79%,52 %', '1000, 79%, 52%'
 * ✗ '-1, 0, 0', '322, 79, 52%'
 */
const HSL_SHORT = /^(([0-9]+)(\s)*,(\s)*([0-9]+%)(\s)*,(\s)*([0-9]+%))$/i

/**
 * Match strings in the format 'hsl(A, N%, N%)' where A, N are numbers.
 *
 * ✓ 'hsl(322, 79%, 52%)', 'hsl(322 , 79%, 52%)', 'hsl(322, 79%,52 %)', 'hsl(1000, 79%, 52%)'
 * ✗ '-1, 0, 0', 'hsl(322, 79, 52%)'
 */
const HSL_LONG = /^((hsl(\s)*\()(\s)*([0-9]+)(\s)*,(\s)*([0-9]+%)(\s)*,(\s)*([0-9]+%)(\s)*(\)))$/i

export const HSL_REGEX = {
  short: HSL_SHORT,
  long: HSL_LONG,
}
