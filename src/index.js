// import p5 from 'p5'
//
// let sketch = (s) => {
//     s.setup = () => {
//         s.createCanvas(window.innerWidth, window.innerHeight)
//         s.background(220);
//     }
//
//     s.draw = () => {
//         s.textSize(50);
//         s.text('hello world', 10, 50);
//     }
// }
//
// const P5 = new p5(sketch);
import Matter from 'matter-js'
import {Window} from './window.js'

class App {
    engine = null;
    isAnimating = false;

    constructor() {
        // Set up physics
        this.engine = Matter.Engine.create()
        this.window = new Window("window", this.engine.world)

        this.createBorders();

        // Set up event listeners
        this.specialButton();
        this.helpButton();
        addEventListener("resize", (event) => {
            Matter.World.remove(this.engine.world, [
                this.floorPlane,
                this.leftPlane,
                this.rightPlane,
            ]);
            this.createBorders()
        });

        // Uncomment this to debug physics
        // var render = Matter.Render.create({
        //     element: document.body,
        //     engine: this.engine,
        //     options: {
        //         width: window.innerWidth,
        //         height: window.innerHeight,
        //         showVelocity: true
        //     }
        // });
        // Matter.Render.run(render);
    }

    loop() {
        this.updateCurrentTime();
        if (this.isAnimating) {
            Matter.Engine.update(this.engine, 1000 / 60);
            this.window.updatePositionInLoop()
        }

        requestAnimationFrame(() => this.loop())
    }

    specialButton() {
        document.getElementById("specialButton").onclick = () => {
            this.isAnimating = true;
        };
    }

    helpButton() {
        document.getElementById("helpButton").onclick = () => {
            let xForce = (Math.random() * 50) - 25
            let bounceForce = Matter.Vector.create(xForce, -50)

            Matter.Body.applyForce(this.window.physicsBox, this.window.physicsBox.position, bounceForce)

            let rotationalForceAmount = 100 //(Math.random() * 100) - 25;
            let rotationalForce = Matter.Vector.create(rotationalForceAmount, rotationalForceAmount)
            let angle = this.window.physicsBox.angle
            let posVec = Matter.Vector.create(this.window.physicsBox.position.x - ((this.window.windowDims.width/2) * Math.cos(angle)), this.window.physicsBox.position.y - ((this.window.windowDims.height/2) * Math.cos(angle)))
            Matter.Body.applyForce(this.window.physicsBox, posVec, rotationalForce)
        };
    }

    createBorders() {
        this.floorPlane = Matter.Bodies.rectangle(window.innerWidth/2, window.innerHeight, window.innerWidth, 5, {
            isStatic: true,
            friction: 0.5,
        })
        this.leftPlane = Matter.Bodies.rectangle(window.innerWidth, window.innerHeight/2, 5, window.innerHeight, {
            isStatic: true,
            friction: 0.2,
        })
        this.rightPlane = Matter.Bodies.rectangle(0, window.innerHeight/2, 5, window.innerHeight, {
            isStatic: true,
            friction: 0.2,
        })

        Matter.Composite.add(this.engine.world, [
            this.floorPlane,
            this.leftPlane,
            this.rightPlane,
        ])
    }

    updateCurrentTime() {
        let date = new Date();
        let hh = date.getHours();
        let mm = date.getMinutes();
        let session = "AM";

        if(hh === 0){
            hh = 12;
        }
        if(hh > 12){
            hh = hh - 12;
            session = "PM";
        }

        mm = (mm < 10) ? "0" + mm : mm;

        document.getElementById("time").innerText = hh + ":" + mm + " " + session;
    }

}

const app = new App()
app.loop()