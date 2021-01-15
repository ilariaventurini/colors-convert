import { DELETE_VERSION_2, DEPRECATE_VERSION_2 } from '../../constants/constants'
import { obsolete } from '../../utils/obsolete'
import { HEX } from '../types/types'

// TODO: not only hex
// TODO: choose hue, saturation, ...
// TODO: create a random color similar to another

/**
 * Create a random hex.
 * @returns a random hex color
 */
export function randomHex(): HEX {
  const alphabet = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += alphabet[Math.floor(Math.random() * 16)]
  }
  return color
}
/**
 * Create a random hex.
 * @returns a random hex color
 * @deprecated since version 1.3.0, use `randomHex` instead
 */
export function getRandomColor(): HEX {
  return obsolete(
    randomHex,
    'getRandomColor',
    'randomHex',
    DEPRECATE_VERSION_2,
    DELETE_VERSION_2,
    arguments
  )
}
