let spriteSheet;
let chronoSheet;

let walkingAnimation;
let walkingAnimation2;
let chronoAnimation;

let spriteSheetFilenames = ["SpelunkyGuy.png", "Green.png", "Cyclops.png"];
let spriteSheets = [];
let totalAnimations = 10;
let animations = [];

function preload() {
  for(let i=0; i < spriteSheetFilenames.length; i++) {
    spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
  }
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);

  for(let i=0; i < totalAnimations; i++) {
    animations[i] = new WalkingAnimation(random(spriteSheets),80,80,random(100,300),random(100,300),9,random(0.5,1),6);
  }
}

function draw() {
  background(220);
  
  for(let i=0; i < animations.length; i++) {
    animations[i].draw();
  }
}

function mousePressed() {
  for (let i=0; i < animations.length; i++) {
    let contains = animations[i].contains(mouseX,mouseY);
    if (contains) {
      if (animations[i].moving != 0)
        animations[i].stop();
      else {
        if (animations[i].xDirection === 1)
          animations[i].moveRight();
        else
          animations[i].moveLeft();
      }
    }
  }
}

class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength, speed, framerate, offsetX = 0, offsetY = 0) {
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.speed = speed;
    this.framerate = framerate*speed;
  }

  draw() {

    // if (this.moving != 0)
    //   this.u = this.currentFrame % this.animationLength;
    // else
    //   this.u = 0;

    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : 0;
    push();
    translate(this.dx,this.dy);
    rotate(90);
    scale(this.xDirection,1);
    

    rect(-26,-35,50,70);

    image(this.spritesheet,0,0,this.sw,this.sh,this.u*this.sw+this.offsetX,this.v*this.sh+this.offsetY,this.sw,this.sh);
    pop();
    let proportionalFramerate = round(frameRate() / this.framerate);
    if (frameCount % proportionalFramerate == 0) {
      this.currentFrame++;
    }
  
    this.dx += this.moving*this.speed;

    if (this.dx > width - this.sw / 4) {
      this.moveLeft();
    } else if (this.dx < this.sw / 4) {
      this.moveRight();
    }
  }

  moveRight() {
    this.moving = 1;
    this.xDirection = 1;
  }

  moveLeft() {
    this.moving = -1;
    this.xDirection = -1;
  }

  keyPressed(right, left) {
    if (keyCode === right) {
      
      this.currentFrame = 1;
    } else if (keyCode === left) {

      this.currentFrame = 1;
    }
  }

  keyReleased(right,left) {
    if (keyCode === right || keyCode === left) {
      this.moving = 0;
    }
  }

  contains(x,y) {
    //rect(-26,-35,50,70);
    let insideX = x >= this.dx - 26 && x <= this.dx + 25;
    let insideY = y >= this.dy - 35 && y <= this.dy + 35;
    return insideX && insideY;
  }

  stop() {
    this.moving = 0;
  }
}