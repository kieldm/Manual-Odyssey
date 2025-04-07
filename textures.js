//////////////////////////////////////////////
/////////////////////////////       STRIP
//////////////////////////////////////////////

function drawText(p, inp){   // straight text
  textSize(pgTextSize);
  textFont(tFont[fontSel]);
  var repeatSize = round(textWidth(inp) * 1.1);

  var pgW = repeatSize;
  var pgH = pgTextSize * tFontFactor[fontSel];

  pg[p] = createGraphics(pgW, pgH);
  // pg[p].background(0,0,255);

  pg[p].fill(foreColor);
  pg[p].noStroke();
  pg[p].textSize(pgTextSize);
  pg[p].textAlign(CENTER);
  pg[p].textFont(tFont[fontSel]);
  pg[p].text(inp, pgW/2, pgH/2 + pgTextSize*tFontFactor[fontSel]/2 - pgTextSize * tFontFactorBump[fontSel]);
}