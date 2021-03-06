const canvas_area = document.querySelector(".canvas_area")
var enable_draw = false;
let isResizing = false;
let currentResizer;
let currentParent;
let deletemode = false
var currentImageName = ""


function drawModeOn(){
    enable_draw = true
    document.body.style.cursor = "crosshair";
    canvas_area.addEventListener('mousedown', newmousedown)
    SidebarRow = document.getElementById('draw');
    SidebarRow.style.backgroundColor = "rgba(53, 42, 182, 0.05)";
}

function drawModeOff(){
    enable_draw = false
    document.body.style.cursor = "default";
    canvas_area.removeEventListener('mousedown', newmousedown)
    SidebarRow = document.getElementById('draw');
    SidebarRow.style.backgroundColor = "#F5F5F5";
}

function deleteModeOn(){
    deletemode = true
    document.body.style.cursor = "not-allowed";
    SidebarRow = document.getElementById('remove_button');
    SidebarRow.style.backgroundColor = "rgba(53, 42, 182, 0.05)";
}

function deleteModeOff(){
    deletemode = false
    document.body.style.cursor = "default";
    SidebarRow = document.getElementById('remove_button');
    SidebarRow.style.backgroundColor = "#F5F5F5";

}

function clearModes(){
    drawModeOff()
    deleteModeOff()
}

function keyChecker(e) {
    if (e.key == "Escape"){
        clearModes()
    }
    else if (["u", "U"].includes(e.key)){
        document.getElementById('imageLoader').click()
    }
    else if (["w", "W"].includes(e.key)){
        if(!enable_draw){clearModes();}
        drawButton();
    }
    else if (["x", "X"].includes(e.key)){
        if(!deletemode){clearModes();}
        removeButton();
    } 
}

function drawButton(){
    if(enable_draw){
        drawModeOff();
    }else{
        drawModeOn();
    }
}

function removeButton(){
    if(deletemode){
        deleteModeOff();
    }else{
        deleteModeOn();
    }
}

// Listeners
draw_button = document.getElementById("draw")
draw_button.addEventListener('click', drawButton)

remove_button = document.getElementById("remove_button")
remove_button.addEventListener('click', removeButton)

document.addEventListener('keyup', keyChecker, false);

// Event Capture

function mousedown(e){

    if(deletemode){
        el = e.target;
        el.remove();
    }

    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

    let prevX = e.clientX;
    let prevY = e.clientY;

    const rect = canvas_area.getBoundingClientRect();
    X = rect.left ;
    Y = rect.top ;

    el = e.target

    function mousemove(e){
        if (!isResizing){
            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;

            const rect = el.getBoundingClientRect();
            el.style.left = rect.left - newX - X+ "px";
            el.style.top = rect.top - newY - Y+ "px";

            prevX = e.clientX;
            prevY = e.clientY;
        }

    }

    function mouseup(){
        window.removeEventListener('mousemove', mousemove)
        window.removeEventListener('mouseup', mouseup)

    }
}


function resizable (el, factor) {
    var int = Number(factor) || 7.7;
    function resize() {el.style.width = ((el.value.length+1) * int) + 'px'}
    var e = 'keyup,keypress,focus,blur,change'.split(',');
    for (var i in e) el.addEventListener(e[i],resize,false);
    resize();
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

    const rect = canvas_area.getBoundingClientRect();
    X = rect.left ;
    Y = rect.top ;
    
    let newBoxX1 = e.clientX - X;
    let newBoxY1 = e.clientY - Y;

    boxdiv.style.left = newBoxX1  + "px";
    boxdiv.style.top = newBoxY1 + "px";

    canvas_area.appendChild(boxdiv)
    

    function newmousemove(e){
        boxdiv.style.width = e.clientX - newBoxX1 - X+ "px";
        boxdiv.style.height = e.clientY - newBoxY1 - Y +  "px";

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
        
        resizable(txt, 7)
        txt.focus()

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

    const canrect = canvas_area.getBoundingClientRect();
    X = canrect.left ;
    Y = canrect.top ;

    function resmousemove(e){
        const rect = currentParent.getBoundingClientRect()
        if (currentResizer.classList.contains('se')){
            currentParent.style.width = rect.width - (prevX - e.clientX) + "px";
            currentParent.style.height = rect.height - (prevY - e.clientY) + "px";
        } else if (currentResizer.classList.contains("sw")) {
            currentParent.style.width = rect.width + (prevX - e.clientX) + "px";
            currentParent.style.height = rect.height - (prevY - e.clientY) + "px";
            currentParent.style.left = rect.left - (prevX - e.clientX) - X + "px";
        } else if (currentResizer.classList.contains("ne")) {
            currentParent.style.width = rect.width - (prevX - e.clientX) + "px";
            currentParent.style.height = rect.height + (prevY - e.clientY) + "px";
            currentParent.style.top = rect.top - (prevY - e.clientY) -Y + "px";
          } else {
            currentParent.style.width = rect.width + (prevX - e.clientX) + "px";
            currentParent.style.height = rect.height + (prevY - e.clientY) + "px";
            currentParent.style.top = rect.top - (prevY - e.clientY) - Y+ "px";
            currentParent.style.left = rect.left - (prevX - e.clientX) -X+ "px";
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
export_button.addEventListener('click', exportOpenForm)

yolo_export_button = document.getElementById("YoloExport")
yolo_export_button.addEventListener('click', ExportYolo)


function downloadString(text, fileName) {
    var blob = new Blob([text], { type: "text/csv" });
    var a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = ["text/csv", a.download, a.href].join(':');
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
  }
  
  

function ExportYolo(){
    console.log('exporting')
    boxes = document.querySelectorAll(".item")
    var myCanvas = document.getElementById("imageCanvas");
    var H = myCanvas.height;
    var W = myCanvas.width
    yoloText = ""
    for (let box of boxes){
        label = box.querySelector('.class_label').value
        x1 = parseInt(box.style.left);
        y1 = parseInt(box.style.top);
        w = parseInt(box.style.width);
        h = parseInt(box.style.height) ;
        dw = 1/W;
        dh = 1/H;
        x = (x1 + x1 + w)/2;
        y = (y1+ y1 + h)/2;
        x = x*dw;
        w = w*dw;
        y = y*dh;
        h = h*dh;
        console.log(H, W, dw, dh,x,y)
        yoloText = yoloText + label + " " + x.toFixed(6) + " " + y.toFixed(6) + " " + w.toFixed(6) + " " + h.toFixed(6) + "\n"
    }
    if (yoloText.length){
        downloadString(yoloText, currentImageName + ".txt")
    }else{
        console.log("nothing")
    }
    exportCloseForm()
}



// Image upload

let imgInput = document.getElementById('imageLoader');
imgInput.addEventListener('change', handleImage, false)

function handleImage (e) {
    if(e.target.files) {
      let imageFile = e.target.files[0]; //here we get the image file
      currentImageName = imageFile.name.split('.').slice(0, -1).join('.')
      var reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = function (e) {
        var myImage = new Image(); // Creates image object
        myImage.src = e.target.result; // Assigns converted image to image object
        myImage.onload = function(ev) {
          var myCanvas = document.getElementById("imageCanvas"); // Creates a canvas object
          var backCanvas = document.getElementById("canvas_area");
          var myContext = myCanvas.getContext("2d"); // Creates a contect object
          myCanvas.width = myImage.width ; // Assigns image's width to canvas
          myCanvas.height = myImage.height; // Assigns image's height to canvas

          backCanvas.style.width = myImage.width + "px"; 
          backCanvas.style.height = myImage.height + "px"; 
            
          myContext.drawImage(myImage,0,0); // Draws the image on canvas
        }
      }
    }
  };


// POPUP
  function exportOpenForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("all_back").style.opacity = "0.4";
  }
  
  function exportCloseForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("all_back").style.opacity = "1";
  }


