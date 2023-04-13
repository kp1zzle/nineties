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

// Make the DIV element draggable:
dragElement(document.getElementById("window"));
currentTime();

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
        if ((elmnt.offsetTop - pos2) < 33) {
            elmnt.style.top = "33px"
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

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;

    let time = hh + ":" + mm + " " + session;

    document.getElementById("time").innerText = time;
    let t = setTimeout(function(){ currentTime() }, 1000);
}