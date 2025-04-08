function runSave(){
  print("runSave");
  setRecorder();

  print("record length: " + numFrames);

  // figureNumFrames();

  var span = document.getElementById("numFrame");
  span.textContent = numFrames;

  recording = true;

  // setText();

  toggleRecMessage();
}

function runRecording(){
  if (recording) {
    console.log('recording')
   
    // 3D Renderer
    let offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = encoder.width;
    offscreenCanvas.height = encoder.height;
    let ctx = offscreenCanvas.getContext("2d");
    ctx.drawImage(canvas,0,0);
    if(recordedFrames > 0){
      encoder.addFrameRgba(ctx.getImageData(0, 0, encoder.width, encoder.height).data)
    }

    // 2D Renderer
    // if(recordedFrames > 0){
    //   encoder.addFrameRgba(drawingContext.getImageData(0, 0, encoder.width, encoder.height).data);
    // }

    recordedFrames++

    var span = document.getElementById("recTicker");
    span.textContent = recordedFrames;
  }

  // finalize encoding and export as mp4
  if (recordedFrames === numFrames) {
    recording = false;
    recordedFrames = 0;
    console.log('recording stopped');

    encoder.finalize();
    const uint8Array = encoder.FS.readFile(encoder.outputFilename);
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: 'video/mp4' }));
    anchor.download = encoder.outputFilename;
    anchor.click();
    encoder.delete();

    toggleRecMessage();

    resizeForPreview();
    pixelDensity(thisDensity);
  }
}

function setRecorder(){
  resizeForSave();

  // pixelDensity(1);

  cwidth = round(width/2) * 2;
  cheight = round(height/2) * 2;

  HME.createH264MP4Encoder().then(enc => {
      encoder = enc;
      encoder.outputFilename = 'manual_odyssey';
      encoder.pixelDensity = 2;
      encoder.drawingContext = "webgl";
      encoder.width = cwidth * 2;
      encoder.height = cheight * 2;
      encoder.frameRate = frate;
      encoder.kbps = 100000; // video quality
      encoder.groupOfPictures = 10; // lower if you have fast actions.
      encoder.initialize();
  })
}

function toggleRecMessage(){
  recMessageOn = !recMessageOn;

  if(recMessageOn){
    document.getElementById('recStatus').style.display = "block";
  } else {
    document.getElementById('recStatus').style.display = "none";
  }
}

function runJPGsave(){
  save("manual_odyssey.jpg");
}