let port;
let writer, reader;
let slider; 
let red, green, blue;
let sensorData = {};
const encoder = new TextEncoder();
const decorder = new TextDecoder();

let activationState = { active: false };

function setup() {
  createCanvas(400, 400);

  

  if ("serial" in navigator) {
    // The Web Serial API is supported.
    let button = createButton("connect");
    button.position(0,0);
    button.mousePressed(connect);

    slider = createSlider(0, 255, 127);
    slider.position(10,50);
    slider.style('width', '100px'); 
  }
}

function keyTyped() {
  if (key === 'a') {
    activationState.active = !activationState.active;
    serialWrite(activationState);
  }
}

function mouseMoved() {
  red = round(map(mouseX,0,width,0,255));
  green = round(map(mouseY,0,height,0,255));
  blue = slider.value();
}

function draw() {
  background(220);

  if (reader) {
    serialRead();
  }

  if (activationState.active) {
    text("cm: " + sensorData.cm, 10, 100);
    text("inches: " + sensorData.inches, 10, 150);
  }

}

function serialWrite(jsonObject) {
  if (writer) {
    writer.write(encoder.encode(JSON.stringify(jsonObject)+"\n"));
  }
}

async function serialRead() {
  while(true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    console.log(value);
    sensorData = JSON.parse(value);
  }
}

async function connect() {
  port = await navigator.serial.requestPort();

  await port.open({ baudRate: 9600 });

  writer = port.writable.getWriter();

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