// TODO: not only hex
// TODO: choose hue, saturation, ...
// TODO: create a random color similar to another
// Create a random hex
export function getRandomColor() {
    var alphabet = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += alphabet[Math.floor(Math.random() * 16)];
    }
    return color;
}
//# sourceMappingURL=random.js.map