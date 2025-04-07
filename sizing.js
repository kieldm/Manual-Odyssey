function windowResized(){
  resizeForPreview();
}

function resizeForPreview() {
  var tempWidth, tempHeight;
  var conWidth = canvasContainer.offsetWidth;
  var conHeight = canvasContainer.offsetHeight;
  previewScaler = 1;

  if(sizeType == 0){              //////// SQUARE CONFIG
    if(conHeight < conWidth){     // HORIZONTAL BROWSER WINDOW
      if(conHeight < 1080){       // HEIGHT LESS THAN 1080
        tempWidth = conHeight;
        tempHeight = conHeight;
        previewScaler = conHeight/1080;
      } else {
        tempWidth = 1080;
        tempHeight = 1080;
        previewScaler = 1;
      }
    } else {                      // VERTICAL BROWSER WINDOW
      if(conWidth < 1080){        // WIDTH LESS THAN 1080
        tempWidth = conWidth;
        tempHeight = conWidth;
        previewScaler = conWidth/1080;
      } else {
        tempWidth = 1080;
        tempHeight = 1080;
        previewScaler = 1;
      }
    }

  } else if(sizeType == 1){              //////// HORIZONTAL CONFIG
    if(conHeight < conWidth * 9/16){
      if(conHeight < 1080){       // HEIGHT LESS THAN 1080
        tempWidth = conHeight * 16/9;
        tempHeight = conHeight;
        previewScaler = conHeight/1080;
      } else {
        tempWidth = 1920;
        tempHeight = 1080;
        previewScaler = 1;
      }
    } else {
      if(conWidth < 1920){       // HEIGHT LESS THAN 1080
        tempWidth = conWidth;
        tempHeight = conWidth * 9/16;
        previewScaler = conWidth/1920;
      } else {
        tempWidth = 1920;
        tempHeight = 1080;
        previewScaler = 1;
      }
    }

  } else if(sizeType == 2){              //////// VERTICAL CONFIG
    if(conWidth < conHeight * 9/16){
      if(conWidth < 1080){
        tempWidth = conWidth;
        tempHeight = conWidth * 16/9;
        previewScaler = conWidth/1080;
      } else {
        tempWidth = 1080;
        tempHeight = 1920;
        previewScaler = 1;
      }
    } else {
      if(conHeight < 1920){
        tempWidth = conHeight * 9/16;
        tempHeight = conHeight;
        previewScaler = conHeight/1920;
      } else {
        tempWidth = 1080;
        tempHeight = 1920;
        previewScaler = 1;
      }
    }

  } else if(sizeType == 3){              //////// FULL SCREEN
    tempWidth = conWidth;
    tempHeight = conHeight;
    previewScaler = 1;

  } else if(sizeType == 4){              //////// CUSTOM
    if(conWidth < conHeight * customW/customH){
      if(conWidth < customW){
        tempWidth = conWidth;
        tempHeight = conWidth * customH/customW;
        previewScaler = conWidth/customW;
      } else {
        tempWidth = customW;
        tempHeight = customH;
        previewScaler = 1;
      }
    } else {
      if(conHeight < customH){
        tempWidth = conHeight * customW/customH;
        tempHeight = conHeight;
        previewScaler = conHeight/customH;
      } else {
        tempWidth = customW;
        tempHeight = customH;
        previewScaler = 1;
      }
    }

    cwidth = width;
    cheight = height;

  } else if(sizeType == 5){              //////// TO IMAGE
    var thisImage = defaultImage;
    if(userImage){
      console.log("IMAGE SIZED TO UPLOAD");
      thisImage = userImage;
    }
    imageW = thisImage.width;
    imageH = thisImage.height;

    if(conWidth < conHeight * thisImage.width/thisImage.height){
      if(conWidth < thisImage.width){
        tempWidth = conWidth;
        tempHeight = conWidth * thisImage.height/thisImage.width;
        previewScaler = conWidth/thisImage.width;
      } else {
        tempWidth = thisImage.width;
        tempHeight = thisImage.height;
        previewScaler = 1;
      }

    } else {
      if(conHeight < thisImage.height){
        tempWidth = conHeight * thisImage.width/thisImage.height;
        tempHeight = conHeight;
        previewScaler = conHeight/thisImage.height;
      } else {
        tempWidth = thisImage.width;
        tempHeight = thisImage.height;
        previewScaler = 1;
      }
    }
  
  }

  resizeCanvas(tempWidth, tempHeight);

  if(previewScaler != 1){
    document.getElementById('previewScale').style.display = "block";
    document.getElementById('previewScale').innerHTML = "Preview Scaled " + round(previewScaler * 100) + "%";
  } else {
    document.getElementById('previewScale').style.display = "none";
  }

  drawCurves();
}

function resizeForSave() {
  var tempWidth, tempHeight;
  var conWidth = canvasContainer.offsetWidth;
  var conHeight = canvasContainer.offsetHeight;

  previewScaler = 1;

  if(sizeType == 0){                     //////// SQUARE CONFIG
    tempWidth = 1080;
    tempHeight = 1080;

  } else if(sizeType == 1){              //////// HORIZONTAL CONFIG
    tempWidth = 1920;
    tempHeight = 1080;

  } else if(sizeType == 2){              //////// VERTICAL CONFIG
    tempWidth = 1080;
    tempHeight = 1920;

  } else if(sizeType == 3){              //////// FULL SCREEN
    tempWidth = conWidth;
    tempHeight = conHeight;

  } else if(sizeType == 4){              //////// CUSTOM
    tempWidth = customW;
    tempHeight = customH;

  } else if(sizeType == 5){              //////// CUSTOM
    tempWidth = mainGraphic.width;
    tempHeight = mainGraphic.height;

  }

  resizeCanvas(tempWidth, tempHeight);

  console.log("RESIZE FOR SAVE RUN: WIDTH: " + tempWidth + " AND HEIGHT: " + tempHeight);

  drawCurves();
}
