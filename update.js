function drawCurves(){
  topCurve = new CurveType(0, tAlign, tCurve);      /// INDEX, DIRECT, ALIGN
  botCurve = new CurveType(1, bAlign, bCurve);

  console.log(tCurve)
}

function setText(index, val){
  inputText[index]= val;

  drawCurves();
}

function setDipSize(val){
  dipSize = map(val, 0, 100, 10, 400);

  drawCurves();
}

function setCutCount(val){
  cutCount = int(map(val, 0, 100, 2, 20));

  drawCurves();
}

function setBkgdMode(val){
  bkgdMode = val;

  if(bkgdMode == 0){
    document.getElementById("colorBkgdSettings").style.display = "block";
    document.getElementById("imageBkgdSettings").style.display = "none";
    
  } else {
    document.getElementById("colorBkgdSettings").style.display = "none";
    document.getElementById("imageBkgdSettings").style.display = "block";
    
  }
}

function setTextFont(val){
  fontSel = val;

  drawCurves();
}

function setAlignType(index, val){
  if(index == 0){
    console.log("TOP ALIGN CHANGED: " + val)
    tAlign = val;
  } else {
    console.log("BOT ALIGN CHANGED: " + val)
    bAlign = val;
  }

  drawCurves();
}

function setCurveType(index, val){
  if(index == 0){
    console.log("TOP CURVE CHANGED: " + val)
    tCurve = val;
  } else {
    console.log("BOT CURVE CHANGED: " + val)
    bCurve = val;
  }

  drawCurves();
}

function setCanvasSize(val){
  sizeType = val;

  if(val == 4){
    document.getElementById("customSizeInputs").style.display = "flex";
  } else {
    document.getElementById("customSizeInputs").style.display = "none"; 
  }

  if(val == 5){
    runUserReset();
  }

  windowResized();
}

function setCustomW(val){
  customW = val;

  windowResized();
}

function setCustomH(val){
  customH = val;

  windowResized();
}

function setBkgdColor(val){
  bkgdColor = color(val);
}

function runUserReset(){
  userSize = 1;
  document.getElementById("userSize").value = map(1, 0.25, 4, 0, 100);
  userXoffset = 0;
  document.getElementById("userXoffset").value = 50;
  userYoffset = 0;
  document.getElementById("userYoffset").value = 50;

  console.log("RESET RUN");

}

function setAnimWin(val){
  animWin = int(map(val, 0, 100, 3, 20));
}

//////////////////////////////////////////////////////////////////////// UPLOAD OPTIONS

function uploadBkgdImage(){
  const selectedFile = document.getElementById('bkgdImageUpload');
  const myImageFile = selectedFile.files[0];
  let urlOfImageFile = URL.createObjectURL(myImageFile);
  pgImage = loadImage(urlOfImageFile, () => {image(pgImage, 0, 0)});

  document.getElementById('uploadedBkgdImage').innerHTML = selectedFile.files[0].name;
  document.getElementById('uploadedBkgdImage').style.display = "block";

  print("width? " + pgImage.width + " & height? " + pgImage.height)
}

// function setUploadImage(inputElement) {
//   const selectedFile = document.getElementById('uploadImage');
//   const file = selectedFile.files[0];
  
//   if (file) {
//       // fileName.textContent = file.name;
      
//       // Create object URL from the file
//       const fileURL = URL.createObjectURL(file);
//       console.log('Created file URL:', fileURL);
      
//       // First disable the current userImg
//       userImage = null;
//       imageLoaded = false;
      
//       // Then load the new image, with a small delay to ensure proper loading
//       setTimeout(() => {
//           loadImage(fileURL, function(loadedImg) {
//               if (loadedImg && loadedImg.width > 1) {
//                   userImage = loadedImg;
//                   imageLoaded = true;
//                   // Log the dimensions to verify they're loaded correctly
//                   console.log('Loaded image dimensions:', loadedImg.width, 'x', loadedImg.height);
              
//                   windowResized();

//                   makeGraphic();
//                   makeDots();

//                   document.getElementById('uploadedImage').innerHTML = selectedFile.files[0].name;
//                   document.getElementById('uploadedImage').style.display = "block";

//                 } else {
//                   console.error('Image loaded but with invalid dimensions:', 
//                       loadedImg ? `${loadedImg.width}x${loadedImg.height}` : 'undefined');
//               }
//               // Revoke the object URL to free memory
//               URL.revokeObjectURL(fileURL);
//           }, function(e) {
//               // Error callback
//               console.error('Error loading image:', e);
//               URL.revokeObjectURL(fileURL);
//           });
//       }, 100);
//   }
// }

//////////////////////////////////////////////////////////////////////// EXPORT OPTIONS

function setSaveFileType(val){
  saveFileType = val;

  if(animateToggle){
    if(val == 0 || val == 1 || val == 3){
      document.getElementById("animateToggle").checked = false;
      setAnimateToggle();
      
    }
  }

  if(val == 0 || val == 3){
    document.getElementById("alphaBkgdOption").style.display = "flex";

  } else {
    document.getElementById("alphaBkgdOption").style.display = "none";

    document.getElementById("alphaBkgdToggle").checked = false;
  }

  if(val == 2){
    document.getElementById("motionOptions").style.display = "flex";

    if(animateToggle == false){
      animateToggle = true;
      // document.getElementById("animateOption").style.display = "block";

    }

  } else {
    document.getElementById("motionOptions").style.display = "none";

  }
}

function runExport(){
  if(saveFileType == 2){
    ticker = 0;
    
    runSave();        ////////// in recording.js

  } else {
    staticSaving = true;

    resizeForSave();

    if(saveFileType == 0){
      console.log("SAVE PNG! W: " + width + ", H: " + height);
      save('manual_odyssey.png');

    } else if(saveFileType == 1){
      console.log("SAVE JPG! W: " + width + ", H: " + height);
      save('manual_odyssey.jpg');

    }
  
    staticSaving = false;

    resizeForPreview();
  }
}

function restoreCanvas() {
  // Store current canvas dimensions
  var w = width;
  var h = height;
  
  // Create a new regular canvas
  currentRenderer = 'p2d';
  mainCanvas = createCanvas(w, h);
  mainCanvas.parent(canvasContainer);
  
  // Force a redraw
  redraw();
  windowResized();
}