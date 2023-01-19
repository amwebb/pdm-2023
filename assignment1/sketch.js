function setup() {
  createCanvas(600, 400);
  colorMode(HSB)
}

function draw() {
  background(255,0,50);

  // drawing the eyes
  ellipse(200,100,50,50);
  ellipse(400,105,50,50);

  push();
  noStroke();
  fill(125,100,100,0.5);
  ellipse(200,100,30,30);
  ellipse(400,105,30,30);

  fill(0);
  ellipse(200,100,10,10);
  ellipse(400,105,10,10);
  pop();
  //fill(255);

  // drawing the nose
  // triangle(300,100,290,200,310,200);
  beginShape();
  vertex(295,100);
  vertex(280,200);
  vertex(300,205);
  vertex(320,200);
  vertex(305,100);
  endShape(CLOSE);

  
  // drawing mouth
  push();
  fill(325,20,90);
  arc(300,220,200,40,0,PI,PIE);
  pop();

  // drawing eyebrows
  push();
  strokeWeight(10);
  strokeCap(SQUARE);
  line(175,65,225,65);
  line(375,70,425,65);
  pop();
}
