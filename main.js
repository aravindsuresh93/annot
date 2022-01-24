const canvas_area = document.querySelector(".canvas_area")
var enable_draw = false;
let isResizing = false;
let currentResizer;
let currentParent;



function drawModeOn(){
    enable_draw = true
    document.body.style.cursor = "crosshair";
    canvas_area.addEventListener('mousedown', newmousedown)
}

function drawModeOff(){
    enable_draw = false
    document.body.style.cursor = "default";
    canvas_area.removeEventListener('mousedown', newmousedown)
}

function switchDrawMode(e) {
    if (e.key === 'w' && enable_draw == false) {
        drawModeOn()
    }
    else if (e.key === 'w' && enable_draw == true) {
        drawModeOff()
    }
}

document.addEventListener('keyup', switchDrawMode, false);

function mousedown(e){
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

    let prevX = e.clientX;
    let prevY = e.clientY;

    el = e.target

    function mousemove(e){
        if (!isResizing){
            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;

            const rect = el.getBoundingClientRect();
            el.style.left = rect.left - newX + "px";
            el.style.top = rect.top - newY + "px";

            prevX = e.clientX;
            prevY = e.clientY;
        }

    }

    function mouseup(){
        window.removeEventListener('mousemove', mousemove)
        window.removeEventListener('mouseup', mouseup)

    }
}


function newmousedown(e){
    window.addEventListener('mousemove', newmousemove);
    window.addEventListener('mouseup', newmouseup);

    ne = document.createElement('div');
    ne.className = "resizer ne";

    nw = document.createElement('div');
    nw.className = "resizer nw";

    sw = document.createElement('div');
    sw.className = "resizer sw";

    se = document.createElement('div');
    se.className = "resizer se";

    txt = document.createElement('input');
    txt.className = "class_label"

    del = document.createElement('i');
    del.className = "material-icons delbutton"
    del.textContent = "delete"

    boxdiv = document.createElement('div');
    boxdiv.className = 'item';

    boxdiv.appendChild(ne);
    boxdiv.appendChild(nw);
    boxdiv.appendChild(se);
    boxdiv.appendChild(sw);
    boxdiv.appendChild(txt);
    

    let newBoxX1 = e.clientX;
    let newBoxY1 = e.clientY;

    boxdiv.style.left = newBoxX1  + "px";
    boxdiv.style.top = newBoxY1 + "px";

    canvas_area.appendChild(boxdiv)

    function newmousemove(e){
        boxdiv.style.width = e.clientX - newBoxX1 + "px";
        boxdiv.style.height = e.clientY - newBoxY1  +  "px";

        newBoxX = e.clientX;
        newBoxY = e.clientY;

    }

    function newmouseup() {
        ne.addEventListener('mousedown', resmousedown)
        nw.addEventListener('mousedown', resmousedown)
        se.addEventListener('mousedown', resmousedown)
        sw.addEventListener('mousedown', resmousedown)

        boxdiv.appendChild(del);
        del.addEventListener('click', removeitem)
        
        boxdiv.addEventListener('mousedown', mousedown)
        window.removeEventListener('mousemove', newmousemove)
        window.removeEventListener('mouseup', newmouseup)

        drawModeOff()

    }

}

// Function to remove boxes
function removeitem(e){
    el = e.target.parentNode;
    el.remove();
}


// Function to enable resize functionality
function resmousedown(e){
    currentResizer = e.target;
    isResizing = true;
    currentParent = e.target.parentNode;
    console.log(currentResizer, currentParent)

    let prevX = e.clientX;
    let prevY = e.clientY;
    window.addEventListener('mousemove', resmousemove);
    window.addEventListener('mouseup', resmouseup);

    function resmousemove(e){
        const rect = currentParent.getBoundingClientRect()
        if (currentResizer.classList.contains('se')){
            console.log('se', rect.width, prevX, e.clientX)
            currentParent.style.width = rect.width - (prevX - e.clientX) + "px";
            currentParent.style.height = rect.height - (prevY - e.clientY) + "px";
        } else if (currentResizer.classList.contains("sw")) {
            currentParent.style.width = rect.width + (prevX - e.clientX) + "px";
            currentParent.style.height = rect.height - (prevY - e.clientY) + "px";
            currentParent.style.left = rect.left - (prevX - e.clientX) + "px";
        } else if (currentResizer.classList.contains("ne")) {
            currentParent.style.width = rect.width - (prevX - e.clientX) + "px";
            currentParent.style.height = rect.height + (prevY - e.clientY) + "px";
            currentParent.style.top = rect.top - (prevY - e.clientY) + "px";
          } else {
            currentParent.style.width = rect.width + (prevX - e.clientX) + "px";
            currentParent.style.height = rect.height + (prevY - e.clientY) + "px";
            currentParent.style.top = rect.top - (prevY - e.clientY) + "px";
            currentParent.style.left = rect.left - (prevX - e.clientX) + "px";
          }


        prevX = e.clientX;
        prevY = e.clientY;

    }

    function resmouseup(){
        isResizing = false
        window.removeEventListener('mousemove', resmousemove);
        window.removeEventListener('mouseup', resmouseup);

    }
}


export_button = document.getElementById("export")
export_button.addEventListener('click', export_values)

function export_values(){
    boxes = document.querySelectorAll(".item")
    const rect = canvas_area.getBoundingClientRect();
    X = rect.top ;
    Y = rect.left ;
    console.log(X,Y)
    for (let box of boxes){
        label = box.querySelector('.class_label').value
        x1 = parseInt(box.style.left) - X;
        y1 = parseInt(box.style.top) - Y;
        w = box.style.width;
        h = box.style.height ;
        console.log('x1',x1,'y1',y1,'w',w,'h',h, label)
    }

}




