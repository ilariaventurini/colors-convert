import { hex2rgbOrRgba, hexToRgbOrRgba } from '../dist/esm'

const whiteHex = '#FFFFFF'

console.log('old:', hex2rgbOrRgba(whiteHex))
console.log('new:', hexToRgbOrRgba(whiteHex))
