import { COLOR, RGB, RGBA } from '../types/types';
export declare const color2string: (color: COLOR) => string;
export declare const color2cssString: (color: COLOR) => string;
export declare const hex2rgbOrRgba: (hex: string) => RGB | RGBA;
export declare const hex2rgba: (hex: string, alpha?: number) => RGBA;
export declare const rgb2hex: (rgb: RGB) => string;
export declare const hex2hexWithAlpha: (hex: string, alpha: number) => string;
