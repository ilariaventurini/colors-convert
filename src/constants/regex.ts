/**
 * Match strings that start with #, then 3 or 6 chars [0-9a-f] and optionally 2 chars [0-9a-f].
 *
 * ✓ #ffffff, #FFFFFF, #FFF, #FFFFFF00
 * ✗ FF, KKKKKK
 */
export const HEX_REGEX = /^#(?:([0-9a-f]{3})|([0-9a-f]{6})([0-9a-f]{2})?)$/i
