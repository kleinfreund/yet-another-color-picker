const { default: Color } = await import('./node_modules/colorjs.io/dist/color.js')
const convert = (color, format) => (new Color(color)).to(format).toString()

convert('lch(50% 150 180 / 0.5)', 'lab')

/*
lch(25% 50 270 / 0.5) === lab(25 0 -50 / 0.5)

a = c * cos(h * pi / 180) = 50*cos(270*pi/180)
b = c * sin(h * pi / 180) = 50*sin(270*pi/180)

---

lch(0.25 0.33333 0.75 / 0.5)

a = 0.33333 * cos(0.75*2*pi)
b = 0.33333 * sin(0.75*2*pi)

---

lch(0.5 1 0.5 / 0.5)

a =(1*150*cos(0.5*2*pi))/125
a =75*cos(180*pi/180)
*/
