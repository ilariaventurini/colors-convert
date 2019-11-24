export declare type HEX = string;
export declare type RGB = {
    r: number;
    g: number;
    b: number;
};
export declare type RGBA = {
    r: number;
    g: number;
    b: number;
    a: number;
};
export declare type CMYK = {
    c: number;
    m: number;
    y: number;
    k: number;
};
export declare type COLOR = HEX | RGB | RGBA | CMYK;
export declare function isHex(color: any): color is HEX;
export declare function isRgb(color: any): color is RGB;
export declare function isRgba(color: any): color is RGBA;
export declare function isCmyk(color: any): color is CMYK;
export declare function isColor(color: any): color is COLOR;
