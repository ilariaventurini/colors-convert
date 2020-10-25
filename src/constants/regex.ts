/**
 * Match strings that start with #, then 3 or 6 chars [0-9a-f] and optionally 2 chars [0-9a-f].
 *
 * ✓ #ffffff, #FFFFFF, #FFF, #FFFFFF00
 * ✗ FF, KKKKKK
 */
export const HEX_REGEX = /^#(?:([0-9a-f]{3})|([0-9a-f]{6})([0-9a-f]{2})?)$/i

/**
 * Match strings that start with #, then 3 chars [0-9a-f].
 *
 * ✓ #fff, #FFF
 * ✗ #ffffff, #FFFFFF, #FFFFFF00, FF, KKKKKK
 */
export const HEX_SHORT_REGEX = /^#(?:([0-9a-f]{3}))$/i

/**
 * Match strings that start with #, then 6 chars [0-9a-f].
 *
 * ✓ #ffffff, #FFFFFF
 * ✗ #FFFFFF00, FF, KKKKKK
 */
export const HEX_LONG_REGEX = /^#(?:([0-9a-f]{6}))$/i
