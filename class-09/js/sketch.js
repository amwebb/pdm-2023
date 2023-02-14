
let sound1 = new Tone.Player("sounds/chicken.wav");

let sounds = new Tone.Players({

  "nuggets": "sounds/chicken.wav",
  "drop": "sounds/water.mp3",
  "duct": "sounds/ductTape.wav"

})

let button1, button2, button3;

function setup() {
  createCanvas(400, 400);

  sounds.toDestination();
  sound1.toDestination();

  button1 = createButton('What else do you have?');
  button1.position(50, 50);
  button1.mousePressed(() => buttonSound("nuggets"));

  button2 = createButton('Water');
  button2.position(50, 100);
  button2.mousePressed(() => buttonSound("drop"));

  button3 = createButton('How will we fix these shoes?');
  button3.position(50, 150);
  button3.mousePressed(() => buttonSound("duct"));
}

function draw() {
  background(220);
}

// function keyPressed() {
//   if(key === "1") {
//     sound1.playbackRate = (mouseY /200) + 0.01;
//     sound1.start();
//   }
// }

function buttonSound(whichSound) {
  if(whichSound === "nuggets") {
    sounds.player("nuggets").start();
  } else if(whichSound === "drop") {
    sounds.player("drop").start();
  } else if(whichSound === "duct") {
    // sound1.playbackRate = (mouseY /200) + 0.01;
    sounds.player("duct").start();
  }
}