const canvas_area = document.querySelector(".canvas_area")
var enable_draw = false;
let isResizing = false;
let currentResizer;
let currentParent;
let deletemode = false


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
    if (e.key.toLowerCase() == "Escape"){
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
export_button = document.getElementById("draw")
export_button.addEventListener('click', drawButton)
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
export_button.addEventListener('click', export_values)


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
  
  // downloadString("a,b,c\n1,2,3","myCSV.csv")

function getYoloText(boxes){
    yoloText = ""
    for (let box of boxes){
        label = box.querySelector('.class_label').value
        x1 = parseInt(box.style.left);
        y1 = parseInt(box.style.top);
        w = parseInt(box.style.width);
        h = parseInt(box.style.height) ;
    
        yoloText = yoloText + label + " " + x1 + " " + y1 + " " + w + " " + h + "\n"
    }
    return yoloText
}


function export_values(){
    boxes = document.querySelectorAll(".item")
    const rect = canvas_area.getBoundingClientRect();
    X = rect.left ;
    Y = rect.top ;

    export_text = getYoloText(boxes)
    
    downloadString(export_text, "out.txt")

}



// Image Upload

// var imageLoader = document.getElementById('imageLoader');
// imageLoader.addEventListener('click', handleImage, false);
// var canvas = document.getElementById('imageCanvas');
// var ctx = canvas.getContext('2d');


// function handleImage(e) {
//   console.log('yo')
//   var reader = new FileReader();
//   reader.onload = function(event) {
//     var img = new Image();
//     img.onload = function() {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0);
//     }
//     img.src = event.target.result;
//   }
//   reader.readAsDataURL(e.target.files[0]);
// }

let imgInput = document.getElementById('imageLoader');
imgInput.addEventListener('change', handleImage, false)

function handleImage (e) {
    console.log(e.target.files);
    if(e.target.files) {
      let imageFile = e.target.files[0]; //here we get the image file
      var reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = function (e) {
        var myImage = new Image(); // Creates image object
        myImage.src = e.target.result; // Assigns converted image to image object
        myImage.onload = function(ev) {
          var myCanvas = document.getElementById("imageCanvas"); // Creates a canvas object
          var myContext = myCanvas.getContext("2d"); // Creates a contect object
          myCanvas.width = myImage.width; // Assigns image's width to canvas
          myCanvas.height = myImage.height; // Assigns image's height to canvas
          myContext.drawImage(myImage,0,0); // Draws the image on canvas
        }
      }
    }
  };


