<div align="center" style="text-align: center">
  <img src="./public/peacock.svg" width="90%" style="max-width: 250px">
  
  <h1>Colors convert</h1>
  <div>A simple colors library</div>
</div>

---

Using `colors-convert` you can:

- read colors in different formats
- analyze and manipulate colors
- convert colors into different formats
- give a name to a color
- mix colors
- create random colors.

## How to use

```bash
yarn add colors-convert
```

or

```bash
npm install --save colors-convert
```

## API overview

Go [here]() to take a look at the complete API.
### Color formats

Different color formats are supported: hex, rgb, rgba, hsl, hsla and cmyk.

#### Hex

A valid hex color can be:

- `#rrggbb[aa]`(6/8-digit, long form)
- `#rgb[a]` (3/4-digit, short form)
with `r`, `g`, `b`, `a` in `[0-9a-fA-F]`.

#### Rgb

A valid rgb color is an object like this `{r, g, b}` with `r, b, g` numeric values in `[0, 255]`.

#### Rgba

A valid rgba color is an object like this `{r, g, b, a}` with `r, g, b` numeric values in `[0, 255]` and `a` in `[0, 1]`.

#### Cmyk

A valid cmyk color is an object like this `{c, m, y, k}` with `c, m, y, k` numeric values in `[0, 100]`.

#### Hsl

A valid hsl color is an object like this `{h, s, l}` with:

- `h` (hue): `[0-359]°`
- `s` (saturation): `[0-100]%`
- `l` (lightness): `[0-100]%`.

---

### Conversion

You can convert a color in any format to any other supported format.

| from \ to |     Hex      |     Rgb      |     Rgba      |     Hsl      |     Hsla      |     Cmyk      |
| :-------: | :----------: | :----------: | :-----------: | :----------: | :-----------: | :-----------: |
|  **Hex**  |      \       |  `hexToRgb`  |  `hexToRgba`  |  `hexToHsl`  |  `hexToHsla`  |  `hexToCmyk`  |
|  **Rgb**  |  `rgbToHex`  |      \       |  `rgbToRgba`  |  `rgbToHsl`  |  `rgbToHsla`  |  `rgbToCmyk`  |
| **Rgba**  | `rgbaToHex`  | `rgbaToRgb`  |       \       | `rgbaToHsl`  | `rgbaToHsla`  | `rgbaToCmyk`  |
|  **Hsl**  |  `hslToHex`  |  `hslToRgb`  |  `hslToRgba`  |      \       |  `hslToHsla`  |  `hslToCmyk`  |
| **Hsla**  | `hslaToHex`  | `hslaToRgb`  | `hslaToRgba`  | `hslaToHsl`  |       \       | `hslaToCmyk`  |
| **Cmyk**  | `cmykToHex`  | `cmykToRgb`  | `cmykToRgba`  | `cmykToHsl`  | `cmykToHsla`  |       \       |
| **Color** | `colorToHex` | `colorToRgb` | `colorToRgba` | `colorToHsl` | `colorToHsla` | `colorToCmyk` |

### Specific functions by color format

Then there are more specific color format functions. You can also convert a Color to a redeable string format or a CSS string format.
Go [here]() to take a look at the complete API.

### Other useful functions

- `name(color: Color): string`: given a color (hex, rgb, rgba, hsl, hsla, cmyk), it returns the name of that color. It works using a list of [18315 unique color names](https://api.color.pizza/v1/).

- `mix(colors: Color[], weights?: number[]): rgb`: mix two or more colors based on their weights.

- `randomHex(): HEX`: return a random hex.

# License

[MIT](https://github.com/ilariaventurini/colors-convert/blob/master/LICENSE) © [Ilaria Venturini](https://github.com/ilariaventurini)
