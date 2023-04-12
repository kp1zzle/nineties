import p5 from 'p5'
import p5Svg from "p5.js-svg"

p5Svg(p5);
let sketch = (s) => {
    s.setup = () => {
        s.createCanvas(window.innerWidth, window.innerHeight)
        s.background(220);
    }

    s.draw = () => {
        s.textSize(50);
        s.text('hello world', 10, 50);
    }

    s.export = () => {
        let filename = (new Date).toISOString()
        s.save(filename.concat(".png"))
        s.createCanvas(window.innerWidth, window.innerHeight, s.SVG)
        s.draw()
        s.save(filename.concat(".svg"))
        s.createCanvas(window.innerWidth, window.innerHeight)
        s.draw()
    }
}

const P5 = new p5(sketch);