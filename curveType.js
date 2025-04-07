class CurveType {
  constructor(i, direct, curve){
    console.log("i: " + i + ", direct: " + direct + ", curve: " + curve)
    
    this.i = i;
    this.direct = direct;
    this.curve = curve;

    drawText(this.i, inputText[this.i]);

    this.pg = pg[this.i];
    this.heightRatio = width/this.pg.width * this.pg.height;
    
    this.resX = 20;
    this.xSpace = width/(this.resX - 1);
    // this.ySpace = this.heightRatio/cutCount;
    this.ySpace = [];
    this.ySpaceOrg = [];
    this.ySpaceTar = [];
    this.vSpaceHold = [];
    // this.spacer = [];
    // this.spacerTar = [];
    // this.spacerMax = this.direct * 20
    this.spacer = 0;
    this.spacerTar = this.direct * 5;

    this.culmHeight = 0;

    this.vUp = 0.01;
    this.vDown = 0.99;
    if(this.direct == 1){
      this.vUp = 0.99;
      this.vDown = 0.01;
    }
    this.uTicker = [];
    this.uMove = [];
    this.uTickDelay = 1;//2;

    for(var m = 0; m <= cutCount; m++){
      this.ySpace[m] = [];
      this.ySpaceOrg[m] = [];
      this.ySpaceTar[m] = [];
      this.vSpaceHold[m] = [];

      var tk0 = map(m, 0, cutCount, 0, 1);
      var dipIntensity = map(easeInExpo(tk0), 0, 1, dipSize, 0);
      // var dipIntensity = dipSize;

      this.uTicker[m] = m * this.uTickDelay;

      for(var n = 0; n <= this.resX; n++){
        this.ySpaceOrg[m][n] = map(easeInExpo(tk0), 0, 1, this.direct * this.heightRatio, 0);
        this.vSpaceHold[m][n] = this.ySpaceOrg[m][n];

        var tk1 = map(n, 0, this.resX, 0, 2*PI);
        var tk2;
        if(this.direct == 1){
          if(this.curve == 0){
            tk2 = map(cos(tk1), 1, -1, dipIntensity, 0);

          } else if(this.curve == 1){
            tk2 = map(cos(tk1), 1, -1, 0, dipIntensity);

          }
        } else if(this.direct == -1){
          if(this.curve == 0){
            tk2 = map(cos(tk1), 1, -1, -dipIntensity, 0);

          } else if(this.curve == 1){
            tk2 = map(cos(tk1), 1, -1, 0, -dipIntensity);

          }
        }


        this.ySpaceTar[m][n] = this.ySpaceOrg[m][n] + tk2;
      }
    }

    this.ticker = 0;
    this.animWindow = 180;
  }

  run(){
    this.update();
    this.display();
  }

  update(){
    this.ticker ++;

    if(this.ticker < 0){
      this.spacer = 0;
    } else if(this.ticker < this.animWindow){
      var tk0 = map(this.ticker, 0, this.animWindow, 0, 1);
      this.spacer = map(easeInOutExpo(tk0), 0, 1, 0, this.spacerTar) ;

    } else if(this.ticker < this.animWindow * 2){
      var tk0 = map(this.ticker, this.animWindow, this.animWindow * 2, 0, 1);
      this.spacer = map(easeInOutExpo(tk0), 0, 1, this.spacerTar, 0);

    } else {
      this.spacer = 0;

    }

    this.culmHeight = 0;
    for(var m = 0; m <= cutCount; m++){
      if(this.uTicker[m] < 0){
        this.uMove[m] = 0;

      } else if(this.uTicker[m] < this.animWindow){
        var tk0 = map(this.uTicker[m], 0, this.animWindow, 0, 1);
        this.uMove[m] = map(easeInOutExpo(tk0), 0, 1, 0, width);

      } else if(this.uTicker[m] < this.animWindow * 2){
        var tk0 = map(this.uTicker[m], this.animWindow, this.animWindow * 2, 0, 1);
        this.uMove[m] = map(easeInOutExpo(tk0), 0, 1, width, width * 2);

      } else {
        this.uMove[m] = 0;

      }
      this.uTicker[m] ++;

      ////// RES
      for(var n = 0; n <= this.resX; n++){
        if(this.ticker < 0){
          this.ySpace[m][n] = this.ySpaceOrg[m][n];

        } else if(this.ticker < this.animWindow){
          var tk0 = map(this.ticker, 0, this.animWindow, 0, 1);
          this.ySpace[m][n] = map(easeInOutExpo(tk0), 0, 1, this.ySpaceOrg[m][n], this.ySpaceTar[m][n]);

        } else if(this.ticker < this.animWindow * 2){
          var tk0 = map(this.ticker, this.animWindow, this.animWindow * 2, 0, 1);
          this.ySpace[m][n] = map(easeInOutExpo(tk0), 0, 1, this.ySpaceTar[m][n], this.ySpaceOrg[m][n]);

        } else {
          this.ySpace[m][n] = this.ySpaceOrg[m][n];

        }
      }
      this.culmHeight += this.direct * this.spacer;
    }

    if(this.ticker > this.animWindow * 2 + 10){
      for(var m = 0; m <= cutCount; m++){
        this.uTicker[m] = m * this.uTickDelay;
      }
      this.ticker = 0;
    }
  }

  display(){
    push();
      translate(0, this.direct * this.culmHeight);

      if(this.i == 0){            /// FOR TOP HALF
        if(this.direct == 1){
          translate(0, -height/2);

        } else {
          translate(0, 0);

        }
      } else {                    /// FOR BOTTOM HALF
        if(this.direct == 1){
          translate(0, 0);

        } else {
          translate(0, height/2);

        }
      }
      translate(-width/2, this.direct * 3 - this.spacer * 2);

      stroke(255);

      noStroke();
      texture(this.pg);
      for(var m = 0; m < cutCount; m++){
        beginShape(TRIANGLE_STRIP);
          for(var n = 0; n < this.resX; n++){
            var x = n * this.xSpace;

            var yTop = this.ySpace[m][n];
            var yBot = this.ySpace[m + 1][n];

            var thisDist = (x + this.direct * this.uMove[m] + width * 10);
            var u = map(thisDist, 0, width, 0, 1);
            var vTop = map(this.vSpaceHold[m][n], this.direct * this.heightRatio, 0, this.vUp, this.vDown);
            var vBot = map(this.vSpaceHold[m + 1][n], this.direct * this.heightRatio, 0, this.vUp, this.vDown);

            vertex(x, yTop, u, vTop);
            vertex(x, yBot, u, vBot);
          }
        endShape();
        translate(0, -this.spacer);
      }
    pop();
  }

}
