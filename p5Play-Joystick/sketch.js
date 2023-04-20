let sprite;
let cursorX = 0, cursorY = 0;
let sensorData = {};
let cursorSpeed = 3;
let bgImage;
let bgTiles;
let groundSprite;

function setup() {
  createCanvas(400, 400);
  world.gravity.y = 9.8;

  sprite = new Sprite();
  sprite.diameter = 40;
  sprite.color = 'pink';
  sprite.text = "pdm";
  sprite.layer = 2;
  sprite.friction = 500;
  sprite.bounciness = 0.5;
  sprite.rotationDrag = 5;

  bgTiles = new Group();
  bgTiles.w = 800;
  bgTiles.h = 400;
  bgTiles.image = bgImage;
  bgTiles.tile = "=";
  bgTiles.collider = 'none';
  bgTiles.layer = 1;

  groundSprite = new Group();
  groundSprite.w = 800;
  groundSprite.h = 5;
  groundSprite.tile = "_";
  groundSprite.collider = "static";

  new Tiles(
    [
      '=========='
    ],
    200,
    200,
    bgTiles.w,
    bgTiles.h
  )

  new Tiles(
    [
      '__________'
    ],
    200,
    375,
    groundSprite.w,
    groundSprite.h
  )

  if ("serial" in navigator) {
    // The Web Serial API is supported.
    connectButton = createButton("connect");
    connectButton.position(10, 10);
    connectButton.mousePressed(connect);
  }
}

function preload() {
  bgImage = loadImage('assets/mountains.jpg');
}

function draw() {
  clear();

  serialRead();

  if (sensorData.x)
    cursorX += cursorSpeed * sensorData.x / 512;
  if (sensorData.y)
    cursorY += cursorSpeed * sensorData.y / 512;

  //cursorX = constrain(cursorX, 0, width);
  //cursorY = constrain(cursorY, 0, height);

  let xForce = (sensorData.x / 512) * 2;

  if (sensorData.x != 0)
    sprite.applyImpulse(xForce, 0);
    //sprite.vel.x = cursorX;
  //sprite.vel.y = cursorY;

  camera.x = sprite.x;
}

function serialRead() {
  (async () => {
    while (reader) {
      const { value, done } = await reader.read();
      if (done) {
        reader.releaseLock();
        break;
      }
      try {
        sensorData = JSON.parse(value);
        //console.log(value);
      }
      catch (e) {
        console.log("bad json parse: " + e);
      }
    }
  })();
}

async function connect() {
  port = await navigator.serial.requestPort();
  await port.open({ baudRate: 38400 }); 

  reader = port.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TransformStream(new LineBreakTransformer()))
    .getReader();
 }

 class LineBreakTransformer {
  constructor() {
    // A container for holding stream data until a new line.
    this.chunks = "";
  }
 
  transform(chunk, controller) {
    // Append new chunks to existing chunks.
    this.chunks += chunk;
    // For each line breaks in chunks, send the parsed lines out.
    const lines = this.chunks.split("\n");
    this.chunks = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }
 
  flush(controller) {
    // When the stream is closed, flush any remaining chunks out.
    controller.enqueue(this.chunks);
  }
 }