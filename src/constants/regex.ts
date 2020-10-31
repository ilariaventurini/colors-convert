import { orRegex } from '../utils/regex-utils'

/**
 * Match strings containing chars in [0-9a-fA-F], floating hxadecimal values are accepted.
 *
 * ✓ 0, ff, FFAAAAAAAAAA, F0, 0.1, AAAA.F1
 * ✗ #FFF, k, .A, AF4.Z
 */
export const HEXADECIMAL_REGEX = /^(([0-9a-f])+([.]([0-9a-f])+)?)$/i

/**
 * Match strings that respect CSS hexadecimal short notation without opacity:
 * #RGB (3-digit, short form) where R, G, B are in [0-9a-fA-F].
 *
 * ✓ #fff, #FFF
 * ✗ #ffffff, #FFFFFF, #FFFFFF00, FF, KKKKKK
 */
export const HEX_SHORT_WITHOUT_ALPHA_REGEX = /^#(?:([0-9a-f]{3}))$/i

/**
 * Match strings that respect CSS hexadecimal short notation with opacity:
 * #RGBA (3-digit, short form) where R, G, B, A are in [0-9a-fA-F].
 *
 * ✓ #fffa, #FFFf
 * ✗ #fff, #FFFFFF, #FFFFFF00, FF, KKKKKK
 */
export const HEX_SHORT_WITH_ALPHA_REGEX = /^#(?:([0-9a-f]{3})([0-9a-f]{1}))$/i

/**
 * Match strings that respect CSS hexadecimal short notation: #RGB[A] (3/4-digit, short form)
 * where R, G, B, A are in [0-9a-fA-F].
 *
 * ✓ #fff, #FFF, #fffa, #FFFf
 * ✗ #FFFFFF, #FFFFFF00, FF, KKKKKK
 */
export const HEX_SHORT_REGEX = orRegex([HEX_SHORT_WITHOUT_ALPHA_REGEX, HEX_SHORT_WITH_ALPHA_REGEX])

/**
 * Match strings that respect CSS hexadecimal long notation without opacity:
 * #RRGGBB (6-digit, long form) where R, G, B are in [0-9a-fA-F].
 *
 * ✓ #ffffff, #FFFFFF
 * ✗ #FFFFFF00, FF, KKKKKK
 */
// unused
export const HEX_LONG_WITHOUT_ALPHA_REGEX = /^#(?:([0-9a-f]{6}))$/i

/**
 * Match strings that respect CSS hexadecimal long notation with opacity:
 * #RRGGBBAA (6-digit, long form) where R, G, B, A are in [0-9a-fA-F].
 *
 * ✓ #ffffffaa, #FFFFFF00
 * ✗ #FFFFFF0, #fff, #ffffff, FF, KKKKKK
 */
export const HEX_LONG_WITH_ALPHA_REGEX = /^#(?:([0-9a-f]{6})([0-9a-f]{2}))$/i

/**
 * Match strings that respect CSS hexadecimal long notation #RRGGBB[AA] (6/8-digit, long form)
 * where R, G, B, A are in [0-9a-fA-F].
 *
 * ✓ #ffffff, #FFFFFF, #ffffffaa, #FFFFFF00
 * ✗ #FFFFFF0, #fff, FF, KKKKKK
 */
export const HEX_LONG_REGEX = orRegex([HEX_LONG_WITHOUT_ALPHA_REGEX, HEX_LONG_WITH_ALPHA_REGEX])

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
export const HEX_COLOR_REGEX = orRegex([HEX_SHORT_REGEX, HEX_LONG_REGEX])

/**
 * Match strings of length 2 and containing chars in [0-9a-fA-F].
 *
 * ✓ ff, FF, F0
 * ✗ FFF, #FF
 */
export const HEX_ALPHA_REGEX = /[0-9a-f]{2}$/i
