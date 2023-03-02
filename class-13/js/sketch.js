let initTone = true;
let pitch = 600

// Set up Tone
let osc = new Tone.AMOscillator(pitch, 'sine', 'sine').start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(pan);
osc.connect(ampEnv);

let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).connect(gain);

let noiseFilter = new Tone.Filter(800, "lowpass").connect(noiseEnv);
noise.connect(noiseFilter)

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  if ((frameCount % 60) === 0) {
    pitch = random(300, 1000);
  }

  text('press spacebar to initialize audio!', 100, 100);

}

function keyPressed() {
  if (keyCode === 32 && initTone === true) {
    console.log('spacebar pressed');
    Tone.start();
    initTone = false;
  }
}

function mousePressed() {
  console.log('pressed');
  ampEnv.triggerAttackRelease('4n');
  osc.frequency.setValueAtTime(pitch+200, '+1');
  ampEnv.triggerAttackRelease('4n', '+1');

  if (mouseY > 200) {
    noiseEnv.triggerAttackRelease(0.5);
  }

}