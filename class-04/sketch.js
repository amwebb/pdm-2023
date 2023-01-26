
let characters;

function setup() {
  createCanvas(400, 400);

  characters = [ 
    new Character(100,100,50), 
    new Character(300,300,80),
    //new Character(200,50,30),
    new Character(100,300,100) ];
}

function draw() {
  background(220);

  for(let i=0;i < characters.length;i++) {
    characters[i].draw();
  }
  
}

function mousePressed() {
  for(let i=0;i < characters.length;i++) {
    characters[i].mousePressed();
  }
}

function mouseReleased() {
  for(let i=0;i < characters.length;i++) {
    characters[i].mouseReleased();
  }
  
}

function mouseDragged() {
  for(let i=0;i < characters.length;i++) {
    characters[i].mouseDragged();
  }
}

class Character {
  constructor(x,y,size) {
    this.x = x;
    this.y = y;
    this.size = size;

    // dragging related variables
    this.dragging = false;
    this.dragStartX = -1;
    this.dragStartY = -1;
    this.characterStartX = -1;
    this.characterStartY = -1;
  }

  draw() {
    fill(255);
    square(this.x,this.y,this.size);
    fill(0);
    circle(this.x+10,this.y+10,10);
    circle(this.x+this.size-10,this.y+10,10);
    stroke(0);
    line(this.x+this.size/4,this.y+this.size-15,this.x+this.size-this.size/4,this.y+this.size-15);
  }

  contains(x,y) {
    let insideX = x >= this.x && x <= this.x + this.size;
    let insideY = y >= this.y && y <= this.y + this.size;
  
    console.log("in x:",insideX);
    console.log("in y:",insideY);
    return insideX && insideY;
  }

  mousePressed() {
    let inside = this.contains(mouseX,mouseY);
    //let d = dist(mouseX,mouseY,x,y);
    //let inside = d <= size / 2;
    if (inside) {
      this.dragging = true;
      this.dragStartX = mouseX;
      this.dragStartY = mouseY;
      this.characterStartX = this.x;
      this.characterStartY = this.y;
    }
  }

  mouseDragged() {
    if (this.dragging) {
      this.x = this.characterStartX + (mouseX - this.dragStartX);
      this.y = this.characterStartY + (mouseY - this.dragStartY);
    }
  }

  mouseReleased() {
    if(this.dragging) 
      this.dragging = false;
  }
}
