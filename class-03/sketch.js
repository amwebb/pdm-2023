let x = 200;
let y = 200;
let hue = 0;
let sat = 100;
const VALUE = 100;

function setup() {
  let c = createCanvas(400, 400);
  c.position(50,50);
  let c2 = createCanvas(400,400);
  colorMode(HSB);
  angleMode(DEGREES);
  
}

function draw() {
  drawBackground();

  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      x = mouseX;
      y = mouseY;
    } else if (mouseButton === CENTER) {
      y = mouseX;
      x = mouseY;
    } else if (mouseButton === RIGHT) {

    }

    switch(mouseButton) {
      case LEFT:
        break;
      case CENTER:
        break;
    }
  }

  let halfX = width / 2;
  let halfY = height / 2;

  let a = atan2(mouseY - halfY, mouseX - halfX);
  let d = dist(mouseX,mouseY,halfX,halfY);

  sat = d / sqrt(halfX*halfY) * 100;

  // draw face
  hue = a + 180; //mouseX / width * 360;
  //sat = mouseY / height * 100;
  drawFace(x,y);
  drawFace(x+70,y+70);
}

function drawFace(x,y) {
  fill(hue, sat, 100);
  circle(x,y,50);
  fill('black');
  square(x,y-10,5);
  square(x+10,y-10,5);
  square(x+5,y+5,5);
}

function drawBackground() {
  background(0, 0, 0);
}
