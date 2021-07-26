import { hex2rgbOrRgba, hexToRgbOrRgba, stringToColor } from '../dist/esm'

const whiteHex = '#FFFFFF'

console.log('old:', hex2rgbOrRgba(whiteHex))
console.log('new:', hexToRgbOrRgba(whiteHex))
console.log(stringToColor('rgba(0, 1, 2, 0)'))
