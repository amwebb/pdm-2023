let connectButton;
let port;
let writer, reader;
let sliderLED;
let sliderBlue;
let red, green, blue;
let joySwitch;
let sensorData = {};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function setup() {
 createCanvas(400, 400);

 if ("serial" in navigator) {
   // The Web Serial API is supported
   connectButton = createButton("connect");
   connectButton.position(10, 10);
   connectButton.mousePressed(connect);

   sliderLED = createSlider(0, 255, 127);
   sliderLED.position(10, 50);
   sliderLED.style("width", "200px");
 
   sliderBlue = createSlider(0, 255, 127);
   sliderBlue.position(10, 100);
   sliderBlue.style("width", "200px");
 }
}


// function mouseMoved() {
 // }


function draw() {
 background(220);


 if (reader) {
   serialRead();
 }


 if (writer) {
   writer.write(encoder.encode(red + "," + green + "," + blue + "," + joySwitch + "\n"))
   writer.write(new Uint8Array([ sliderLED.value() ]));
 }


 joySwitch = sensorData.Switch;
 red = sensorData.Xaxis;
 green = sensorData.Yaxis;
 blue = sliderBlue.value();


 text("Joystick Switch: " + sensorData.Switch, 10, 150);
 text("Joystick X-axis: " + sensorData.Xaxis, 10, 175);
 text("Joystick Y-axis: " + sensorData.Yaxis, 10, 200);


 push();
 noFill();
 circle(map(red, 0, 255, 0, width), map(green, 0, 255, 0, height), 10);
 pop();
}


async function serialRead() {
 while (true) {
   const { value, done } = await reader.read();
   if (done) {
     reader.releaseLock();
     break;
   }
  //  console.log(value);
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
