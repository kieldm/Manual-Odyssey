var config;

var inputText = [];
var tFont = [];
var tFontFactor = [];
var tFontFactorBump = [];
var pg = [];
var pgTextSize = 250;
var bkgdColor, foreColor;
var main = []

var topCurve, botCurve;

var saveFileType = 0;

var sizeType = 4;
var previewScaler = 1;

var customW = 1080;
var customH = 1350;

var dipSize = 200;
var cutCount = 13;

var cwidth, cheight;
var thisDensity = 1;
var recMessageOn = false;
var recording = false;
var recordedFrames = 0;
var numFrames = 150;
var frate = 30;

var tAlign = 1;
var tCurve = 0;
var bAlign = -1;
var bCurve = 0;

var fontSel = 0;

var debugToggle = false;

var mainCanvas;
var canvasContainer; 

function preload(){
  tFont[0] = loadFont("resources/Agrandir-TightBlack.ttf");
  tFont[1] = loadFont("resources/TT Bluescreens Trial DemiBold.otf");
  tFont[2] = loadFont("resources/TT Bluescreens Trial Black.otf");
  tFont[3] = loadFont("resources/NeueWorld-SemiCondensedLight.otf");
  tFont[4] = loadFont("resources/NeueWorld-CondensedRegular.otf");
  tFont[5] = loadFont("resources/NeueWorld-CondensedBold.otf");
  tFont[6] = loadFont("resources/Inter-Black.ttf");
  tFont[7] = loadFont("resources/NeueMontreal-Bold.otf");
  tFont[8] = loadFont("resources/RightGrotesk-SpatialBlack.ttf");
  tFont[9] = loadFont("resources/FormulaCondensed-Black.otf");

  tFontFactor[0] = 0.74;  
  tFontFactor[1] = 0.69;  
  tFontFactor[2] = 0.69;  
  tFontFactor[3] = 0.73;  
  tFontFactor[4] = 0.73;  
  tFontFactor[5] = 0.73; 
  tFontFactor[6] = 0.76; 
  tFontFactor[7] = 0.72;  
  tFontFactor[8] = 0.70;  
  tFontFactor[9] = 0.82;  

  tFontFactorBump[0] = 0.01;
  tFontFactorBump[1] = 0.005;
  tFontFactorBump[2] = 0.005;
  tFontFactorBump[3] = 0.0075;
  tFontFactorBump[4] = 0.0075;
  tFontFactorBump[5] = 0.0075;
  tFontFactorBump[6] = 0.02;
  tFontFactorBump[7] = 0.01;
  tFontFactorBump[8] = 0.01;
  tFontFactorBump[9] = 0.01;
}

function setup(){
  canvasContainer = document.getElementById('canvas-container');
  mainCanvas = createCanvas(windowWidth, windowHeight, WEBGL);

  mainCanvas.parent(canvasContainer);

  bkgdColor = color("#ffffff");
  foreColor = color('#000000');

  windowResized();

  thisDensity = pixelDensity();
  cwidth = width;
  cheight = height;

  rectMode(CENTER);
  textureWrap(REPEAT);
  textureMode(NORMAL);
  imageMode(CENTER);

  // frameRate(frate);

  inputText[0] = "EMPTY";
  inputText[1] = "SPACE";

  drawCurves();

}

function draw() {
  background(bkgdColor);

  // stroke(0,255,0);
  // line(-500, 0, 500, 0);

  // noStroke();
  // fill(0);
  // textFont(tFont[6]);
  // textSize(12);
  // text(int(frameRate()), 0, -10);

  topCurve.run();
  botCurve.run();

  runRecording();
}