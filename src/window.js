import Matter from "matter-js";

export class Window {
    orig = null;
    constructor(extantId, world) {
        this.DOMElement = document.getElementById(extantId)
        this.world = world
        this.physicsBox = null
        // this.windowDims = this.DOMElement.getBoundingClientRect()
        // this.physicsBox = Matter.Bodies.rectangle(this.windowDims.x + (this.windowDims.width/2), this.windowDims.y + (this.windowDims.height/2), this.windowDims.width , this.windowDims.height, {
        //     restitution: 0.7,
        //     density: 0.02,
        // })
        // Matter.Composite.add(this.world, [
        //     this.physicsBox,
        // ])

        this.registerActionListeners()
    }

    registerActionListeners = () => {

        this.DOMElement.querySelector("#closeButton").onclick = () => {
            this.DOMElement.style.display = "none";
        };

        this.DOMElement.querySelector("#minimizeButton").onclick = () => {
            if (this.DOMElement.querySelector("#windowContent").style.display === "none") {
                this.DOMElement.style.width = "auto";
                this.DOMElement.querySelector("#windowContent").style.display = "flex";
            } else {
                this.DOMElement.style.width = "" + document.getElementById("windowHeader").clientWidth + "px"
                this.DOMElement.querySelector("#windowContent").style.display = "none"
            }
        };

        this.DOMElement.querySelector("#resizeButton").onclick = () => {
            if (this.orig === null) {
                this.orig = [
                    this.DOMElement.style.top,
                    this.DOMElement.style.left,
                    this.DOMElement.querySelector("#windowContent").clientWidth,
                    this.DOMElement.querySelector("#windowContent").clientHeight,
                ]
                this.DOMElement.style.top = "30px"
                this.DOMElement.style.left = "15px"
                this.DOMElement.querySelector("#windowContent").style.width = (window.innerWidth - 40) + "px";
                this.DOMElement.querySelector("#windowContent").style.height = (window.innerHeight - 70) + "px";
            } else {
                this.DOMElement.style.top = this.orig[0]
                this.DOMElement.style.left = this.orig[1]
                this.DOMElement.querySelector("#windowContent").style.width = this.orig[2] + "px"
                this.DOMElement.querySelector("#windowContent").style.height = this.orig[3] + "px"
                this.orig = null;
            }
        };

        this.dragElement(this.DOMElement);

        const ro = new ResizeObserver(entries => {
                if (this.physicsBox != null) {
                    Matter.World.remove(this.world, [
                        this.physicsBox
                    ]);
                }

                this.windowDims = this.DOMElement.getBoundingClientRect()
                this.physicsBox = Matter.Bodies.rectangle(this.windowDims.x + (this.windowDims.width / 2), this.windowDims.y + (this.windowDims.height / 2), this.windowDims.width, this.windowDims.height, {
                    restitution: 0.7,
                    density: 0.2,
                })
                Matter.Composite.add(this.world, [
                    this.physicsBox,
                ])
                this.dragElement(this.DOMElement)
        });
        ro.observe(this.DOMElement);
    }

    updatePositionInLoop = () => {
        this.DOMElement.style.top = (this.physicsBox.position.y - (this.windowDims.height/2)) + "px"
        this.DOMElement.style.left = (this.physicsBox.position.x - (this.windowDims.width/2)) + "px"
        this.DOMElement.style.transform = `rotate(${this.physicsBox.angle}rad)`
    }

    dragElement(elmnt) {
        let windowDims = this.windowDims
        let windowPhysicsBox = this.physicsBox
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        this.DOMElement.querySelector("#windowHeader").onmousedown = dragMouseDown;


        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            // windowPhysicsBox.isStatic = true
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            if ((elmnt.offsetTop - pos2) < 28) {
                elmnt.style.top = "28px"
            } else {
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            }

            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

            let posVector = Matter.Vector.create((elmnt.offsetLeft - pos1) + (windowDims.width/2), (elmnt.offsetTop - pos2) + (windowDims.height/2))
            Matter.Body.setPosition(windowPhysicsBox, posVector)

        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

}