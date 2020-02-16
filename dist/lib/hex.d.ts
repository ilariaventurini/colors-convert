import { HEX, RGB, RGBA, CMYK, HSL } from '../types/types';
export declare function hex2rgbOrRgba(hex: HEX): RGB | RGBA;
export declare function hex2rgba(hex: HEX, alpha?: number): RGBA;
export declare function hex2hexWithAlpha(hex: HEX, alpha: number): HEX;
export declare function hex2cmyk(hex: HEX): CMYK;
export declare function hex2hsl(hex: HEX): HSL;
