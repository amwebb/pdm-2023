// Set up Tone
let nxDial, nxButton;

let synth = new Tone.PolySynth().toDestination();
let dSynth = new Tone.PolySynth().toDestination();

let pattern = new Tone.Pattern(function (time, note) {
  synth.triggerAttackRelease(note, 0.25, time);
}, ['C4', ['D4', 'B3'], 'E4', 'G4']);

const melody = new Tone.Sequence((time, note) => {
	synth.triggerAttackRelease(note, 0.1, time);
	// subdivisions are given as subarrays
}, ['E5', 'D5', 'C5', null, 'D5', 'E5', 'E5', 'E5', null]).start("0:0");

let chords = [
  {"time": "0:0", "note": ["C4", 'E3', "G4"]},
  {"time": "0:3", "note": ["F4", 'A4', "C4"]},
  {"time": "1:1", "note": ["G4", 'A3', "D4"]},
  {"time": "1:2", "note": ["G4", 'B3', "F4"]},
]

let chord = new Tone.Part((time, notes)=>{
  dSynth.triggerAttackRelease(notes.note, '2n', time)
}, chords);

chord.loop = 8;
chord.loopEnd = '2m';


const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();
//play a note every quarter-note
const loopA = new Tone.Loop(time => {
	synthA.triggerAttackRelease("C2", "8n", time);
}, "4n").start(0);
//play another note every off quarter-note, by starting it "8n"
const loopB = new Tone.Loop(time => {
	synthB.triggerAttackRelease("C4", "8n", time);
}, "4n").start("8n");

function setup() {
  createCanvas(400, 400);

  nxDial = Nexus.Add.Dial('#nxUI', {
    'size': [100, 100]
  });

  synthA.volume.value = -9;
  synthB.volume.value = -9;
  synth.volume.value = -2;
  dSynth.volume.value = -5;


  nxButton = Nexus.Add.Button('#nxUI');
  nxButton.on('change', () => {
    Tone.start();
    chord.start('0:0');
    pattern.start(0);
    Tone.Transport.start();
  })
}

function draw() {
  background(220);
}