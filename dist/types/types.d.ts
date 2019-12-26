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
export declare type HSL = {
    h: number;
    s: number;
    l: number;
};
export declare type COLOR = HEX | RGB | RGBA | CMYK | HSL;
