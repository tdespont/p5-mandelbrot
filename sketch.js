let width = 800;
let height = 800;
let board;
let maxIteration;
let x0;
let x1;
let y0;
let y1;
let new_x0 = 0;
let new_x1 = 0;
let new_y0 = 0;
let new_y1 = 0;
let calculationNeeded;
let updateSelection;


function setup() {
  createCanvas(width, height);
  board = createGraphics(width, height);
  board.pixelDensity(1);
  //board.colorMode(HSB, 255);
  background(255);
  pixelDensity(1);
  maxIteration = 400;
  calculationNeeded = true;
  x0 = -2.5;
  x1 = 1;
  y0 = -1;
  y1 = 1;
  noLoop();
  noFill();
  redraw();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
      maxIteration = maxIteration + 40;
      calculationNeeded = true;
      redraw();
    } else if (keyCode === DOWN_ARROW) {
      maxIteration = maxIteration - 40;
      calculationNeeded = true;
      redraw();
    }
}

function mousePressed() {
  new_x0 = mouseX;
  new_y0 = mouseY;
  updateSelection = true;
}

function mouseReleased() {
  new_x1 = mouseX;
  new_y1 = mouseY;
  var tempX0 = map(new_x0, 0, width, x0, x1);
  var tempX1 = map(new_x1, 0, width, x0, x1);
  var tempY0 = map(new_y0, 0, height, y0, y1);
  var tempY1 = map(new_y1, 0, height, y0, y1);
  x0 = tempX0;
  x1 = tempX1;
  y0 = tempY0;
  y1 = tempY1;
  calculationNeeded = true;
  updateSelection = false;
  redraw();
}

function mouseDragged() {
  new_x1 = mouseX;
  new_y1 = new_y0 + (new_x1 - new_x0);
  updateSelection = true;
  redraw();
}

function computeMandelbrot() {
  var rx = (x1 - x0) / width;
  var ry = (y1 - y0) / height;
  var ri = 255.0 / maxIteration;
  for (var x = 0; x < width; x++) {
    //var a0 = map(x, 0, width, x0, x1);
    var a0 = x0 + x * rx;
    for (var y = 0; y < height; y++) {
      //var b0 = map(y, 0, height, y0, y1);
      var b0 = y0 + y * ry;
      var a = 0.0;
      var b = 0.0;
      var iteration = 0;
      while (/*((a*a + b*b) < 4) &&*/ (iteration < maxIteration)) {
        var atemp = a*a - b*b + a0;
        var btemp = 2*a*b + b0;
        if (a == atemp && b == btemp) {
          iteration = maxIteration;
          break;
        }
        a = atemp;
        b = btemp;
        iteration = iteration + 1;
        if (abs(a+b) > 16) {
          break;
        }
      }
        //board.stroke(map(iteration, 0, maxIteration, 255, 0));
        board.stroke(int(255.0 - iteration * ri));
        board.point(x, y);
    }
  }
  calculationNeeded = false;
}

function drawMandelbrot() {
  image(board, 0, 0, width, height);
}

function draw() {
  if (calculationNeeded) {
    computeMandelbrot();
    drawMandelbrot()
  }
  if (updateSelection) {
    drawMandelbrot();
    stroke(255,0,0);
    rect(new_x0, new_y0, new_x1 - new_x0, new_y1 - new_y0);
  }
}
