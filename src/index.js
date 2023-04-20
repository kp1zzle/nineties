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

let orig = null;
setup();
loop();

function setup() {
    dragElement(document.getElementById("window"));
    closeButton();
    minimizeButton();
    resizeButton();
}

function loop() {
    currentTime();

    requestAnimationFrame(() => loop())
}
function closeButton() {
    document.getElementById("closeButton").onclick = function () {
        document.getElementById("window").style.display = "none";
    };
}

function minimizeButton() {
    document.getElementById("minimizeButton").onclick = function () {
        if (document.getElementById("windowContent").style.display === "none") {
            document.getElementById("window").style.width = "auto";
            document.getElementById("windowContent").style.display = "flex";
        } else {
            document.getElementById("window").style.width = "" + document.getElementById("windowHeader").clientWidth + "px"
            document.getElementById("windowContent").style.display = "none"
        }
    };
}

function resizeButton() {
    document.getElementById("resizeButton").onclick = function () {
        if (orig === null) {
            orig = [
                document.getElementById("window").style.top,
                document.getElementById("window").style.left,
                document.getElementById("windowContent").clientWidth,
                document.getElementById("windowContent").clientHeight,
            ]
            document.getElementById("window").style.top = "30px"
            document.getElementById("window").style.left = "15px"
            document.getElementById("windowContent").style.width = (window.innerWidth - 40) + "px";
            document.getElementById("windowContent").style.height = (window.innerHeight - 70) + "px";
        } else {
            console.log(orig)
            document.getElementById("window").style.top = orig[0]
            document.getElementById("window").style.left = orig[1]
            document.getElementById("windowContent").style.width = orig[2] + "px"
            document.getElementById("windowContent").style.height = orig[3] + "px"
            orig = null;
        }

    };
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "Header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
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

    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function currentTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let session = "AM";

    if(hh == 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
    }

    mm = (mm < 10) ? "0" + mm : mm;

    let time = hh + ":" + mm + " " + session;

    document.getElementById("time").innerText = time;
}