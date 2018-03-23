onmessage = function(e) {
  var a0 = e.data[0];
  var b0 = e.data[1];
  var a = 0.0;
  var b = 0.0;
  var iteration = 0;
  while (((a*a + b*b) < 4) && (iteration < maxIteration)) {
    var atemp = a*a - b*b + a0;
    var btemp = 2*a*b + b0;
    if (a == atemp && b == btemp) {
      iteration = maxIteration;
      break;
    }
    a = atemp;
    b = btemp;
    iteration = iteration + 1;
  }
  postMessage(iteration);
  close();
}
