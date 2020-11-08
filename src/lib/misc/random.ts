import { HEX } from '../types/types'

// TODO: not only hex
// TODO: choose hue, saturation, ...
// TODO: create a random color similar to another
// Create a random hex
export function getRandomColor(): HEX {
  const alphabet = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += alphabet[Math.floor(Math.random() * 16)]
  }
  return color
}
