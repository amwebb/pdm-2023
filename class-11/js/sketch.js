const synth = new Tone.DuoSynth();

let notes = {

  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'

}

function setup() {
  createCanvas(400, 400);
  synth.toDestination();
}

function draw() {
  background(220);
}

function keyPressed() {
  let whatNote = notes[key]
  // console.log(whatNote);
  synth.harmonicity.value = 0.3;
  synth.triggerAttackRelease(whatNote, "8n");
}