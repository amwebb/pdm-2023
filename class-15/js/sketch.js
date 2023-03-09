// Set up Tone
let nxDial, nxButton;

let midi;

let synth = new Tone.PolySynth().toDestination();
let dSynth = new Tone.PolySynth();

let lowPass = new Tone.Filter(800, "lowpass").toDestination();

dSynth.connect(lowPass);

let pattern = new Tone.Pattern((time, note) => {
  // synth.triggerAttackRelease(note, 0.25, time);
}, ['C4', 'D4', 'E4', 'G4', 'A4']);

let melody = new Tone.Sequence((time, note) => {
  if (note != null) {
    synth.triggerAttackRelease(note, '8n', time);
  }
}, ['E5', 'D5', 'C5', null, 'D5', 'E5', null, 'F5', 'E5']);

let chords = [
  { "time": "0:0", "note": ["C4", "E3", "G4"] },
  { "time": "0:3", "note": ["F4", "A4", "C4"] },
  { "time": "1:1", "note": ["G4", "A3", "D4"] },
  { "time": "1:2", "note": ["G4", "B4", "F4"] }
]

let chord = new Tone.Part((time, notes) => {
  dSynth.triggerAttackRelease(notes.note, '2n', time)
}, chords)

chord.loop = 8;
chord.loopEnd = '2m';

// create two monophonic synths
const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();
//play a note every quarter-note
const loopA = new Tone.Loop((time) => {
  synthA.triggerAttackRelease("C2", "8n", time);
}, "4n").start(0);
//play another note every off quarter-note, by starting it "8n"
const loopB = new Tone.Loop((time) => {
  synthB.triggerAttackRelease("C4", "8n", time);
}, "4n").start('8n');
// the loops start when the Transport is started

Tone.Transport.bpm.value = 90;

function setup() {
  createCanvas(400, 400);

  nxDial = Nexus.Add.Dial('#nxUI', {
    'size': [200, 200],
    'min': 100,
    'max': 4000,
    'step': 20,
    'value': 1050
  });
  nxDial.on('change', (v) => {
    // console.log(v);
    lowPass.frequency.value = v;
  })

  synthA.volume.value = -9;
  synthB.volume.value = -9;
  synth.volume.value = -2;
  dSynth.volume.value = -5;


  nxButton = Nexus.Add.Button('nxUI');
  nxButton.on('change', () => {
    // Tone.start();
    // // pattern.start(0);
    // chord.start("0:0");
    // melody.start(0);
    // Tone.Transport.start();
    playMidi();
  })
}
function playMidi() {
// const name = midi.name
//get the tracks
zelda.tracks.forEach(track => {
  //tracks have notes and controlChanges

  //notes are an array
  const notes = track.notes
  notes.forEach(note => {
    //note.midi, note.time, note.duration, note.name
    synth.triggerAttackRelease(note.name, note.duration, note.time)
  })

  // //the control changes are an object
  // //the keys are the CC number
  // track.controlChanges[64]
  // //they are also aliased to the CC number's common name (if it has one)
  // track.controlChanges.sustain.forEach(cc => {
  //   // cc.ticks, cc.value, cc.time
  // })

  //the track also has a channel and instrument
  //track.instrument.name
})}

function draw() {
  background(220);
}

let zelda = {
  "header": {
    "keySignatures": [
      {
        "key": "Db",
        "scale": "major",
        "ticks": 0
      }
    ],
    "meta": [],
    "name": "",
    "ppq": 1024,
    "tempos": [
      {
        "bpm": 87.9997653339591,
        "ticks": 0
      },
      {
        "bpm": 87.9997653339591,
        "ticks": 0
      },
      {
        "bpm": 87.94868487399886,
        "ticks": 0
      },
      {
        "bpm": 87.9997653339591,
        "ticks": 122880
      },
      {
        "bpm": 87.94868487399886,
        "ticks": 122880
      }
    ],
    "timeSignatures": [
      {
        "ticks": 0,
        "timeSignature": [
          4,
          4
        ],
        "measures": 0
      }
    ]
  },
  "tracks": [
    {
      "channel": 0,
      "controlChanges": {
        "6": [
          {
            "number": 6,
            "ticks": 4,
            "time": 0.0026649062499999997,
            "value": 0.09448818897637795
          },
          {
            "number": 6,
            "ticks": 4,
            "time": 0.0026649062499999997,
            "value": 0.09448818897637795
          },
          {
            "number": 6,
            "ticks": 122884,
            "time": 81.86858490624999,
            "value": 0.09448818897637795
          },
          {
            "number": 6,
            "ticks": 122884,
            "time": 81.86858490624999,
            "value": 0.09448818897637795
          }
        ],
        "7": [
          {
            "number": 7,
            "ticks": 0,
            "time": 0,
            "value": 0.7952755905511811
          },
          {
            "number": 7,
            "ticks": 0,
            "time": 0,
            "value": 0.8031496062992126
          },
          {
            "number": 7,
            "ticks": 0,
            "time": 0,
            "value": 0.8661417322834646
          },
          {
            "number": 7,
            "ticks": 10,
            "time": 0.006662265624999999,
            "value": 0.8031496062992126
          },
          {
            "number": 7,
            "ticks": 10,
            "time": 0.006662265624999999,
            "value": 0.8661417322834646
          },
          {
            "number": 7,
            "ticks": 122880,
            "time": 81.86591999999999,
            "value": 0.8031496062992126
          },
          {
            "number": 7,
            "ticks": 122880,
            "time": 81.86591999999999,
            "value": 0.8661417322834646
          },
          {
            "number": 7,
            "ticks": 122890,
            "time": 81.87258226562498,
            "value": 0.8031496062992126
          },
          {
            "number": 7,
            "ticks": 122890,
            "time": 81.87258226562498,
            "value": 0.8661417322834646
          }
        ],
        "10": [
          {
            "number": 10,
            "ticks": 0,
            "time": 0,
            "value": 0.5039370078740157
          }
        ],
        "38": [
          {
            "number": 38,
            "ticks": 5,
            "time": 0.0033311328124999997,
            "value": 0
          },
          {
            "number": 38,
            "ticks": 5,
            "time": 0.0033311328124999997,
            "value": 0
          },
          {
            "number": 38,
            "ticks": 122885,
            "time": 81.8692511328125,
            "value": 0
          },
          {
            "number": 38,
            "ticks": 122885,
            "time": 81.8692511328125,
            "value": 0
          }
        ],
        "100": [
          {
            "number": 100,
            "ticks": 3,
            "time": 0.0019986796875,
            "value": 0
          },
          {
            "number": 100,
            "ticks": 3,
            "time": 0.0019986796875,
            "value": 0
          },
          {
            "number": 100,
            "ticks": 122883,
            "time": 81.86791867968749,
            "value": 0
          },
          {
            "number": 100,
            "ticks": 122883,
            "time": 81.86791867968749,
            "value": 0
          }
        ],
        "101": [
          {
            "number": 101,
            "ticks": 3,
            "time": 0.0019986796875,
            "value": 0
          },
          {
            "number": 101,
            "ticks": 3,
            "time": 0.0019986796875,
            "value": 0
          },
          {
            "number": 101,
            "ticks": 122883,
            "time": 81.86791867968749,
            "value": 0
          },
          {
            "number": 101,
            "ticks": 122883,
            "time": 81.86791867968749,
            "value": 0
          }
        ]
      },
      "pitchBends": [],
      "instrument": {
        "family": "piano",
        "number": 1,
        "name": "bright acoustic piano"
      },
      "name": "Piano",
      "notes": [
        {
          "duration": 1.6908830156249999,
          "durationTicks": 2538,
          "midi": 70,
          "name": "A#4",
          "ticks": 10,
          "time": 0.006662265624999999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6948743046874999,
          "durationTicks": 1043,
          "midi": 46,
          "name": "A#2",
          "ticks": 10,
          "time": 0.006662265624999999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.675553734375,
          "durationTicks": 1014,
          "midi": 53,
          "name": "F3",
          "ticks": 1054,
          "time": 0.702202796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 1.3497750156249997,
          "durationTicks": 2026,
          "midi": 58,
          "name": "A#3",
          "ticks": 2069,
          "time": 1.3784227578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3357781874999999,
          "durationTicks": 504,
          "midi": 65,
          "name": "F4",
          "ticks": 2579,
          "time": 1.7181983046874998,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.31579139062499983,
          "durationTicks": 474,
          "midi": 65,
          "name": "F4",
          "ticks": 3084,
          "time": 2.05464271875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3171238437499997,
          "durationTicks": 476,
          "midi": 70,
          "name": "A#4",
          "ticks": 3589,
          "time": 2.3910871328125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18454475781249968,
          "durationTicks": 277,
          "midi": 68,
          "name": "G#4",
          "ticks": 4100,
          "time": 2.73152890625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6988716640624997,
          "durationTicks": 1049,
          "midi": 44,
          "name": "G#2",
          "ticks": 4100,
          "time": 2.73152890625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.15523078906249976,
          "durationTicks": 233,
          "midi": 66,
          "name": "F#4",
          "ticks": 4393,
          "time": 2.9267332890624997,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 2.3644380703124996,
          "durationTicks": 3549,
          "midi": 68,
          "name": "G#4",
          "ticks": 4642,
          "time": 3.0926237031249997,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.6755537343750002,
          "durationTicks": 1014,
          "midi": 51,
          "name": "D#3",
          "ticks": 5150,
          "time": 3.4310667968749997,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 1.3497750156250001,
          "durationTicks": 2026,
          "midi": 56,
          "name": "G#3",
          "ticks": 6165,
          "time": 4.107286757812499,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 1.6948803750000003,
          "durationTicks": 2544,
          "midi": 70,
          "name": "A#4",
          "ticks": 8196,
          "time": 5.460392906249999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6988716640625006,
          "durationTicks": 1049,
          "midi": 42,
          "name": "F#2",
          "ticks": 8196,
          "time": 5.460392906249999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6755537343750007,
          "durationTicks": 1014,
          "midi": 49,
          "name": "C#3",
          "ticks": 9246,
          "time": 6.159930796874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 1.349775015625001,
          "durationTicks": 2026,
          "midi": 54,
          "name": "F#3",
          "ticks": 10261,
          "time": 6.836150757812499,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3357781874999999,
          "durationTicks": 504,
          "midi": 66,
          "name": "F#4",
          "ticks": 10771,
          "time": 7.1759263046875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.3157913906250007,
          "durationTicks": 474,
          "midi": 66,
          "name": "F#4",
          "ticks": 11276,
          "time": 7.512370718749999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.31712384375000013,
          "durationTicks": 476,
          "midi": 70,
          "name": "A#4",
          "ticks": 11781,
          "time": 7.848815132812499,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18454475781249968,
          "durationTicks": 277,
          "midi": 69,
          "name": "A4",
          "ticks": 12292,
          "time": 8.18925690625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6988716640624997,
          "durationTicks": 1049,
          "midi": 41,
          "name": "F2",
          "ticks": 12292,
          "time": 8.18925690625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.1552307890625002,
          "durationTicks": 233,
          "midi": 67,
          "name": "G4",
          "ticks": 12585,
          "time": 8.384461289062498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 2.3644380703125005,
          "durationTicks": 3549,
          "midi": 69,
          "name": "A4",
          "ticks": 12834,
          "time": 8.550351703125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.6755537343750007,
          "durationTicks": 1014,
          "midi": 48,
          "name": "C3",
          "ticks": 13342,
          "time": 8.888794796874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 1.349775015625001,
          "durationTicks": 2026,
          "midi": 53,
          "name": "F3",
          "ticks": 14357,
          "time": 9.565014757812499,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 46,
          "name": "A#2",
          "ticks": 16388,
          "time": 10.91812090625,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.34044177343749915,
          "durationTicks": 511,
          "midi": 49,
          "name": "C#3",
          "ticks": 16388,
          "time": 10.91812090625,
          "velocity": 0.6535433070866141
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 53,
          "name": "F3",
          "ticks": 16388,
          "time": 10.91812090625,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.1652241874999998,
          "durationTicks": 248,
          "midi": 46,
          "name": "A#2",
          "ticks": 16930,
          "time": 11.279215703124999,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.1652241874999998,
          "durationTicks": 248,
          "midi": 53,
          "name": "F3",
          "ticks": 16930,
          "time": 11.279215703124999,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.1718864531249995,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 17179,
          "time": 11.4451061171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.33577818750000077,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 17438,
          "time": 11.617658796874998,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.33577818750000077,
          "durationTicks": 504,
          "midi": 53,
          "name": "F3",
          "ticks": 17438,
          "time": 11.617658796874998,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 17943,
          "time": 11.954103210937499,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 17943,
          "time": 11.954103210937499,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 46,
          "name": "A#2",
          "ticks": 18191,
          "time": 12.119327398437498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.33910932031250063,
          "durationTicks": 509,
          "midi": 46,
          "name": "A#2",
          "ticks": 18453,
          "time": 12.293878757812498,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.33910932031250063,
          "durationTicks": 509,
          "midi": 53,
          "name": "F3",
          "ticks": 18453,
          "time": 12.293878757812498,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 18963,
          "time": 12.633654304687498,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 18963,
          "time": 12.633654304687498,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17055400000000098,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 19211,
          "time": 12.798878492187498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000098,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 19468,
          "time": 12.970098718749998,
          "velocity": 0.4409448818897638
        },
        {
          "duration": 0.17055400000000098,
          "durationTicks": 256,
          "midi": 53,
          "name": "F3",
          "ticks": 19468,
          "time": 12.970098718749998,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 19725,
          "time": 13.141318945312499,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 19973,
          "time": 13.306543132812498,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 19973,
          "time": 13.306543132812498,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.17188645312500128,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 20221,
          "time": 13.471767320312498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 46,
          "name": "A#2",
          "ticks": 20484,
          "time": 13.64698490625,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.34044177343749915,
          "durationTicks": 511,
          "midi": 49,
          "name": "C#3",
          "ticks": 20484,
          "time": 13.64698490625,
          "velocity": 0.6535433070866141
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 53,
          "name": "F3",
          "ticks": 20484,
          "time": 13.64698490625,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.1652241874999998,
          "durationTicks": 248,
          "midi": 46,
          "name": "A#2",
          "ticks": 21026,
          "time": 14.008079703124999,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.1652241874999998,
          "durationTicks": 248,
          "midi": 53,
          "name": "F3",
          "ticks": 21026,
          "time": 14.008079703124999,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.1718864531249995,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 21275,
          "time": 14.1739701171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.33577818750000077,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 21534,
          "time": 14.346522796874998,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.33577818750000077,
          "durationTicks": 504,
          "midi": 53,
          "name": "F3",
          "ticks": 21534,
          "time": 14.346522796874998,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 22039,
          "time": 14.682967210937498,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 22039,
          "time": 14.682967210937498,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 46,
          "name": "A#2",
          "ticks": 22287,
          "time": 14.848191398437498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.33910932031250063,
          "durationTicks": 509,
          "midi": 46,
          "name": "A#2",
          "ticks": 22549,
          "time": 15.022742757812498,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.33910932031250063,
          "durationTicks": 509,
          "midi": 53,
          "name": "F3",
          "ticks": 22549,
          "time": 15.022742757812498,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 23059,
          "time": 15.362518304687498,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 23059,
          "time": 15.362518304687498,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17055400000000098,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 23307,
          "time": 15.527742492187498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000098,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 23564,
          "time": 15.698962718749998,
          "velocity": 0.4409448818897638
        },
        {
          "duration": 0.17055400000000098,
          "durationTicks": 256,
          "midi": 53,
          "name": "F3",
          "ticks": 23564,
          "time": 15.698962718749998,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.16455796093749875,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 23821,
          "time": 15.870182945312498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 24069,
          "time": 16.035407132812498,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 24069,
          "time": 16.035407132812498,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 24317,
          "time": 16.2006313203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6988716640624979,
          "durationTicks": 1049,
          "midi": 70,
          "name": "A#4",
          "ticks": 24580,
          "time": 16.37584890625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 46,
          "name": "A#2",
          "ticks": 24580,
          "time": 16.37584890625,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 53,
          "name": "F3",
          "ticks": 24580,
          "time": 16.37584890625,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.165224187499998,
          "durationTicks": 248,
          "midi": 46,
          "name": "A#2",
          "ticks": 25122,
          "time": 16.736943703125,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.165224187499998,
          "durationTicks": 248,
          "midi": 53,
          "name": "F3",
          "ticks": 25122,
          "time": 16.736943703125,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 25371,
          "time": 16.9028341171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.9953424843750014,
          "durationTicks": 1494,
          "midi": 65,
          "name": "F4",
          "ticks": 25630,
          "time": 17.075386796874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.33577818750000077,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 25630,
          "time": 17.075386796874998,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.33577818750000077,
          "durationTicks": 504,
          "midi": 53,
          "name": "F3",
          "ticks": 25630,
          "time": 17.075386796874998,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 26135,
          "time": 17.4118312109375,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 26135,
          "time": 17.4118312109375,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 46,
          "name": "A#2",
          "ticks": 26383,
          "time": 17.577055398437498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.33910932031249885,
          "durationTicks": 509,
          "midi": 46,
          "name": "A#2",
          "ticks": 26645,
          "time": 17.7516067578125,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.33910932031249885,
          "durationTicks": 509,
          "midi": 53,
          "name": "F3",
          "ticks": 26645,
          "time": 17.7516067578125,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 70,
          "name": "A#4",
          "ticks": 27155,
          "time": 18.0913823046875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 27155,
          "time": 18.0913823046875,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 27155,
          "time": 18.0913823046875,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 27403,
          "time": 18.256606492187498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1605606015625014,
          "durationTicks": 241,
          "midi": 70,
          "name": "A#4",
          "ticks": 27660,
          "time": 18.427826718749998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 27660,
          "time": 18.427826718749998,
          "velocity": 0.4409448818897638
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 53,
          "name": "F3",
          "ticks": 27660,
          "time": 18.427826718749998,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 72,
          "name": "C5",
          "ticks": 27917,
          "time": 18.599046945312498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 27917,
          "time": 18.599046945312498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 28165,
          "time": 18.7642711328125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 28165,
          "time": 18.7642711328125,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 28165,
          "time": 18.7642711328125,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.16189305468749993,
          "durationTicks": 243,
          "midi": 75,
          "name": "D#5",
          "ticks": 28413,
          "time": 18.929495320312498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 46,
          "name": "A#2",
          "ticks": 28413,
          "time": 18.929495320312498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3404417734375009,
          "durationTicks": 511,
          "midi": 77,
          "name": "F5",
          "ticks": 28676,
          "time": 19.104712906249997,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 44,
          "name": "G#2",
          "ticks": 28676,
          "time": 19.104712906249997,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 51,
          "name": "D#3",
          "ticks": 28676,
          "time": 19.104712906249997,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.33777686718750033,
          "durationTicks": 507,
          "midi": 70,
          "name": "A#4",
          "ticks": 29218,
          "time": 19.465807703124998,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 44,
          "name": "G#2",
          "ticks": 29218,
          "time": 19.465807703124998,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312500128,
          "durationTicks": 258,
          "midi": 44,
          "name": "G#2",
          "ticks": 29467,
          "time": 19.631698117187497,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1612268281249989,
          "durationTicks": 242,
          "midi": 70,
          "name": "A#4",
          "ticks": 29726,
          "time": 19.804250796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 44,
          "name": "G#2",
          "ticks": 29726,
          "time": 19.804250796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15389833593750168,
          "durationTicks": 231,
          "midi": 72,
          "name": "C5",
          "ticks": 29984,
          "time": 19.976137249999997,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 30231,
          "time": 20.140695210937498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 30231,
          "time": 20.140695210937498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 75,
          "name": "D#5",
          "ticks": 30479,
          "time": 20.3059193984375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.1738851328124973,
          "durationTicks": 261,
          "midi": 44,
          "name": "G#2",
          "ticks": 30479,
          "time": 20.3059193984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3497750156249992,
          "durationTicks": 2026,
          "midi": 77,
          "name": "F5",
          "ticks": 30741,
          "time": 20.480470757812498,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.33910932031249885,
          "durationTicks": 509,
          "midi": 44,
          "name": "G#2",
          "ticks": 30741,
          "time": 20.480470757812498,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 31251,
          "time": 20.820246304687497,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 51,
          "name": "D#3",
          "ticks": 31251,
          "time": 20.820246304687497,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 44,
          "name": "G#2",
          "ticks": 31499,
          "time": 20.9854704921875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 44,
          "name": "G#2",
          "ticks": 31756,
          "time": 21.15669071875,
          "velocity": 0.4409448818897638
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 51,
          "name": "D#3",
          "ticks": 31756,
          "time": 21.15669071875,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 32013,
          "time": 21.3279109453125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 32261,
          "time": 21.493135132812498,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 51,
          "name": "D#3",
          "ticks": 32261,
          "time": 21.493135132812498,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 44,
          "name": "G#2",
          "ticks": 32509,
          "time": 21.6583593203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6988716640624979,
          "durationTicks": 1049,
          "midi": 70,
          "name": "A#4",
          "ticks": 32772,
          "time": 21.83357690625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 42,
          "name": "F#2",
          "ticks": 32772,
          "time": 21.83357690625,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 49,
          "name": "C#3",
          "ticks": 32772,
          "time": 21.83357690625,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.165224187499998,
          "durationTicks": 248,
          "midi": 42,
          "name": "F#2",
          "ticks": 33314,
          "time": 22.194671703125,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.165224187499998,
          "durationTicks": 248,
          "midi": 49,
          "name": "C#3",
          "ticks": 33314,
          "time": 22.194671703125,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 42,
          "name": "F#2",
          "ticks": 33563,
          "time": 22.3605621171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.9953424843750014,
          "durationTicks": 1494,
          "midi": 65,
          "name": "F4",
          "ticks": 33822,
          "time": 22.533114796874997,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.33577818750000077,
          "durationTicks": 504,
          "midi": 42,
          "name": "F#2",
          "ticks": 33822,
          "time": 22.533114796874997,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.33577818750000077,
          "durationTicks": 504,
          "midi": 49,
          "name": "C#3",
          "ticks": 33822,
          "time": 22.533114796874997,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 34327,
          "time": 22.8695592109375,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 49,
          "name": "C#3",
          "ticks": 34327,
          "time": 22.8695592109375,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 42,
          "name": "F#2",
          "ticks": 34575,
          "time": 23.034783398437497,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.33910932031249885,
          "durationTicks": 509,
          "midi": 42,
          "name": "F#2",
          "ticks": 34837,
          "time": 23.2093347578125,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.33910932031249885,
          "durationTicks": 509,
          "midi": 49,
          "name": "C#3",
          "ticks": 34837,
          "time": 23.2093347578125,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 70,
          "name": "A#4",
          "ticks": 35347,
          "time": 23.5491103046875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 35347,
          "time": 23.5491103046875,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 49,
          "name": "C#3",
          "ticks": 35347,
          "time": 23.5491103046875,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 42,
          "name": "F#2",
          "ticks": 35595,
          "time": 23.714334492187497,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1605606015625014,
          "durationTicks": 241,
          "midi": 70,
          "name": "A#4",
          "ticks": 35852,
          "time": 23.885554718749997,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 42,
          "name": "F#2",
          "ticks": 35852,
          "time": 23.885554718749997,
          "velocity": 0.4409448818897638
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 49,
          "name": "C#3",
          "ticks": 35852,
          "time": 23.885554718749997,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 72,
          "name": "C5",
          "ticks": 36109,
          "time": 24.056774945312497,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 36109,
          "time": 24.056774945312497,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 36357,
          "time": 24.2219991328125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 36357,
          "time": 24.2219991328125,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 49,
          "name": "C#3",
          "ticks": 36357,
          "time": 24.2219991328125,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.16189305468749993,
          "durationTicks": 243,
          "midi": 75,
          "name": "D#5",
          "ticks": 36605,
          "time": 24.387223320312497,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 42,
          "name": "F#2",
          "ticks": 36605,
          "time": 24.387223320312497,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3404417734375009,
          "durationTicks": 511,
          "midi": 77,
          "name": "F5",
          "ticks": 36868,
          "time": 24.562440906249996,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 41,
          "name": "F2",
          "ticks": 36868,
          "time": 24.562440906249996,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 48,
          "name": "C3",
          "ticks": 36868,
          "time": 24.562440906249996,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.33777686718750033,
          "durationTicks": 507,
          "midi": 70,
          "name": "A#4",
          "ticks": 37410,
          "time": 24.923535703124998,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 41,
          "name": "F2",
          "ticks": 37410,
          "time": 24.923535703124998,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312500128,
          "durationTicks": 258,
          "midi": 41,
          "name": "F2",
          "ticks": 37659,
          "time": 25.089426117187497,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1612268281249989,
          "durationTicks": 242,
          "midi": 70,
          "name": "A#4",
          "ticks": 37918,
          "time": 25.261978796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 37918,
          "time": 25.261978796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15389833593750168,
          "durationTicks": 231,
          "midi": 72,
          "name": "C5",
          "ticks": 38176,
          "time": 25.433865249999997,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 38423,
          "time": 25.598423210937497,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 38423,
          "time": 25.598423210937497,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 75,
          "name": "D#5",
          "ticks": 38671,
          "time": 25.7636473984375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.1738851328124973,
          "durationTicks": 261,
          "midi": 41,
          "name": "F2",
          "ticks": 38671,
          "time": 25.7636473984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3497750156249992,
          "durationTicks": 2026,
          "midi": 77,
          "name": "F5",
          "ticks": 38933,
          "time": 25.938198757812497,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.33910932031249885,
          "durationTicks": 509,
          "midi": 41,
          "name": "F2",
          "ticks": 38933,
          "time": 25.938198757812497,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 39443,
          "time": 26.277974304687497,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 39443,
          "time": 26.277974304687497,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 41,
          "name": "F2",
          "ticks": 39691,
          "time": 26.4431984921875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 41,
          "name": "F2",
          "ticks": 39948,
          "time": 26.61441871875,
          "velocity": 0.4409448818897638
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 48,
          "name": "C3",
          "ticks": 39948,
          "time": 26.61441871875,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 40205,
          "time": 26.7856389453125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 40453,
          "time": 26.950863132812497,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 40453,
          "time": 26.950863132812497,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 41,
          "name": "F2",
          "ticks": 40701,
          "time": 27.1160873203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6988716640624979,
          "durationTicks": 1049,
          "midi": 70,
          "name": "A#4",
          "ticks": 40964,
          "time": 27.291304906249998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 46,
          "name": "A#2",
          "ticks": 40964,
          "time": 27.291304906249998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.165224187499998,
          "durationTicks": 248,
          "midi": 46,
          "name": "A#2",
          "ticks": 41506,
          "time": 27.652399703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 41755,
          "time": 27.818290117187498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.9953424843750014,
          "durationTicks": 1494,
          "midi": 65,
          "name": "F4",
          "ticks": 42014,
          "time": 27.990842796874997,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.2265170312500011,
          "durationTicks": 340,
          "midi": 62,
          "name": "D4",
          "ticks": 42014,
          "time": 27.990842796874997,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.33577818750000077,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 42014,
          "time": 27.990842796874997,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.20519778124999988,
          "durationTicks": 308,
          "midi": 62,
          "name": "D4",
          "ticks": 42355,
          "time": 28.2180260546875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 42519,
          "time": 28.3272872109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21585740625000227,
          "durationTicks": 324,
          "midi": 60,
          "name": "C4",
          "ticks": 42684,
          "time": 28.437214593749996,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 46,
          "name": "A#2",
          "ticks": 42767,
          "time": 28.492511398437497,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.5043335078124969,
          "durationTicks": 757,
          "midi": 62,
          "name": "D4",
          "ticks": 43029,
          "time": 28.6670627578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.33910932031249885,
          "durationTicks": 509,
          "midi": 46,
          "name": "A#2",
          "ticks": 43029,
          "time": 28.6670627578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 70,
          "name": "A#4",
          "ticks": 43539,
          "time": 29.0068383046875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 43539,
          "time": 29.0068383046875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 62,
          "name": "D4",
          "ticks": 43787,
          "time": 29.172062492187496,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 43787,
          "time": 29.172062492187496,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1605606015625014,
          "durationTicks": 241,
          "midi": 70,
          "name": "A#4",
          "ticks": 44044,
          "time": 29.343282718749997,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.33577818750000077,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 44044,
          "time": 29.343282718749997,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 72,
          "name": "C5",
          "ticks": 44301,
          "time": 29.514502945312497,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 63,
          "name": "D#4",
          "ticks": 44301,
          "time": 29.514502945312497,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 44549,
          "time": 29.6797271328125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 65,
          "name": "F4",
          "ticks": 44549,
          "time": 29.6797271328125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093749697,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 44549,
          "time": 29.6797271328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16189305468749993,
          "durationTicks": 243,
          "midi": 75,
          "name": "D#5",
          "ticks": 44797,
          "time": 29.844951320312497,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16189305468749993,
          "durationTicks": 243,
          "midi": 67,
          "name": "G4",
          "ticks": 44797,
          "time": 29.844951320312497,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 46,
          "name": "A#2",
          "ticks": 44797,
          "time": 29.844951320312497,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3750916249999996,
          "durationTicks": 2064,
          "midi": 77,
          "name": "F5",
          "ticks": 45060,
          "time": 30.020168906249996,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.5263189843750027,
          "durationTicks": 790,
          "midi": 68,
          "name": "G#4",
          "ticks": 45060,
          "time": 30.020168906249996,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 44,
          "name": "G#2",
          "ticks": 45060,
          "time": 30.020168906249996,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 44,
          "name": "G#2",
          "ticks": 45602,
          "time": 30.381263703124997,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312500128,
          "durationTicks": 258,
          "midi": 70,
          "name": "A#4",
          "ticks": 45851,
          "time": 30.547154117187496,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312500128,
          "durationTicks": 258,
          "midi": 44,
          "name": "G#2",
          "ticks": 45851,
          "time": 30.547154117187496,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1612268281249989,
          "durationTicks": 242,
          "midi": 70,
          "name": "A#4",
          "ticks": 46110,
          "time": 30.719706796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 44,
          "name": "G#2",
          "ticks": 46110,
          "time": 30.719706796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15389833593750168,
          "durationTicks": 231,
          "midi": 72,
          "name": "C5",
          "ticks": 46368,
          "time": 30.891593249999996,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 46615,
          "time": 31.056151210937497,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 46615,
          "time": 31.056151210937497,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 75,
          "name": "D#5",
          "ticks": 46863,
          "time": 31.221375398437498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.1738851328124973,
          "durationTicks": 261,
          "midi": 44,
          "name": "G#2",
          "ticks": 46863,
          "time": 31.221375398437498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.33910932031249885,
          "durationTicks": 509,
          "midi": 77,
          "name": "F5",
          "ticks": 47125,
          "time": 31.395926757812497,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.33910932031249885,
          "durationTicks": 509,
          "midi": 44,
          "name": "G#2",
          "ticks": 47125,
          "time": 31.395926757812497,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.33577818750000077,
          "durationTicks": 504,
          "midi": 77,
          "name": "F5",
          "ticks": 47635,
          "time": 31.735702304687496,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 47635,
          "time": 31.735702304687496,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1705539999999992,
          "durationTicks": 256,
          "midi": 44,
          "name": "G#2",
          "ticks": 47883,
          "time": 31.900926492187498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21252627343749708,
          "durationTicks": 319,
          "midi": 77,
          "name": "F5",
          "ticks": 48140,
          "time": 32.07214671875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.21252627343749708,
          "durationTicks": 319,
          "midi": 68,
          "name": "G#4",
          "ticks": 48140,
          "time": 32.07214671875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 44,
          "name": "G#2",
          "ticks": 48140,
          "time": 32.07214671875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.20586400781250092,
          "durationTicks": 309,
          "midi": 78,
          "name": "F#5",
          "ticks": 48480,
          "time": 32.298663749999996,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.20586400781250092,
          "durationTicks": 309,
          "midi": 70,
          "name": "A#4",
          "ticks": 48480,
          "time": 32.298663749999996,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 48645,
          "time": 32.4085911328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21385872656249916,
          "durationTicks": 321,
          "midi": 80,
          "name": "G#5",
          "ticks": 48810,
          "time": 32.518518515625,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.21385872656249916,
          "durationTicks": 321,
          "midi": 72,
          "name": "C5",
          "ticks": 48810,
          "time": 32.518518515625,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 44,
          "name": "G#2",
          "ticks": 48893,
          "time": 32.5738153203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.7148671718749995,
          "durationTicks": 2574,
          "midi": 82,
          "name": "A#5",
          "ticks": 49156,
          "time": 32.749032906249994,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.5263189843750027,
          "durationTicks": 790,
          "midi": 66,
          "name": "F#4",
          "ticks": 49156,
          "time": 32.749032906249994,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 42,
          "name": "F#2",
          "ticks": 49156,
          "time": 32.749032906249994,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 42,
          "name": "F#2",
          "ticks": 49698,
          "time": 33.110127703124995,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 66,
          "name": "F#4",
          "ticks": 49947,
          "time": 33.2760181171875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 42,
          "name": "F#2",
          "ticks": 49947,
          "time": 33.2760181171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16122682812500244,
          "durationTicks": 242,
          "midi": 66,
          "name": "F#4",
          "ticks": 50206,
          "time": 33.448570796874996,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 42,
          "name": "F#2",
          "ticks": 50206,
          "time": 33.448570796874996,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15389833593750524,
          "durationTicks": 231,
          "midi": 68,
          "name": "G#4",
          "ticks": 50464,
          "time": 33.620457249999994,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 70,
          "name": "A#4",
          "ticks": 50711,
          "time": 33.785015210937495,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 50711,
          "time": 33.785015210937495,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 72,
          "name": "C5",
          "ticks": 50959,
          "time": 33.950239398437496,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 42,
          "name": "F#2",
          "ticks": 50959,
          "time": 33.950239398437496,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.5043335078124969,
          "durationTicks": 757,
          "midi": 73,
          "name": "C#5",
          "ticks": 51221,
          "time": 34.1247907578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203124953,
          "durationTicks": 509,
          "midi": 42,
          "name": "F#2",
          "ticks": 51221,
          "time": 34.1247907578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3357781875000043,
          "durationTicks": 504,
          "midi": 82,
          "name": "A#5",
          "ticks": 51731,
          "time": 34.464566304687494,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 51731,
          "time": 34.464566304687494,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000276,
          "durationTicks": 256,
          "midi": 73,
          "name": "C#5",
          "ticks": 51979,
          "time": 34.629790492187496,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17055400000000276,
          "durationTicks": 256,
          "midi": 42,
          "name": "F#2",
          "ticks": 51979,
          "time": 34.629790492187496,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21252627343749708,
          "durationTicks": 319,
          "midi": 82,
          "name": "A#5",
          "ticks": 52236,
          "time": 34.80101071875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 42,
          "name": "F#2",
          "ticks": 52236,
          "time": 34.80101071875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.20586400781250092,
          "durationTicks": 309,
          "midi": 80,
          "name": "G#5",
          "ticks": 52576,
          "time": 35.02752775,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.20586400781250092,
          "durationTicks": 309,
          "midi": 72,
          "name": "C5",
          "ticks": 52576,
          "time": 35.02752775,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 52741,
          "time": 35.1374551328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21385872656249916,
          "durationTicks": 321,
          "midi": 78,
          "name": "F#5",
          "ticks": 52906,
          "time": 35.247382515625,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.21385872656249916,
          "durationTicks": 321,
          "midi": 70,
          "name": "A#4",
          "ticks": 52906,
          "time": 35.247382515625,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 42,
          "name": "F#2",
          "ticks": 52989,
          "time": 35.3026793203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.5263189843750027,
          "durationTicks": 790,
          "midi": 80,
          "name": "G#5",
          "ticks": 53252,
          "time": 35.477896906249995,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 49,
          "name": "C#3",
          "ticks": 53252,
          "time": 35.477896906249995,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 49,
          "name": "C#3",
          "ticks": 53794,
          "time": 35.838991703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16189305468749637,
          "durationTicks": 243,
          "midi": 78,
          "name": "F#5",
          "ticks": 54043,
          "time": 36.0048821171875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16189305468749637,
          "durationTicks": 243,
          "midi": 70,
          "name": "A#4",
          "ticks": 54043,
          "time": 36.0048821171875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 49,
          "name": "C#3",
          "ticks": 54043,
          "time": 36.0048821171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953124952,
          "durationTicks": 2029,
          "midi": 77,
          "name": "F5",
          "ticks": 54302,
          "time": 36.177434796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.22651703124999756,
          "durationTicks": 340,
          "midi": 68,
          "name": "G#4",
          "ticks": 54302,
          "time": 36.177434796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 49,
          "name": "C#3",
          "ticks": 54302,
          "time": 36.177434796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.20519778124999988,
          "durationTicks": 308,
          "midi": 68,
          "name": "G#4",
          "ticks": 54643,
          "time": 36.4046180546875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 49,
          "name": "C#3",
          "ticks": 54807,
          "time": 36.513879210937496,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21585740625000227,
          "durationTicks": 324,
          "midi": 66,
          "name": "F#4",
          "ticks": 54972,
          "time": 36.62380659375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 49,
          "name": "C#3",
          "ticks": 55055,
          "time": 36.6791033984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.5043335078124969,
          "durationTicks": 757,
          "midi": 68,
          "name": "G#4",
          "ticks": 55317,
          "time": 36.8536547578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203124953,
          "durationTicks": 509,
          "midi": 49,
          "name": "C#3",
          "ticks": 55317,
          "time": 36.8536547578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 49,
          "name": "C#3",
          "ticks": 55827,
          "time": 37.193430304687496,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 68,
          "name": "G#4",
          "ticks": 56075,
          "time": 37.3586544921875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 49,
          "name": "C#3",
          "ticks": 56075,
          "time": 37.3586544921875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546875047,
          "durationTicks": 1011,
          "midi": 77,
          "name": "F5",
          "ticks": 56332,
          "time": 37.529874718749994,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.2125262734375042,
          "durationTicks": 319,
          "midi": 68,
          "name": "G#4",
          "ticks": 56332,
          "time": 37.529874718749994,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000043,
          "durationTicks": 504,
          "midi": 49,
          "name": "C#3",
          "ticks": 56332,
          "time": 37.529874718749994,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.20586400781250092,
          "durationTicks": 309,
          "midi": 65,
          "name": "F4",
          "ticks": 56672,
          "time": 37.75639175,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093749342,
          "durationTicks": 247,
          "midi": 49,
          "name": "C#3",
          "ticks": 56837,
          "time": 37.8663191328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21385872656250626,
          "durationTicks": 321,
          "midi": 68,
          "name": "G#4",
          "ticks": 57002,
          "time": 37.97624651562499,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 49,
          "name": "C#3",
          "ticks": 57085,
          "time": 38.031543320312494,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 75,
          "name": "D#5",
          "ticks": 57348,
          "time": 38.20676090625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 66,
          "name": "F#4",
          "ticks": 57348,
          "time": 38.20676090625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 47,
          "name": "B2",
          "ticks": 57348,
          "time": 38.20676090625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.1552307890625002,
          "durationTicks": 233,
          "midi": 75,
          "name": "D#5",
          "ticks": 57890,
          "time": 38.567855703125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.1552307890625002,
          "durationTicks": 233,
          "midi": 66,
          "name": "F#4",
          "ticks": 57890,
          "time": 38.567855703125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 47,
          "name": "B2",
          "ticks": 57890,
          "time": 38.567855703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16189305468750348,
          "durationTicks": 243,
          "midi": 77,
          "name": "F5",
          "ticks": 58139,
          "time": 38.73374611718749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16189305468750348,
          "durationTicks": 243,
          "midi": 65,
          "name": "F4",
          "ticks": 58139,
          "time": 38.73374611718749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312500483,
          "durationTicks": 258,
          "midi": 47,
          "name": "B2",
          "ticks": 58139,
          "time": 38.73374611718749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953124952,
          "durationTicks": 2029,
          "midi": 78,
          "name": "F#5",
          "ticks": 58398,
          "time": 38.906298796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 66,
          "name": "F#4",
          "ticks": 58398,
          "time": 38.906298796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 47,
          "name": "B2",
          "ticks": 58398,
          "time": 38.906298796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 66,
          "name": "F#4",
          "ticks": 58903,
          "time": 39.2427432109375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 47,
          "name": "B2",
          "ticks": 58903,
          "time": 39.2427432109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 68,
          "name": "G#4",
          "ticks": 59151,
          "time": 39.4079673984375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281249374,
          "durationTicks": 261,
          "midi": 47,
          "name": "B2",
          "ticks": 59151,
          "time": 39.4079673984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6755537343750007,
          "durationTicks": 1014,
          "midi": 70,
          "name": "A#4",
          "ticks": 59413,
          "time": 39.582518757812494,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 47,
          "name": "B2",
          "ticks": 59413,
          "time": 39.582518757812494,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 47,
          "name": "B2",
          "ticks": 59923,
          "time": 39.9222943046875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 47,
          "name": "B2",
          "ticks": 60171,
          "time": 40.0875184921875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3157913906250016,
          "durationTicks": 474,
          "midi": 77,
          "name": "F5",
          "ticks": 60428,
          "time": 40.258738718749996,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 47,
          "name": "B2",
          "ticks": 60428,
          "time": 40.258738718749996,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3171238437500037,
          "durationTicks": 476,
          "midi": 75,
          "name": "D#5",
          "ticks": 60933,
          "time": 40.595183132812494,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.3171238437500037,
          "durationTicks": 476,
          "midi": 66,
          "name": "F#4",
          "ticks": 60933,
          "time": 40.595183132812494,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 47,
          "name": "B2",
          "ticks": 60933,
          "time": 40.595183132812494,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 47,
          "name": "B2",
          "ticks": 61181,
          "time": 40.760407320312495,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 73,
          "name": "C#5",
          "ticks": 61444,
          "time": 40.93562490625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 46,
          "name": "A#2",
          "ticks": 61444,
          "time": 40.93562490625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.1552307890624931,
          "durationTicks": 233,
          "midi": 73,
          "name": "C#5",
          "ticks": 61986,
          "time": 41.296719703125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.1552307890624931,
          "durationTicks": 233,
          "midi": 65,
          "name": "F4",
          "ticks": 61986,
          "time": 41.296719703125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418749999446,
          "durationTicks": 248,
          "midi": 46,
          "name": "A#2",
          "ticks": 61986,
          "time": 41.296719703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16189305468750348,
          "durationTicks": 243,
          "midi": 75,
          "name": "D#5",
          "ticks": 62235,
          "time": 41.462610117187495,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16189305468750348,
          "durationTicks": 243,
          "midi": 63,
          "name": "D#4",
          "ticks": 62235,
          "time": 41.462610117187495,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 62235,
          "time": 41.462610117187495,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953125024,
          "durationTicks": 2029,
          "midi": 77,
          "name": "F5",
          "ticks": 62494,
          "time": 41.635162796874994,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000043,
          "durationTicks": 504,
          "midi": 65,
          "name": "F4",
          "ticks": 62494,
          "time": 41.635162796874994,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000043,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 62494,
          "time": 41.635162796874994,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 65,
          "name": "F4",
          "ticks": 62999,
          "time": 41.9716072109375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093749342,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 62999,
          "time": 41.9716072109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 66,
          "name": "F#4",
          "ticks": 63247,
          "time": 42.136831398437494,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 46,
          "name": "A#2",
          "ticks": 63247,
          "time": 42.136831398437494,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6755537343750007,
          "durationTicks": 1014,
          "midi": 68,
          "name": "G#4",
          "ticks": 63509,
          "time": 42.311382757812495,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 46,
          "name": "A#2",
          "ticks": 63509,
          "time": 42.311382757812495,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093749342,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 64019,
          "time": 42.6511583046875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000276,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 64267,
          "time": 42.81638249218749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3157913906250016,
          "durationTicks": 474,
          "midi": 75,
          "name": "D#5",
          "ticks": 64524,
          "time": 42.98760271875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3157913906250016,
          "durationTicks": 474,
          "midi": 66,
          "name": "F#4",
          "ticks": 64524,
          "time": 42.98760271875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 64524,
          "time": 42.98760271875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3171238437500037,
          "durationTicks": 476,
          "midi": 73,
          "name": "C#5",
          "ticks": 65029,
          "time": 43.324047132812495,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.3171238437500037,
          "durationTicks": 476,
          "midi": 65,
          "name": "F4",
          "ticks": 65029,
          "time": 43.324047132812495,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 65029,
          "time": 43.324047132812495,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 46,
          "name": "A#2",
          "ticks": 65277,
          "time": 43.4892713203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 72,
          "name": "C5",
          "ticks": 65540,
          "time": 43.66448890624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6988716640625015,
          "durationTicks": 1049,
          "midi": 64,
          "name": "E4",
          "ticks": 65540,
          "time": 43.66448890624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 48,
          "name": "C3",
          "ticks": 65540,
          "time": 43.66448890624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.1552307890625002,
          "durationTicks": 233,
          "midi": 72,
          "name": "C5",
          "ticks": 66082,
          "time": 44.025583703124994,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 48,
          "name": "C3",
          "ticks": 66082,
          "time": 44.025583703124994,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16189305468749637,
          "durationTicks": 243,
          "midi": 74,
          "name": "D5",
          "ticks": 66331,
          "time": 44.1914741171875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 48,
          "name": "C3",
          "ticks": 66331,
          "time": 44.1914741171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953125024,
          "durationTicks": 2029,
          "midi": 76,
          "name": "E5",
          "ticks": 66590,
          "time": 44.364026796874995,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 64,
          "name": "E4",
          "ticks": 66590,
          "time": 44.364026796874995,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 48,
          "name": "C3",
          "ticks": 66590,
          "time": 44.364026796874995,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 64,
          "name": "E4",
          "ticks": 67095,
          "time": 44.70047121093749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 67095,
          "time": 44.70047121093749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 65,
          "name": "F4",
          "ticks": 67343,
          "time": 44.865695398437495,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 48,
          "name": "C3",
          "ticks": 67343,
          "time": 44.865695398437495,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203124953,
          "durationTicks": 509,
          "midi": 67,
          "name": "G4",
          "ticks": 67605,
          "time": 45.0402467578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203124953,
          "durationTicks": 509,
          "midi": 48,
          "name": "C3",
          "ticks": 67605,
          "time": 45.0402467578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 67,
          "name": "G4",
          "ticks": 68115,
          "time": 45.38002230468749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 68115,
          "time": 45.38002230468749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1605606015625014,
          "durationTicks": 241,
          "midi": 69,
          "name": "A4",
          "ticks": 68363,
          "time": 45.545246492187495,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17055400000000276,
          "durationTicks": 256,
          "midi": 48,
          "name": "C3",
          "ticks": 68363,
          "time": 45.545246492187495,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546874975,
          "durationTicks": 1011,
          "midi": 79,
          "name": "G5",
          "ticks": 68620,
          "time": 45.71646671875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3157913906249945,
          "durationTicks": 474,
          "midi": 70,
          "name": "A#4",
          "ticks": 68620,
          "time": 45.71646671875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 48,
          "name": "C3",
          "ticks": 68620,
          "time": 45.71646671875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3171238437499966,
          "durationTicks": 476,
          "midi": 72,
          "name": "C5",
          "ticks": 69125,
          "time": 46.0529111328125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 69125,
          "time": 46.0529111328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 48,
          "name": "C3",
          "ticks": 69373,
          "time": 46.2181353203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3404417734375045,
          "durationTicks": 511,
          "midi": 69,
          "name": "A4",
          "ticks": 69636,
          "time": 46.393352906249994,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 77,
          "name": "F5",
          "ticks": 69636,
          "time": 46.393352906249994,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.3404417734375045,
          "durationTicks": 511,
          "midi": 53,
          "name": "F3",
          "ticks": 69636,
          "time": 46.393352906249994,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 57,
          "name": "A3",
          "ticks": 70178,
          "time": 46.754447703124995,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 65,
          "name": "F4",
          "ticks": 70178,
          "time": 46.754447703124995,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 41,
          "name": "F2",
          "ticks": 70178,
          "time": 46.754447703124995,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 57,
          "name": "A3",
          "ticks": 70427,
          "time": 46.9203381171875,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 65,
          "name": "F4",
          "ticks": 70427,
          "time": 46.9203381171875,
          "velocity": 0.48031496062992124
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 41,
          "name": "F2",
          "ticks": 70427,
          "time": 46.9203381171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 56,
          "name": "G#3",
          "ticks": 70686,
          "time": 47.092890796875,
          "velocity": 0.6220472440944882
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 65,
          "name": "F4",
          "ticks": 70686,
          "time": 47.092890796875,
          "velocity": 0.5826771653543307
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 70686,
          "time": 47.092890796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 56,
          "name": "G#3",
          "ticks": 71191,
          "time": 47.429335210937495,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 65,
          "name": "F4",
          "ticks": 71191,
          "time": 47.429335210937495,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 71191,
          "time": 47.429335210937495,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1838785312500022,
          "durationTicks": 276,
          "midi": 56,
          "name": "G#3",
          "ticks": 71439,
          "time": 47.5945593984375,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 65,
          "name": "F4",
          "ticks": 71439,
          "time": 47.5945593984375,
          "velocity": 0.48031496062992124
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 41,
          "name": "F2",
          "ticks": 71439,
          "time": 47.5945593984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203124953,
          "durationTicks": 509,
          "midi": 55,
          "name": "G3",
          "ticks": 71701,
          "time": 47.7691107578125,
          "velocity": 0.6377952755905512
        },
        {
          "duration": 0.3391093203124953,
          "durationTicks": 509,
          "midi": 65,
          "name": "F4",
          "ticks": 71701,
          "time": 47.7691107578125,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3391093203124953,
          "durationTicks": 509,
          "midi": 41,
          "name": "F2",
          "ticks": 71701,
          "time": 47.7691107578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 55,
          "name": "G3",
          "ticks": 72211,
          "time": 48.108886304687495,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 65,
          "name": "F4",
          "ticks": 72211,
          "time": 48.108886304687495,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 72211,
          "time": 48.108886304687495,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.180547398437497,
          "durationTicks": 271,
          "midi": 55,
          "name": "G3",
          "ticks": 72459,
          "time": 48.274110492187496,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 65,
          "name": "F4",
          "ticks": 72459,
          "time": 48.274110492187496,
          "velocity": 0.48031496062992124
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 41,
          "name": "F2",
          "ticks": 72459,
          "time": 48.274110492187496,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3357781875000043,
          "durationTicks": 504,
          "midi": 54,
          "name": "F#3",
          "ticks": 72716,
          "time": 48.44533071874999,
          "velocity": 0.5275590551181102
        },
        {
          "duration": 0.3357781875000043,
          "durationTicks": 504,
          "midi": 65,
          "name": "F4",
          "ticks": 72716,
          "time": 48.44533071874999,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.3157913906250016,
          "durationTicks": 474,
          "midi": 41,
          "name": "F2",
          "ticks": 72716,
          "time": 48.44533071874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.35776366406249593,
          "durationTicks": 537,
          "midi": 54,
          "name": "F#3",
          "ticks": 73221,
          "time": 48.7817751328125,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.3371106406249993,
          "durationTicks": 506,
          "midi": 65,
          "name": "F4",
          "ticks": 73221,
          "time": 48.7817751328125,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 43,
          "name": "G2",
          "ticks": 73221,
          "time": 48.7817751328125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16189305468750348,
          "durationTicks": 243,
          "midi": 45,
          "name": "A2",
          "ticks": 73469,
          "time": 48.94699932031249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.6988716640625015,
          "durationTicks": 1049,
          "midi": 70,
          "name": "A#4",
          "ticks": 73732,
          "time": 49.122216906249996,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 46,
          "name": "A#2",
          "ticks": 73732,
          "time": 49.122216906249996,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 46,
          "name": "A#2",
          "ticks": 74274,
          "time": 49.483311703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312500483,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 74523,
          "time": 49.64920211718749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.9953424843749943,
          "durationTicks": 1494,
          "midi": 65,
          "name": "F4",
          "ticks": 74782,
          "time": 49.821754796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.22651703124999756,
          "durationTicks": 340,
          "midi": 62,
          "name": "D4",
          "ticks": 74782,
          "time": 49.821754796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 74782,
          "time": 49.821754796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.20519778124999988,
          "durationTicks": 308,
          "midi": 62,
          "name": "D4",
          "ticks": 75123,
          "time": 50.0489380546875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 75287,
          "time": 50.1581992109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21585740624999517,
          "durationTicks": 324,
          "midi": 60,
          "name": "C4",
          "ticks": 75452,
          "time": 50.26812659375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281249374,
          "durationTicks": 261,
          "midi": 46,
          "name": "A#2",
          "ticks": 75535,
          "time": 50.3234233984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.504333507812504,
          "durationTicks": 757,
          "midi": 62,
          "name": "D4",
          "ticks": 75797,
          "time": 50.49797475781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 46,
          "name": "A#2",
          "ticks": 75797,
          "time": 50.49797475781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 70,
          "name": "A#4",
          "ticks": 76307,
          "time": 50.837750304687496,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 76307,
          "time": 50.837750304687496,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 62,
          "name": "D4",
          "ticks": 76555,
          "time": 51.0029744921875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 76555,
          "time": 51.0029744921875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1605606015625014,
          "durationTicks": 241,
          "midi": 70,
          "name": "A#4",
          "ticks": 76812,
          "time": 51.174194718749995,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 76812,
          "time": 51.174194718749995,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 72,
          "name": "C5",
          "ticks": 77069,
          "time": 51.3454149453125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 63,
          "name": "D#4",
          "ticks": 77069,
          "time": 51.3454149453125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 77317,
          "time": 51.51063913281249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 65,
          "name": "F4",
          "ticks": 77317,
          "time": 51.51063913281249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 77317,
          "time": 51.51063913281249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16189305468750348,
          "durationTicks": 243,
          "midi": 75,
          "name": "D#5",
          "ticks": 77565,
          "time": 51.675863320312494,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16189305468750348,
          "durationTicks": 243,
          "midi": 67,
          "name": "G4",
          "ticks": 77565,
          "time": 51.675863320312494,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 46,
          "name": "A#2",
          "ticks": 77565,
          "time": 51.675863320312494,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.375091624999996,
          "durationTicks": 2064,
          "midi": 77,
          "name": "F5",
          "ticks": 77828,
          "time": 51.85108090625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.5263189843749956,
          "durationTicks": 790,
          "midi": 68,
          "name": "G#4",
          "ticks": 77828,
          "time": 51.85108090625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 44,
          "name": "G#2",
          "ticks": 77828,
          "time": 51.85108090625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418749999446,
          "durationTicks": 248,
          "midi": 44,
          "name": "G#2",
          "ticks": 78370,
          "time": 52.212175703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 70,
          "name": "A#4",
          "ticks": 78619,
          "time": 52.378066117187494,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 44,
          "name": "G#2",
          "ticks": 78619,
          "time": 52.378066117187494,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16122682812500244,
          "durationTicks": 242,
          "midi": 70,
          "name": "A#4",
          "ticks": 78878,
          "time": 52.55061879687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000043,
          "durationTicks": 504,
          "midi": 44,
          "name": "G#2",
          "ticks": 78878,
          "time": 52.55061879687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15389833593749813,
          "durationTicks": 231,
          "midi": 72,
          "name": "C5",
          "ticks": 79136,
          "time": 52.72250525,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 79383,
          "time": 52.8870632109375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093749342,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 79383,
          "time": 52.8870632109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 75,
          "name": "D#5",
          "ticks": 79631,
          "time": 53.05228739843749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 44,
          "name": "G#2",
          "ticks": 79631,
          "time": 53.05228739843749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 77,
          "name": "F5",
          "ticks": 79893,
          "time": 53.226838757812494,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 44,
          "name": "G#2",
          "ticks": 79893,
          "time": 53.226838757812494,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 77,
          "name": "F5",
          "ticks": 80403,
          "time": 53.5666143046875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093749342,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 80403,
          "time": 53.5666143046875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000276,
          "durationTicks": 256,
          "midi": 44,
          "name": "G#2",
          "ticks": 80651,
          "time": 53.73183849218749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21252627343749708,
          "durationTicks": 319,
          "midi": 77,
          "name": "F5",
          "ticks": 80908,
          "time": 53.903058718749996,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.21252627343749708,
          "durationTicks": 319,
          "midi": 68,
          "name": "G#4",
          "ticks": 80908,
          "time": 53.903058718749996,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 44,
          "name": "G#2",
          "ticks": 80908,
          "time": 53.903058718749996,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.20586400781250092,
          "durationTicks": 309,
          "midi": 78,
          "name": "F#5",
          "ticks": 81248,
          "time": 54.129575749999994,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.20586400781250092,
          "durationTicks": 309,
          "midi": 70,
          "name": "A#4",
          "ticks": 81248,
          "time": 54.129575749999994,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 81413,
          "time": 54.239503132812494,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21385872656249916,
          "durationTicks": 321,
          "midi": 80,
          "name": "G#5",
          "ticks": 81578,
          "time": 54.349430515624995,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.21385872656249916,
          "durationTicks": 321,
          "midi": 72,
          "name": "C5",
          "ticks": 81578,
          "time": 54.349430515624995,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 44,
          "name": "G#2",
          "ticks": 81661,
          "time": 54.404727320312496,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 2.051311585937505,
          "durationTicks": 3079,
          "midi": 73,
          "name": "C#5",
          "ticks": 81924,
          "time": 54.57994490624999,
          "velocity": 0.5275590551181102
        },
        {
          "duration": 2.051311585937505,
          "durationTicks": 3079,
          "midi": 82,
          "name": "A#5",
          "ticks": 81924,
          "time": 54.57994490624999,
          "velocity": 0.6377952755905512
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 42,
          "name": "F#2",
          "ticks": 81924,
          "time": 54.57994490624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 42,
          "name": "F#2",
          "ticks": 82466,
          "time": 54.94103970312499,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 42,
          "name": "F#2",
          "ticks": 82715,
          "time": 55.106930117187495,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 42,
          "name": "F#2",
          "ticks": 82974,
          "time": 55.279482796874994,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 83479,
          "time": 55.61592721093749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 42,
          "name": "F#2",
          "ticks": 83727,
          "time": 55.781151398437494,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203124953,
          "durationTicks": 509,
          "midi": 42,
          "name": "F#2",
          "ticks": 83989,
          "time": 55.955702757812496,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 84499,
          "time": 56.29547830468749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000276,
          "durationTicks": 256,
          "midi": 42,
          "name": "F#2",
          "ticks": 84747,
          "time": 56.460702492187494,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546874975,
          "durationTicks": 1011,
          "midi": 76,
          "name": "E5",
          "ticks": 85004,
          "time": 56.63192271875,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.6735550546874975,
          "durationTicks": 1011,
          "midi": 85,
          "name": "C#6",
          "ticks": 85004,
          "time": 56.63192271875,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 42,
          "name": "F#2",
          "ticks": 85004,
          "time": 56.63192271875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 85509,
          "time": 56.968367132812496,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 42,
          "name": "F#2",
          "ticks": 85757,
          "time": 57.1335913203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6988716640625015,
          "durationTicks": 1049,
          "midi": 75,
          "name": "D#5",
          "ticks": 86020,
          "time": 57.30880890624999,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.6988716640625015,
          "durationTicks": 1049,
          "midi": 84,
          "name": "C6",
          "ticks": 86020,
          "time": 57.30880890624999,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 41,
          "name": "F2",
          "ticks": 86020,
          "time": 57.30880890624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 41,
          "name": "F2",
          "ticks": 86562,
          "time": 57.669903703124994,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 41,
          "name": "F2",
          "ticks": 86811,
          "time": 57.8357941171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953124952,
          "durationTicks": 2029,
          "midi": 72,
          "name": "C5",
          "ticks": 87070,
          "time": 58.008346796874996,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 1.3517736953124952,
          "durationTicks": 2029,
          "midi": 81,
          "name": "A5",
          "ticks": 87070,
          "time": 58.008346796874996,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 87070,
          "time": 58.008346796874996,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 87575,
          "time": 58.344791210937494,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 41,
          "name": "F2",
          "ticks": 87823,
          "time": 58.510015398437496,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203124953,
          "durationTicks": 509,
          "midi": 41,
          "name": "F2",
          "ticks": 88085,
          "time": 58.6845667578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 88595,
          "time": 59.024342304687494,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 41,
          "name": "F2",
          "ticks": 88843,
          "time": 59.189566492187495,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546875047,
          "durationTicks": 1011,
          "midi": 69,
          "name": "A4",
          "ticks": 89100,
          "time": 59.36078671874999,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.6735550546875047,
          "durationTicks": 1011,
          "midi": 77,
          "name": "F5",
          "ticks": 89100,
          "time": 59.36078671874999,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.3357781875000043,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 89100,
          "time": 59.36078671874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093749342,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 89605,
          "time": 59.6972311328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 41,
          "name": "F2",
          "ticks": 89853,
          "time": 59.86245532031249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.2365104296874989,
          "durationTicks": 355,
          "midi": 52,
          "name": "E3",
          "ticks": 90116,
          "time": 60.037672906249995,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 40,
          "name": "E2",
          "ticks": 90116,
          "time": 60.037672906249995,
          "velocity": 0.6220472440944882
        },
        {
          "duration": 0.207196460937503,
          "durationTicks": 311,
          "midi": 58,
          "name": "A#3",
          "ticks": 90492,
          "time": 60.288174093749994,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 40,
          "name": "E2",
          "ticks": 90658,
          "time": 60.398767703124996,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.21385872656249916,
          "durationTicks": 321,
          "midi": 61,
          "name": "C#4",
          "ticks": 90824,
          "time": 60.5093613125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312500483,
          "durationTicks": 258,
          "midi": 40,
          "name": "E2",
          "ticks": 90907,
          "time": 60.56465811718749,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.21319249999999812,
          "durationTicks": 320,
          "midi": 64,
          "name": "E4",
          "ticks": 91166,
          "time": 60.737210796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 40,
          "name": "E2",
          "ticks": 91166,
          "time": 60.737210796875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.20519778124999988,
          "durationTicks": 308,
          "midi": 70,
          "name": "A#4",
          "ticks": 91507,
          "time": 60.964394054687496,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 40,
          "name": "E2",
          "ticks": 91671,
          "time": 61.073655210937495,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.21585740624999517,
          "durationTicks": 324,
          "midi": 73,
          "name": "C#5",
          "ticks": 91836,
          "time": 61.183582593749996,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281249374,
          "durationTicks": 261,
          "midi": 40,
          "name": "E2",
          "ticks": 91919,
          "time": 61.2388793984375,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.6755537343750007,
          "durationTicks": 1014,
          "midi": 76,
          "name": "E5",
          "ticks": 92181,
          "time": 61.41343075781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 40,
          "name": "E2",
          "ticks": 92181,
          "time": 61.41343075781249,
          "velocity": 0.6062992125984252
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 40,
          "name": "E2",
          "ticks": 92691,
          "time": 61.753206304687495,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 40,
          "name": "E2",
          "ticks": 92939,
          "time": 61.9184304921875,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.6735550546874975,
          "durationTicks": 1011,
          "midi": 82,
          "name": "A#5",
          "ticks": 93196,
          "time": 62.08965071874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 40,
          "name": "E2",
          "ticks": 93196,
          "time": 62.08965071874999,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 40,
          "name": "E2",
          "ticks": 93701,
          "time": 62.42609513281249,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 40,
          "name": "E2",
          "ticks": 93949,
          "time": 62.59131932031249,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 77,
          "name": "F5",
          "ticks": 94212,
          "time": 62.766536906249996,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 81,
          "name": "A5",
          "ticks": 94212,
          "time": 62.766536906249996,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.3604285703125001,
          "durationTicks": 541,
          "midi": 41,
          "name": "F2",
          "ticks": 94212,
          "time": 62.766536906249996,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418749999446,
          "durationTicks": 248,
          "midi": 41,
          "name": "F2",
          "ticks": 94754,
          "time": 63.127631703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 41,
          "name": "F2",
          "ticks": 95003,
          "time": 63.29352211718749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953125024,
          "durationTicks": 2029,
          "midi": 77,
          "name": "F5",
          "ticks": 95262,
          "time": 63.46607479687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.22651703125000466,
          "durationTicks": 340,
          "midi": 65,
          "name": "F4",
          "ticks": 95262,
          "time": 63.46607479687499,
          "velocity": 0.5039370078740157
        },
        {
          "duration": 0.3357781875000043,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 95262,
          "time": 63.46607479687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.21852231249999932,
          "durationTicks": 328,
          "midi": 65,
          "name": "F4",
          "ticks": 95603,
          "time": 63.6932580546875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093749342,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 95767,
          "time": 63.8025192109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.2291819375000017,
          "durationTicks": 344,
          "midi": 65,
          "name": "F4",
          "ticks": 95932,
          "time": 63.91244659374999,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 41,
          "name": "F2",
          "ticks": 96015,
          "time": 63.96774339843749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3497750156249992,
          "durationTicks": 2026,
          "midi": 65,
          "name": "F4",
          "ticks": 96277,
          "time": 64.1422947578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 41,
          "name": "F2",
          "ticks": 96277,
          "time": 64.1422947578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 96787,
          "time": 64.4820703046875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 41,
          "name": "F2",
          "ticks": 97035,
          "time": 64.6472944921875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546874975,
          "durationTicks": 1011,
          "midi": 77,
          "name": "F5",
          "ticks": 97292,
          "time": 64.81851471875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 97292,
          "time": 64.81851471875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 97797,
          "time": 65.1549591328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 41,
          "name": "F2",
          "ticks": 98045,
          "time": 65.3201833203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.2365104296874989,
          "durationTicks": 355,
          "midi": 52,
          "name": "E3",
          "ticks": 98308,
          "time": 65.49540090625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 40,
          "name": "E2",
          "ticks": 98308,
          "time": 65.49540090625,
          "velocity": 0.6220472440944882
        },
        {
          "duration": 0.2071964609375101,
          "durationTicks": 311,
          "midi": 58,
          "name": "A#3",
          "ticks": 98684,
          "time": 65.74590209374999,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 40,
          "name": "E2",
          "ticks": 98850,
          "time": 65.85649570312499,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.21385872656250626,
          "durationTicks": 321,
          "midi": 61,
          "name": "C#4",
          "ticks": 99016,
          "time": 65.9670893125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 40,
          "name": "E2",
          "ticks": 99099,
          "time": 66.0223861171875,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.21319250000000523,
          "durationTicks": 320,
          "midi": 64,
          "name": "E4",
          "ticks": 99358,
          "time": 66.194938796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 40,
          "name": "E2",
          "ticks": 99358,
          "time": 66.194938796875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.20519778125000698,
          "durationTicks": 308,
          "midi": 70,
          "name": "A#4",
          "ticks": 99699,
          "time": 66.42212205468749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 40,
          "name": "E2",
          "ticks": 99863,
          "time": 66.53138321093749,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.21585740624999517,
          "durationTicks": 324,
          "midi": 73,
          "name": "C#5",
          "ticks": 100028,
          "time": 66.64131059374999,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 40,
          "name": "E2",
          "ticks": 100111,
          "time": 66.6966073984375,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.6755537343750007,
          "durationTicks": 1014,
          "midi": 76,
          "name": "E5",
          "ticks": 100373,
          "time": 66.8711587578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 40,
          "name": "E2",
          "ticks": 100373,
          "time": 66.8711587578125,
          "velocity": 0.6062992125984252
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 40,
          "name": "E2",
          "ticks": 100883,
          "time": 67.2109343046875,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 40,
          "name": "E2",
          "ticks": 101131,
          "time": 67.3761584921875,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.6735550546874975,
          "durationTicks": 1011,
          "midi": 82,
          "name": "A#5",
          "ticks": 101388,
          "time": 67.54737871875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 40,
          "name": "E2",
          "ticks": 101388,
          "time": 67.54737871875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 40,
          "name": "E2",
          "ticks": 101893,
          "time": 67.8838231328125,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 40,
          "name": "E2",
          "ticks": 102141,
          "time": 68.0490473203125,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 77,
          "name": "F5",
          "ticks": 102404,
          "time": 68.22426490625,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 81,
          "name": "A5",
          "ticks": 102404,
          "time": 68.22426490625,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 41,
          "name": "F2",
          "ticks": 102404,
          "time": 68.22426490625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 41,
          "name": "F2",
          "ticks": 102946,
          "time": 68.585359703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 41,
          "name": "F2",
          "ticks": 103195,
          "time": 68.7512501171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953125024,
          "durationTicks": 2029,
          "midi": 77,
          "name": "F5",
          "ticks": 103454,
          "time": 68.923802796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.22651703124999756,
          "durationTicks": 340,
          "midi": 65,
          "name": "F4",
          "ticks": 103454,
          "time": 68.923802796875,
          "velocity": 0.5039370078740157
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 103454,
          "time": 68.923802796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.21852231249999932,
          "durationTicks": 328,
          "midi": 65,
          "name": "F4",
          "ticks": 103795,
          "time": 69.1509860546875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 103959,
          "time": 69.2602472109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.2291819375000017,
          "durationTicks": 344,
          "midi": 65,
          "name": "F4",
          "ticks": 104124,
          "time": 69.37017459375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 41,
          "name": "F2",
          "ticks": 104207,
          "time": 69.4254713984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3497750156249992,
          "durationTicks": 2026,
          "midi": 65,
          "name": "F4",
          "ticks": 104469,
          "time": 69.6000227578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 41,
          "name": "F2",
          "ticks": 104469,
          "time": 69.6000227578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 104979,
          "time": 69.9397983046875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000986,
          "durationTicks": 256,
          "midi": 41,
          "name": "F2",
          "ticks": 105227,
          "time": 70.10502249218749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546874975,
          "durationTicks": 1011,
          "midi": 74,
          "name": "D5",
          "ticks": 105484,
          "time": 70.27624271875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 105484,
          "time": 70.27624271875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 105989,
          "time": 70.6126871328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 41,
          "name": "F2",
          "ticks": 106237,
          "time": 70.7779113203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 2.051311585937512,
          "durationTicks": 3079,
          "midi": 66,
          "name": "F#4",
          "ticks": 106500,
          "time": 70.95312890624999,
          "velocity": 0.5275590551181102
        },
        {
          "duration": 2.051311585937512,
          "durationTicks": 3079,
          "midi": 75,
          "name": "D#5",
          "ticks": 106500,
          "time": 70.95312890624999,
          "velocity": 0.6377952755905512
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 47,
          "name": "B2",
          "ticks": 106500,
          "time": 70.95312890624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 47,
          "name": "B2",
          "ticks": 107042,
          "time": 71.314223703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 47,
          "name": "B2",
          "ticks": 107291,
          "time": 71.4801141171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 47,
          "name": "B2",
          "ticks": 107550,
          "time": 71.652666796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 47,
          "name": "B2",
          "ticks": 108055,
          "time": 71.9891112109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 47,
          "name": "B2",
          "ticks": 108303,
          "time": 72.1543353984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203124882,
          "durationTicks": 509,
          "midi": 47,
          "name": "B2",
          "ticks": 108565,
          "time": 72.3288867578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 47,
          "name": "B2",
          "ticks": 109075,
          "time": 72.66866230468749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000986,
          "durationTicks": 256,
          "midi": 47,
          "name": "B2",
          "ticks": 109323,
          "time": 72.83388649218749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546874975,
          "durationTicks": 1011,
          "midi": 71,
          "name": "B4",
          "ticks": 109580,
          "time": 73.00510671875,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.6735550546874975,
          "durationTicks": 1011,
          "midi": 78,
          "name": "F#5",
          "ticks": 109580,
          "time": 73.00510671875,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 47,
          "name": "B2",
          "ticks": 109580,
          "time": 73.00510671875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 47,
          "name": "B2",
          "ticks": 110085,
          "time": 73.3415511328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 47,
          "name": "B2",
          "ticks": 110333,
          "time": 73.5067753203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6988716640625086,
          "durationTicks": 1049,
          "midi": 70,
          "name": "A#4",
          "ticks": 110596,
          "time": 73.68199290624999,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.6988716640625086,
          "durationTicks": 1049,
          "midi": 77,
          "name": "F5",
          "ticks": 110596,
          "time": 73.68199290624999,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 46,
          "name": "A#2",
          "ticks": 110596,
          "time": 73.68199290624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 46,
          "name": "A#2",
          "ticks": 111138,
          "time": 74.043087703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 111387,
          "time": 74.2089781171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953124881,
          "durationTicks": 2029,
          "midi": 65,
          "name": "F4",
          "ticks": 111646,
          "time": 74.381530796875,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 1.3517736953124881,
          "durationTicks": 2029,
          "midi": 73,
          "name": "C#5",
          "ticks": 111646,
          "time": 74.381530796875,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 111646,
          "time": 74.381530796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 112151,
          "time": 74.7179752109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 46,
          "name": "A#2",
          "ticks": 112399,
          "time": 74.8831993984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203124882,
          "durationTicks": 509,
          "midi": 46,
          "name": "A#2",
          "ticks": 112661,
          "time": 75.0577507578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 113171,
          "time": 75.39752630468749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 113419,
          "time": 75.56275049218749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546875118,
          "durationTicks": 1011,
          "midi": 61,
          "name": "C#4",
          "ticks": 113676,
          "time": 75.73397071874999,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.6735550546875118,
          "durationTicks": 1011,
          "midi": 70,
          "name": "A#4",
          "ticks": 113676,
          "time": 75.73397071874999,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 113676,
          "time": 75.73397071874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 114181,
          "time": 76.0704151328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 46,
          "name": "A#2",
          "ticks": 114429,
          "time": 76.23563932031249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 72,
          "name": "C5",
          "ticks": 114692,
          "time": 76.41085690624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6988716640625086,
          "durationTicks": 1049,
          "midi": 64,
          "name": "E4",
          "ticks": 114692,
          "time": 76.41085690624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 48,
          "name": "C3",
          "ticks": 114692,
          "time": 76.41085690624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.1552307890625002,
          "durationTicks": 233,
          "midi": 72,
          "name": "C5",
          "ticks": 115234,
          "time": 76.771951703125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 48,
          "name": "C3",
          "ticks": 115234,
          "time": 76.771951703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16189305468751058,
          "durationTicks": 243,
          "midi": 74,
          "name": "D5",
          "ticks": 115483,
          "time": 76.93784211718749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312501194,
          "durationTicks": 258,
          "midi": 48,
          "name": "C3",
          "ticks": 115483,
          "time": 76.93784211718749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953124881,
          "durationTicks": 2029,
          "midi": 76,
          "name": "E5",
          "ticks": 115742,
          "time": 77.110394796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 64,
          "name": "E4",
          "ticks": 115742,
          "time": 77.110394796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 48,
          "name": "C3",
          "ticks": 115742,
          "time": 77.110394796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 64,
          "name": "E4",
          "ticks": 116247,
          "time": 77.4468392109375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 116247,
          "time": 77.4468392109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 65,
          "name": "F4",
          "ticks": 116495,
          "time": 77.6120633984375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281248663,
          "durationTicks": 261,
          "midi": 48,
          "name": "C3",
          "ticks": 116495,
          "time": 77.6120633984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 67,
          "name": "G4",
          "ticks": 116757,
          "time": 77.78661475781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 48,
          "name": "C3",
          "ticks": 116757,
          "time": 77.78661475781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 67,
          "name": "G4",
          "ticks": 117267,
          "time": 78.12639030468749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 117267,
          "time": 78.12639030468749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1605606015624943,
          "durationTicks": 241,
          "midi": 69,
          "name": "A4",
          "ticks": 117515,
          "time": 78.29161449218749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 48,
          "name": "C3",
          "ticks": 117515,
          "time": 78.29161449218749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546874975,
          "durationTicks": 1011,
          "midi": 79,
          "name": "G5",
          "ticks": 117772,
          "time": 78.46283471874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3157913906250087,
          "durationTicks": 474,
          "midi": 70,
          "name": "A#4",
          "ticks": 117772,
          "time": 78.46283471874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 48,
          "name": "C3",
          "ticks": 117772,
          "time": 78.46283471874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3171238437500108,
          "durationTicks": 476,
          "midi": 72,
          "name": "C5",
          "ticks": 118277,
          "time": 78.79927913281249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 118277,
          "time": 78.79927913281249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 48,
          "name": "C3",
          "ticks": 118525,
          "time": 78.96450332031249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3404417734375045,
          "durationTicks": 511,
          "midi": 69,
          "name": "A4",
          "ticks": 118788,
          "time": 79.13972090624999,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 77,
          "name": "F5",
          "ticks": 118788,
          "time": 79.13972090624999,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.3404417734375045,
          "durationTicks": 511,
          "midi": 53,
          "name": "F3",
          "ticks": 118788,
          "time": 79.13972090624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418749998735,
          "durationTicks": 248,
          "midi": 57,
          "name": "A3",
          "ticks": 119330,
          "time": 79.500815703125,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16522418749998735,
          "durationTicks": 248,
          "midi": 65,
          "name": "F4",
          "ticks": 119330,
          "time": 79.500815703125,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.16522418749998735,
          "durationTicks": 248,
          "midi": 41,
          "name": "F2",
          "ticks": 119330,
          "time": 79.500815703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 57,
          "name": "A3",
          "ticks": 119579,
          "time": 79.66670611718749,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 65,
          "name": "F4",
          "ticks": 119579,
          "time": 79.66670611718749,
          "velocity": 0.48031496062992124
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 41,
          "name": "F2",
          "ticks": 119579,
          "time": 79.66670611718749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 56,
          "name": "G#3",
          "ticks": 119838,
          "time": 79.83925879687499,
          "velocity": 0.6220472440944882
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 65,
          "name": "F4",
          "ticks": 119838,
          "time": 79.83925879687499,
          "velocity": 0.5826771653543307
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 119838,
          "time": 79.83925879687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 56,
          "name": "G#3",
          "ticks": 120343,
          "time": 80.1757032109375,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 65,
          "name": "F4",
          "ticks": 120343,
          "time": 80.1757032109375,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 120343,
          "time": 80.1757032109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1838785312500022,
          "durationTicks": 276,
          "midi": 56,
          "name": "G#3",
          "ticks": 120591,
          "time": 80.34092739843749,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 65,
          "name": "F4",
          "ticks": 120591,
          "time": 80.34092739843749,
          "velocity": 0.48031496062992124
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 41,
          "name": "F2",
          "ticks": 120591,
          "time": 80.34092739843749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 55,
          "name": "G3",
          "ticks": 120853,
          "time": 80.51547875781249,
          "velocity": 0.6377952755905512
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 65,
          "name": "F4",
          "ticks": 120853,
          "time": 80.51547875781249,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 41,
          "name": "F2",
          "ticks": 120853,
          "time": 80.51547875781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 55,
          "name": "G3",
          "ticks": 121363,
          "time": 80.85525430468749,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 65,
          "name": "F4",
          "ticks": 121363,
          "time": 80.85525430468749,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 121363,
          "time": 80.85525430468749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.180547398437497,
          "durationTicks": 271,
          "midi": 55,
          "name": "G3",
          "ticks": 121611,
          "time": 81.0204784921875,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 65,
          "name": "F4",
          "ticks": 121611,
          "time": 81.0204784921875,
          "velocity": 0.48031496062992124
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 41,
          "name": "F2",
          "ticks": 121611,
          "time": 81.0204784921875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 54,
          "name": "F#3",
          "ticks": 121868,
          "time": 81.19169871874999,
          "velocity": 0.5275590551181102
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 65,
          "name": "F4",
          "ticks": 121868,
          "time": 81.19169871874999,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.3157913906250087,
          "durationTicks": 474,
          "midi": 41,
          "name": "F2",
          "ticks": 121868,
          "time": 81.19169871874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.35776366406250304,
          "durationTicks": 537,
          "midi": 54,
          "name": "F#3",
          "ticks": 122373,
          "time": 81.52814313281249,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.35776366406250304,
          "durationTicks": 537,
          "midi": 65,
          "name": "F4",
          "ticks": 122373,
          "time": 81.52814313281249,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 43,
          "name": "G2",
          "ticks": 122373,
          "time": 81.52814313281249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16189305468749637,
          "durationTicks": 243,
          "midi": 45,
          "name": "A2",
          "ticks": 122621,
          "time": 81.69336732031249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 1.6908830156250048,
          "durationTicks": 2538,
          "midi": 70,
          "name": "A#4",
          "ticks": 122890,
          "time": 81.87258226562498,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6948743046875023,
          "durationTicks": 1043,
          "midi": 46,
          "name": "A#2",
          "ticks": 122890,
          "time": 81.87258226562498,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6755537343750007,
          "durationTicks": 1014,
          "midi": 53,
          "name": "F3",
          "ticks": 123934,
          "time": 82.56812279687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 1.3497750156249992,
          "durationTicks": 2026,
          "midi": 58,
          "name": "A#3",
          "ticks": 124949,
          "time": 83.24434275781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 65,
          "name": "F4",
          "ticks": 125459,
          "time": 83.5841183046875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.3157913906249945,
          "durationTicks": 474,
          "midi": 65,
          "name": "F4",
          "ticks": 125964,
          "time": 83.92056271874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3171238437499966,
          "durationTicks": 476,
          "midi": 70,
          "name": "A#4",
          "ticks": 126469,
          "time": 84.25700713281249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18454475781248902,
          "durationTicks": 277,
          "midi": 68,
          "name": "G#4",
          "ticks": 126980,
          "time": 84.59744890625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 44,
          "name": "G#2",
          "ticks": 126980,
          "time": 84.59744890625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.1552307890625002,
          "durationTicks": 233,
          "midi": 66,
          "name": "F#4",
          "ticks": 127273,
          "time": 84.79265328906249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 2.3644380703125023,
          "durationTicks": 3549,
          "midi": 68,
          "name": "G#4",
          "ticks": 127522,
          "time": 84.95854370312499,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.6755537343750007,
          "durationTicks": 1014,
          "midi": 51,
          "name": "D#3",
          "ticks": 128030,
          "time": 85.29698679687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 1.3497750156249992,
          "durationTicks": 2026,
          "midi": 56,
          "name": "G#3",
          "ticks": 129045,
          "time": 85.97320675781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 1.694880375000011,
          "durationTicks": 2544,
          "midi": 70,
          "name": "A#4",
          "ticks": 131076,
          "time": 87.32631290624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6988716640625086,
          "durationTicks": 1049,
          "midi": 42,
          "name": "F#2",
          "ticks": 131076,
          "time": 87.32631290624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6755537343750007,
          "durationTicks": 1014,
          "midi": 49,
          "name": "C#3",
          "ticks": 132126,
          "time": 88.02585079687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 1.3497750156249992,
          "durationTicks": 2026,
          "midi": 54,
          "name": "F#3",
          "ticks": 133141,
          "time": 88.70207075781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 66,
          "name": "F#4",
          "ticks": 133651,
          "time": 89.04184630468748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.3157913906250087,
          "durationTicks": 474,
          "midi": 66,
          "name": "F#4",
          "ticks": 134156,
          "time": 89.37829071874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3171238437499966,
          "durationTicks": 476,
          "midi": 70,
          "name": "A#4",
          "ticks": 134661,
          "time": 89.71473513281249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18454475781250324,
          "durationTicks": 277,
          "midi": 69,
          "name": "A4",
          "ticks": 135172,
          "time": 90.05517690624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6988716640625086,
          "durationTicks": 1049,
          "midi": 41,
          "name": "F2",
          "ticks": 135172,
          "time": 90.05517690624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.1552307890625002,
          "durationTicks": 233,
          "midi": 67,
          "name": "G4",
          "ticks": 135465,
          "time": 90.25038128906249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 2.3644380703125023,
          "durationTicks": 3549,
          "midi": 69,
          "name": "A4",
          "ticks": 135714,
          "time": 90.41627170312499,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.6755537343750007,
          "durationTicks": 1014,
          "midi": 48,
          "name": "C3",
          "ticks": 136222,
          "time": 90.75471479687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 1.3497750156250135,
          "durationTicks": 2026,
          "midi": 53,
          "name": "F3",
          "ticks": 137237,
          "time": 91.43093475781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 46,
          "name": "A#2",
          "ticks": 139268,
          "time": 92.78404090624998,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.3404417734375045,
          "durationTicks": 511,
          "midi": 49,
          "name": "C#3",
          "ticks": 139268,
          "time": 92.78404090624998,
          "velocity": 0.6535433070866141
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 53,
          "name": "F3",
          "ticks": 139268,
          "time": 92.78404090624998,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 46,
          "name": "A#2",
          "ticks": 139810,
          "time": 93.14513570312499,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 53,
          "name": "F3",
          "ticks": 139810,
          "time": 93.14513570312499,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17188645312501194,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 140059,
          "time": 93.31102611718748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 140318,
          "time": 93.48357879687498,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 53,
          "name": "F3",
          "ticks": 140318,
          "time": 93.48357879687498,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 140823,
          "time": 93.82002321093749,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 140823,
          "time": 93.82002321093749,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 46,
          "name": "A#2",
          "ticks": 141071,
          "time": 93.98524739843748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 46,
          "name": "A#2",
          "ticks": 141333,
          "time": 94.15979875781248,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 53,
          "name": "F3",
          "ticks": 141333,
          "time": 94.15979875781248,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 141843,
          "time": 94.49957430468748,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 141843,
          "time": 94.49957430468748,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 142091,
          "time": 94.66479849218749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000986,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 142348,
          "time": 94.83601871874998,
          "velocity": 0.4409448818897638
        },
        {
          "duration": 0.17055400000000986,
          "durationTicks": 256,
          "midi": 53,
          "name": "F3",
          "ticks": 142348,
          "time": 94.83601871874998,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 142605,
          "time": 95.00723894531248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 142853,
          "time": 95.17246313281248,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 142853,
          "time": 95.17246313281248,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.17188645312501194,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 143101,
          "time": 95.33768732031248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 46,
          "name": "A#2",
          "ticks": 143364,
          "time": 95.51290490624999,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.3404417734375045,
          "durationTicks": 511,
          "midi": 49,
          "name": "C#3",
          "ticks": 143364,
          "time": 95.51290490624999,
          "velocity": 0.6535433070866141
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 53,
          "name": "F3",
          "ticks": 143364,
          "time": 95.51290490624999,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 46,
          "name": "A#2",
          "ticks": 143906,
          "time": 95.87399970312498,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 53,
          "name": "F3",
          "ticks": 143906,
          "time": 95.87399970312498,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 144155,
          "time": 96.03989011718748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 144414,
          "time": 96.21244279687498,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 53,
          "name": "F3",
          "ticks": 144414,
          "time": 96.21244279687498,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 144919,
          "time": 96.5488872109375,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 144919,
          "time": 96.5488872109375,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 46,
          "name": "A#2",
          "ticks": 145167,
          "time": 96.71411139843748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 46,
          "name": "A#2",
          "ticks": 145429,
          "time": 96.88866275781248,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 53,
          "name": "F3",
          "ticks": 145429,
          "time": 96.88866275781248,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 145939,
          "time": 97.22843830468749,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 145939,
          "time": 97.22843830468749,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 146187,
          "time": 97.39366249218749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 146444,
          "time": 97.56488271874998,
          "velocity": 0.4409448818897638
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 53,
          "name": "F3",
          "ticks": 146444,
          "time": 97.56488271874998,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 146701,
          "time": 97.73610294531248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 146949,
          "time": 97.90132713281248,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 146949,
          "time": 97.90132713281248,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 147197,
          "time": 98.06655132031248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 70,
          "name": "A#4",
          "ticks": 147460,
          "time": 98.24176890624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 46,
          "name": "A#2",
          "ticks": 147460,
          "time": 98.24176890624999,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 53,
          "name": "F3",
          "ticks": 147460,
          "time": 98.24176890624999,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.16522418749998735,
          "durationTicks": 248,
          "midi": 46,
          "name": "A#2",
          "ticks": 148002,
          "time": 98.602863703125,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16522418749998735,
          "durationTicks": 248,
          "midi": 53,
          "name": "F3",
          "ticks": 148002,
          "time": 98.602863703125,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 148251,
          "time": 98.76875411718748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.9953424843750014,
          "durationTicks": 1494,
          "midi": 65,
          "name": "F4",
          "ticks": 148510,
          "time": 98.94130679687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 148510,
          "time": 98.94130679687498,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 53,
          "name": "F3",
          "ticks": 148510,
          "time": 98.94130679687498,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 149015,
          "time": 99.27775121093748,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 149015,
          "time": 99.27775121093748,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 46,
          "name": "A#2",
          "ticks": 149263,
          "time": 99.44297539843748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 46,
          "name": "A#2",
          "ticks": 149525,
          "time": 99.61752675781248,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 53,
          "name": "F3",
          "ticks": 149525,
          "time": 99.61752675781248,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 70,
          "name": "A#4",
          "ticks": 150035,
          "time": 99.95730230468749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 150035,
          "time": 99.95730230468749,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 150035,
          "time": 99.95730230468749,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 150283,
          "time": 100.12252649218749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1605606015625085,
          "durationTicks": 241,
          "midi": 70,
          "name": "A#4",
          "ticks": 150540,
          "time": 100.29374671874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 150540,
          "time": 100.29374671874999,
          "velocity": 0.4409448818897638
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 53,
          "name": "F3",
          "ticks": 150540,
          "time": 100.29374671874999,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 72,
          "name": "C5",
          "ticks": 150797,
          "time": 100.46496694531248,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 150797,
          "time": 100.46496694531248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 151045,
          "time": 100.63019113281248,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 151045,
          "time": 100.63019113281248,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 53,
          "name": "F3",
          "ticks": 151045,
          "time": 100.63019113281248,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.16189305468749637,
          "durationTicks": 243,
          "midi": 75,
          "name": "D#5",
          "ticks": 151293,
          "time": 100.79541532031249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 46,
          "name": "A#2",
          "ticks": 151293,
          "time": 100.79541532031249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3404417734375045,
          "durationTicks": 511,
          "midi": 77,
          "name": "F5",
          "ticks": 151556,
          "time": 100.97063290624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 44,
          "name": "G#2",
          "ticks": 151556,
          "time": 100.97063290624999,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 51,
          "name": "D#3",
          "ticks": 151556,
          "time": 100.97063290624999,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.33777686718750033,
          "durationTicks": 507,
          "midi": 70,
          "name": "A#4",
          "ticks": 152098,
          "time": 101.33172770312498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 44,
          "name": "G#2",
          "ticks": 152098,
          "time": 101.33172770312498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 44,
          "name": "G#2",
          "ticks": 152347,
          "time": 101.49761811718749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16122682812500955,
          "durationTicks": 242,
          "midi": 70,
          "name": "A#4",
          "ticks": 152606,
          "time": 101.67017079687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 44,
          "name": "G#2",
          "ticks": 152606,
          "time": 101.67017079687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15389833593749813,
          "durationTicks": 231,
          "midi": 72,
          "name": "C5",
          "ticks": 152864,
          "time": 101.84205724999998,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 153111,
          "time": 102.00661521093748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 153111,
          "time": 102.00661521093748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 75,
          "name": "D#5",
          "ticks": 153359,
          "time": 102.17183939843748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 44,
          "name": "G#2",
          "ticks": 153359,
          "time": 102.17183939843748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3497750156249992,
          "durationTicks": 2026,
          "midi": 77,
          "name": "F5",
          "ticks": 153621,
          "time": 102.34639075781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 44,
          "name": "G#2",
          "ticks": 153621,
          "time": 102.34639075781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 154131,
          "time": 102.68616630468749,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 51,
          "name": "D#3",
          "ticks": 154131,
          "time": 102.68616630468749,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 44,
          "name": "G#2",
          "ticks": 154379,
          "time": 102.85139049218749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 44,
          "name": "G#2",
          "ticks": 154636,
          "time": 103.02261071874999,
          "velocity": 0.4409448818897638
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 51,
          "name": "D#3",
          "ticks": 154636,
          "time": 103.02261071874999,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 154893,
          "time": 103.19383094531248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 155141,
          "time": 103.35905513281249,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 51,
          "name": "D#3",
          "ticks": 155141,
          "time": 103.35905513281249,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 44,
          "name": "G#2",
          "ticks": 155389,
          "time": 103.52427932031249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 70,
          "name": "A#4",
          "ticks": 155652,
          "time": 103.69949690624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 42,
          "name": "F#2",
          "ticks": 155652,
          "time": 103.69949690624999,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 49,
          "name": "C#3",
          "ticks": 155652,
          "time": 103.69949690624999,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 42,
          "name": "F#2",
          "ticks": 156194,
          "time": 104.06059170312498,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 49,
          "name": "C#3",
          "ticks": 156194,
          "time": 104.06059170312498,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 42,
          "name": "F#2",
          "ticks": 156443,
          "time": 104.22648211718749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.9953424843750014,
          "durationTicks": 1494,
          "midi": 65,
          "name": "F4",
          "ticks": 156702,
          "time": 104.39903479687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 42,
          "name": "F#2",
          "ticks": 156702,
          "time": 104.39903479687499,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 49,
          "name": "C#3",
          "ticks": 156702,
          "time": 104.39903479687499,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 157207,
          "time": 104.73547921093748,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 49,
          "name": "C#3",
          "ticks": 157207,
          "time": 104.73547921093748,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 42,
          "name": "F#2",
          "ticks": 157455,
          "time": 104.90070339843749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 42,
          "name": "F#2",
          "ticks": 157717,
          "time": 105.07525475781249,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 49,
          "name": "C#3",
          "ticks": 157717,
          "time": 105.07525475781249,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 70,
          "name": "A#4",
          "ticks": 158227,
          "time": 105.41503030468749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 158227,
          "time": 105.41503030468749,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 49,
          "name": "C#3",
          "ticks": 158227,
          "time": 105.41503030468749,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 42,
          "name": "F#2",
          "ticks": 158475,
          "time": 105.58025449218749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1605606015624943,
          "durationTicks": 241,
          "midi": 70,
          "name": "A#4",
          "ticks": 158732,
          "time": 105.75147471874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 42,
          "name": "F#2",
          "ticks": 158732,
          "time": 105.75147471874999,
          "velocity": 0.4409448818897638
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 49,
          "name": "C#3",
          "ticks": 158732,
          "time": 105.75147471874999,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 72,
          "name": "C5",
          "ticks": 158989,
          "time": 105.92269494531249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 158989,
          "time": 105.92269494531249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 159237,
          "time": 106.08791913281249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 159237,
          "time": 106.08791913281249,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 49,
          "name": "C#3",
          "ticks": 159237,
          "time": 106.08791913281249,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.16189305468749637,
          "durationTicks": 243,
          "midi": 75,
          "name": "D#5",
          "ticks": 159485,
          "time": 106.25314332031249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 42,
          "name": "F#2",
          "ticks": 159485,
          "time": 106.25314332031249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.34044177343749027,
          "durationTicks": 511,
          "midi": 77,
          "name": "F5",
          "ticks": 159748,
          "time": 106.42836090624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 41,
          "name": "F2",
          "ticks": 159748,
          "time": 106.42836090624999,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 48,
          "name": "C3",
          "ticks": 159748,
          "time": 106.42836090624999,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.33777686718750033,
          "durationTicks": 507,
          "midi": 70,
          "name": "A#4",
          "ticks": 160290,
          "time": 106.78945570312499,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 41,
          "name": "F2",
          "ticks": 160290,
          "time": 106.78945570312499,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 41,
          "name": "F2",
          "ticks": 160539,
          "time": 106.95534611718749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16122682812499534,
          "durationTicks": 242,
          "midi": 70,
          "name": "A#4",
          "ticks": 160798,
          "time": 107.12789879687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 160798,
          "time": 107.12789879687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15389833593749813,
          "durationTicks": 231,
          "midi": 72,
          "name": "C5",
          "ticks": 161056,
          "time": 107.29978524999999,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 161303,
          "time": 107.46434321093749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 161303,
          "time": 107.46434321093749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 75,
          "name": "D#5",
          "ticks": 161551,
          "time": 107.62956739843749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 41,
          "name": "F2",
          "ticks": 161551,
          "time": 107.62956739843749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3497750156249992,
          "durationTicks": 2026,
          "midi": 77,
          "name": "F5",
          "ticks": 161813,
          "time": 107.80411875781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 41,
          "name": "F2",
          "ticks": 161813,
          "time": 107.80411875781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 162323,
          "time": 108.14389430468748,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 162323,
          "time": 108.14389430468748,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.17055400000000986,
          "durationTicks": 256,
          "midi": 41,
          "name": "F2",
          "ticks": 162571,
          "time": 108.30911849218748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 41,
          "name": "F2",
          "ticks": 162828,
          "time": 108.48033871874999,
          "velocity": 0.4409448818897638
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 48,
          "name": "C3",
          "ticks": 162828,
          "time": 108.48033871874999,
          "velocity": 0.5511811023622047
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 163085,
          "time": 108.65155894531249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 163333,
          "time": 108.81678313281249,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 163333,
          "time": 108.81678313281249,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 41,
          "name": "F2",
          "ticks": 163581,
          "time": 108.98200732031249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6988716640625086,
          "durationTicks": 1049,
          "midi": 70,
          "name": "A#4",
          "ticks": 163844,
          "time": 109.15722490624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 46,
          "name": "A#2",
          "ticks": 163844,
          "time": 109.15722490624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 46,
          "name": "A#2",
          "ticks": 164386,
          "time": 109.51831970312499,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 164635,
          "time": 109.68421011718749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.9953424843750014,
          "durationTicks": 1494,
          "midi": 65,
          "name": "F4",
          "ticks": 164894,
          "time": 109.85676279687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.22651703124999756,
          "durationTicks": 340,
          "midi": 62,
          "name": "D4",
          "ticks": 164894,
          "time": 109.85676279687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 164894,
          "time": 109.85676279687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.20519778125000698,
          "durationTicks": 308,
          "midi": 62,
          "name": "D4",
          "ticks": 165235,
          "time": 110.08394605468749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 165399,
          "time": 110.19320721093749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21585740624999517,
          "durationTicks": 324,
          "midi": 60,
          "name": "C4",
          "ticks": 165564,
          "time": 110.30313459374999,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 46,
          "name": "A#2",
          "ticks": 165647,
          "time": 110.35843139843749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.5043335078124898,
          "durationTicks": 757,
          "midi": 62,
          "name": "D4",
          "ticks": 165909,
          "time": 110.53298275781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203124882,
          "durationTicks": 509,
          "midi": 46,
          "name": "A#2",
          "ticks": 165909,
          "time": 110.53298275781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 70,
          "name": "A#4",
          "ticks": 166419,
          "time": 110.8727583046875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 166419,
          "time": 110.8727583046875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 62,
          "name": "D4",
          "ticks": 166667,
          "time": 111.03798249218748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 166667,
          "time": 111.03798249218748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1605606015624943,
          "durationTicks": 241,
          "midi": 70,
          "name": "A#4",
          "ticks": 166924,
          "time": 111.20920271874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 166924,
          "time": 111.20920271874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 72,
          "name": "C5",
          "ticks": 167181,
          "time": 111.38042294531249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 63,
          "name": "D#4",
          "ticks": 167181,
          "time": 111.38042294531249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 167429,
          "time": 111.54564713281249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 65,
          "name": "F4",
          "ticks": 167429,
          "time": 111.54564713281249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 167429,
          "time": 111.54564713281249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16189305468749637,
          "durationTicks": 243,
          "midi": 75,
          "name": "D#5",
          "ticks": 167677,
          "time": 111.71087132031249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16189305468749637,
          "durationTicks": 243,
          "midi": 67,
          "name": "G4",
          "ticks": 167677,
          "time": 111.71087132031249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18187985156248487,
          "durationTicks": 273,
          "midi": 46,
          "name": "A#2",
          "ticks": 167677,
          "time": 111.71087132031249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.375091624999996,
          "durationTicks": 2064,
          "midi": 77,
          "name": "F5",
          "ticks": 167940,
          "time": 111.88608890624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.5263189843750098,
          "durationTicks": 790,
          "midi": 68,
          "name": "G#4",
          "ticks": 167940,
          "time": 111.88608890624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 44,
          "name": "G#2",
          "ticks": 167940,
          "time": 111.88608890624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 44,
          "name": "G#2",
          "ticks": 168482,
          "time": 112.24718370312499,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312501194,
          "durationTicks": 258,
          "midi": 70,
          "name": "A#4",
          "ticks": 168731,
          "time": 112.41307411718748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312501194,
          "durationTicks": 258,
          "midi": 44,
          "name": "G#2",
          "ticks": 168731,
          "time": 112.41307411718748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16122682812499534,
          "durationTicks": 242,
          "midi": 70,
          "name": "A#4",
          "ticks": 168990,
          "time": 112.58562679687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 44,
          "name": "G#2",
          "ticks": 168990,
          "time": 112.58562679687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15389833593749813,
          "durationTicks": 231,
          "midi": 72,
          "name": "C5",
          "ticks": 169248,
          "time": 112.75751324999999,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 169495,
          "time": 112.92207121093749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 169495,
          "time": 112.92207121093749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 75,
          "name": "D#5",
          "ticks": 169743,
          "time": 113.08729539843749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281248663,
          "durationTicks": 261,
          "midi": 44,
          "name": "G#2",
          "ticks": 169743,
          "time": 113.08729539843749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203124882,
          "durationTicks": 509,
          "midi": 77,
          "name": "F5",
          "ticks": 170005,
          "time": 113.26184675781249,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.3391093203124882,
          "durationTicks": 509,
          "midi": 44,
          "name": "G#2",
          "ticks": 170005,
          "time": 113.26184675781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 77,
          "name": "F5",
          "ticks": 170515,
          "time": 113.60162230468748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 170515,
          "time": 113.60162230468748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000986,
          "durationTicks": 256,
          "midi": 44,
          "name": "G#2",
          "ticks": 170763,
          "time": 113.76684649218748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.2125262734375042,
          "durationTicks": 319,
          "midi": 77,
          "name": "F5",
          "ticks": 171020,
          "time": 113.93806671874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.2125262734375042,
          "durationTicks": 319,
          "midi": 68,
          "name": "G#4",
          "ticks": 171020,
          "time": 113.93806671874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 44,
          "name": "G#2",
          "ticks": 171020,
          "time": 113.93806671874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.2058640078124938,
          "durationTicks": 309,
          "midi": 78,
          "name": "F#5",
          "ticks": 171360,
          "time": 114.16458374999999,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.2058640078124938,
          "durationTicks": 309,
          "midi": 70,
          "name": "A#4",
          "ticks": 171360,
          "time": 114.16458374999999,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 171525,
          "time": 114.27451113281248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21385872656249205,
          "durationTicks": 321,
          "midi": 80,
          "name": "G#5",
          "ticks": 171690,
          "time": 114.38443851562499,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.21385872656249205,
          "durationTicks": 321,
          "midi": 72,
          "name": "C5",
          "ticks": 171690,
          "time": 114.38443851562499,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.1818798515625133,
          "durationTicks": 273,
          "midi": 44,
          "name": "G#2",
          "ticks": 171773,
          "time": 114.43973532031248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.7148671718749995,
          "durationTicks": 2574,
          "midi": 82,
          "name": "A#5",
          "ticks": 172036,
          "time": 114.61495290624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.5263189843749956,
          "durationTicks": 790,
          "midi": 66,
          "name": "F#4",
          "ticks": 172036,
          "time": 114.61495290624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 42,
          "name": "F#2",
          "ticks": 172036,
          "time": 114.61495290624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 42,
          "name": "F#2",
          "ticks": 172578,
          "time": 114.97604770312498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312498352,
          "durationTicks": 258,
          "midi": 66,
          "name": "F#4",
          "ticks": 172827,
          "time": 115.1419381171875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312498352,
          "durationTicks": 258,
          "midi": 42,
          "name": "F#2",
          "ticks": 172827,
          "time": 115.1419381171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16122682812499534,
          "durationTicks": 242,
          "midi": 66,
          "name": "F#4",
          "ticks": 173086,
          "time": 115.31449079687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 42,
          "name": "F#2",
          "ticks": 173086,
          "time": 115.31449079687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15389833593751234,
          "durationTicks": 231,
          "midi": 68,
          "name": "G#4",
          "ticks": 173344,
          "time": 115.48637724999998,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249998496,
          "durationTicks": 232,
          "midi": 70,
          "name": "A#4",
          "ticks": 173591,
          "time": 115.65093521093749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 173591,
          "time": 115.65093521093749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 72,
          "name": "C5",
          "ticks": 173839,
          "time": 115.81615939843749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 42,
          "name": "F#2",
          "ticks": 173839,
          "time": 115.81615939843749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.504333507812504,
          "durationTicks": 757,
          "midi": 73,
          "name": "C#5",
          "ticks": 174101,
          "time": 115.99071075781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 42,
          "name": "F#2",
          "ticks": 174101,
          "time": 115.99071075781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 82,
          "name": "A#5",
          "ticks": 174611,
          "time": 116.33048630468748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 174611,
          "time": 116.33048630468748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 73,
          "name": "C#5",
          "ticks": 174859,
          "time": 116.49571049218748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 42,
          "name": "F#2",
          "ticks": 174859,
          "time": 116.49571049218748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21252627343748998,
          "durationTicks": 319,
          "midi": 82,
          "name": "A#5",
          "ticks": 175116,
          "time": 116.66693071875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 42,
          "name": "F#2",
          "ticks": 175116,
          "time": 116.66693071875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.20586400781250802,
          "durationTicks": 309,
          "midi": 80,
          "name": "G#5",
          "ticks": 175456,
          "time": 116.89344774999998,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.20586400781250802,
          "durationTicks": 309,
          "midi": 72,
          "name": "C5",
          "ticks": 175456,
          "time": 116.89344774999998,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 175621,
          "time": 117.0033751328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21385872656250626,
          "durationTicks": 321,
          "midi": 78,
          "name": "F#5",
          "ticks": 175786,
          "time": 117.11330251562498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.21385872656250626,
          "durationTicks": 321,
          "midi": 70,
          "name": "A#4",
          "ticks": 175786,
          "time": 117.11330251562498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18187985156248487,
          "durationTicks": 273,
          "midi": 42,
          "name": "F#2",
          "ticks": 175869,
          "time": 117.1685993203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.5263189843750098,
          "durationTicks": 790,
          "midi": 80,
          "name": "G#5",
          "ticks": 176132,
          "time": 117.34381690624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 49,
          "name": "C#3",
          "ticks": 176132,
          "time": 117.34381690624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 49,
          "name": "C#3",
          "ticks": 176674,
          "time": 117.70491170312499,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16189305468751058,
          "durationTicks": 243,
          "midi": 78,
          "name": "F#5",
          "ticks": 176923,
          "time": 117.87080211718748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16189305468751058,
          "durationTicks": 243,
          "midi": 70,
          "name": "A#4",
          "ticks": 176923,
          "time": 117.87080211718748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312501194,
          "durationTicks": 258,
          "midi": 49,
          "name": "C#3",
          "ticks": 176923,
          "time": 117.87080211718748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953125024,
          "durationTicks": 2029,
          "midi": 77,
          "name": "F5",
          "ticks": 177182,
          "time": 118.04335479687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.22651703125001177,
          "durationTicks": 340,
          "midi": 68,
          "name": "G#4",
          "ticks": 177182,
          "time": 118.04335479687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 49,
          "name": "C#3",
          "ticks": 177182,
          "time": 118.04335479687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.20519778125000698,
          "durationTicks": 308,
          "midi": 68,
          "name": "G#4",
          "ticks": 177523,
          "time": 118.27053805468748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 49,
          "name": "C#3",
          "ticks": 177687,
          "time": 118.37979921093748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21585740624999517,
          "durationTicks": 324,
          "midi": 66,
          "name": "F#4",
          "ticks": 177852,
          "time": 118.48972659374999,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 49,
          "name": "C#3",
          "ticks": 177935,
          "time": 118.54502339843748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.5043335078124898,
          "durationTicks": 757,
          "midi": 68,
          "name": "G#4",
          "ticks": 178197,
          "time": 118.7195747578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203124882,
          "durationTicks": 509,
          "midi": 49,
          "name": "C#3",
          "ticks": 178197,
          "time": 118.7195747578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 49,
          "name": "C#3",
          "ticks": 178707,
          "time": 119.05935030468748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 68,
          "name": "G#4",
          "ticks": 178955,
          "time": 119.22457449218749,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 49,
          "name": "C#3",
          "ticks": 178955,
          "time": 119.22457449218749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546875118,
          "durationTicks": 1011,
          "midi": 77,
          "name": "F5",
          "ticks": 179212,
          "time": 119.39579471874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.2125262734375042,
          "durationTicks": 319,
          "midi": 68,
          "name": "G#4",
          "ticks": 179212,
          "time": 119.39579471874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 49,
          "name": "C#3",
          "ticks": 179212,
          "time": 119.39579471874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.2058640078124938,
          "durationTicks": 309,
          "midi": 65,
          "name": "F4",
          "ticks": 179552,
          "time": 119.62231175,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 49,
          "name": "C#3",
          "ticks": 179717,
          "time": 119.73223913281248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21385872656250626,
          "durationTicks": 321,
          "midi": 68,
          "name": "G#4",
          "ticks": 179882,
          "time": 119.84216651562498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 49,
          "name": "C#3",
          "ticks": 179965,
          "time": 119.89746332031248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 75,
          "name": "D#5",
          "ticks": 180228,
          "time": 120.07268090624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 66,
          "name": "F#4",
          "ticks": 180228,
          "time": 120.07268090624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 47,
          "name": "B2",
          "ticks": 180228,
          "time": 120.07268090624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.1552307890625002,
          "durationTicks": 233,
          "midi": 75,
          "name": "D#5",
          "ticks": 180770,
          "time": 120.43377570312498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.1552307890625002,
          "durationTicks": 233,
          "midi": 66,
          "name": "F#4",
          "ticks": 180770,
          "time": 120.43377570312498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 47,
          "name": "B2",
          "ticks": 180770,
          "time": 120.43377570312498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16189305468749637,
          "durationTicks": 243,
          "midi": 77,
          "name": "F5",
          "ticks": 181019,
          "time": 120.59966611718748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16189305468749637,
          "durationTicks": 243,
          "midi": 65,
          "name": "F4",
          "ticks": 181019,
          "time": 120.59966611718748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 47,
          "name": "B2",
          "ticks": 181019,
          "time": 120.59966611718748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953124881,
          "durationTicks": 2029,
          "midi": 78,
          "name": "F#5",
          "ticks": 181278,
          "time": 120.772218796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 66,
          "name": "F#4",
          "ticks": 181278,
          "time": 120.772218796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 47,
          "name": "B2",
          "ticks": 181278,
          "time": 120.772218796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15456456249998496,
          "durationTicks": 232,
          "midi": 66,
          "name": "F#4",
          "ticks": 181783,
          "time": 121.1086632109375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 47,
          "name": "B2",
          "ticks": 181783,
          "time": 121.1086632109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 68,
          "name": "G#4",
          "ticks": 182031,
          "time": 121.2738873984375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281248663,
          "durationTicks": 261,
          "midi": 47,
          "name": "B2",
          "ticks": 182031,
          "time": 121.2738873984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6755537343750007,
          "durationTicks": 1014,
          "midi": 70,
          "name": "A#4",
          "ticks": 182293,
          "time": 121.44843875781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 47,
          "name": "B2",
          "ticks": 182293,
          "time": 121.44843875781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 47,
          "name": "B2",
          "ticks": 182803,
          "time": 121.78821430468749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 47,
          "name": "B2",
          "ticks": 183051,
          "time": 121.95343849218749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3157913906249945,
          "durationTicks": 474,
          "midi": 77,
          "name": "F5",
          "ticks": 183308,
          "time": 122.12465871874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 47,
          "name": "B2",
          "ticks": 183308,
          "time": 122.12465871874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3171238437499966,
          "durationTicks": 476,
          "midi": 75,
          "name": "D#5",
          "ticks": 183813,
          "time": 122.46110313281248,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.3171238437499966,
          "durationTicks": 476,
          "midi": 66,
          "name": "F#4",
          "ticks": 183813,
          "time": 122.46110313281248,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 47,
          "name": "B2",
          "ticks": 183813,
          "time": 122.46110313281248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 47,
          "name": "B2",
          "ticks": 184061,
          "time": 122.62632732031248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 73,
          "name": "C#5",
          "ticks": 184324,
          "time": 122.80154490624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 46,
          "name": "A#2",
          "ticks": 184324,
          "time": 122.80154490624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.155230789062486,
          "durationTicks": 233,
          "midi": 73,
          "name": "C#5",
          "ticks": 184866,
          "time": 123.162639703125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.155230789062486,
          "durationTicks": 233,
          "midi": 65,
          "name": "F4",
          "ticks": 184866,
          "time": 123.162639703125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418749998735,
          "durationTicks": 248,
          "midi": 46,
          "name": "A#2",
          "ticks": 184866,
          "time": 123.162639703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16189305468751058,
          "durationTicks": 243,
          "midi": 75,
          "name": "D#5",
          "ticks": 185115,
          "time": 123.32853011718748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16189305468751058,
          "durationTicks": 243,
          "midi": 63,
          "name": "D#4",
          "ticks": 185115,
          "time": 123.32853011718748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 185115,
          "time": 123.32853011718748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953125024,
          "durationTicks": 2029,
          "midi": 77,
          "name": "F5",
          "ticks": 185374,
          "time": 123.50108279687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 65,
          "name": "F4",
          "ticks": 185374,
          "time": 123.50108279687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 185374,
          "time": 123.50108279687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15456456250001338,
          "durationTicks": 232,
          "midi": 65,
          "name": "F4",
          "ticks": 185879,
          "time": 123.83752721093748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 185879,
          "time": 123.83752721093748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 66,
          "name": "F#4",
          "ticks": 186127,
          "time": 124.00275139843748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 46,
          "name": "A#2",
          "ticks": 186127,
          "time": 124.00275139843748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6755537343750007,
          "durationTicks": 1014,
          "midi": 68,
          "name": "G#4",
          "ticks": 186389,
          "time": 124.17730275781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 46,
          "name": "A#2",
          "ticks": 186389,
          "time": 124.17730275781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 186899,
          "time": 124.51707830468749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999999565,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 187147,
          "time": 124.68230249218749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3157913906250087,
          "durationTicks": 474,
          "midi": 75,
          "name": "D#5",
          "ticks": 187404,
          "time": 124.85352271874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3157913906250087,
          "durationTicks": 474,
          "midi": 66,
          "name": "F#4",
          "ticks": 187404,
          "time": 124.85352271874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 187404,
          "time": 124.85352271874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3171238437500108,
          "durationTicks": 476,
          "midi": 73,
          "name": "C#5",
          "ticks": 187909,
          "time": 125.18996713281248,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.3171238437500108,
          "durationTicks": 476,
          "midi": 65,
          "name": "F4",
          "ticks": 187909,
          "time": 125.18996713281248,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 187909,
          "time": 125.18996713281248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156249908,
          "durationTicks": 273,
          "midi": 46,
          "name": "A#2",
          "ticks": 188157,
          "time": 125.35519132031249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 72,
          "name": "C5",
          "ticks": 188420,
          "time": 125.53040890624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 64,
          "name": "E4",
          "ticks": 188420,
          "time": 125.53040890624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.360428570312493,
          "durationTicks": 541,
          "midi": 48,
          "name": "C3",
          "ticks": 188420,
          "time": 125.53040890624999,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.1552307890625002,
          "durationTicks": 233,
          "midi": 72,
          "name": "C5",
          "ticks": 188962,
          "time": 125.89150370312498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 48,
          "name": "C3",
          "ticks": 188962,
          "time": 125.89150370312498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16189305468749637,
          "durationTicks": 243,
          "midi": 74,
          "name": "D5",
          "ticks": 189211,
          "time": 126.05739411718748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312499773,
          "durationTicks": 258,
          "midi": 48,
          "name": "C3",
          "ticks": 189211,
          "time": 126.05739411718748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953125024,
          "durationTicks": 2029,
          "midi": 76,
          "name": "E5",
          "ticks": 189470,
          "time": 126.22994679687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 64,
          "name": "E4",
          "ticks": 189470,
          "time": 126.22994679687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 48,
          "name": "C3",
          "ticks": 189470,
          "time": 126.22994679687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15456456249999917,
          "durationTicks": 232,
          "midi": 64,
          "name": "E4",
          "ticks": 189975,
          "time": 126.56639121093748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 189975,
          "time": 126.56639121093748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 65,
          "name": "F4",
          "ticks": 190223,
          "time": 126.73161539843748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 48,
          "name": "C3",
          "ticks": 190223,
          "time": 126.73161539843748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 67,
          "name": "G4",
          "ticks": 190485,
          "time": 126.90616675781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 48,
          "name": "C3",
          "ticks": 190485,
          "time": 126.90616675781249,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.15456456250001338,
          "durationTicks": 232,
          "midi": 67,
          "name": "G4",
          "ticks": 190995,
          "time": 127.24594230468747,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 190995,
          "time": 127.24594230468747,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1605606015625085,
          "durationTicks": 241,
          "midi": 69,
          "name": "A4",
          "ticks": 191243,
          "time": 127.41116649218748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17055400000000986,
          "durationTicks": 256,
          "midi": 48,
          "name": "C3",
          "ticks": 191243,
          "time": 127.41116649218748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546874975,
          "durationTicks": 1011,
          "midi": 79,
          "name": "G5",
          "ticks": 191500,
          "time": 127.58238671874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3157913906249945,
          "durationTicks": 474,
          "midi": 70,
          "name": "A#4",
          "ticks": 191500,
          "time": 127.58238671874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781874999972,
          "durationTicks": 504,
          "midi": 48,
          "name": "C3",
          "ticks": 191500,
          "time": 127.58238671874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3171238437499966,
          "durationTicks": 476,
          "midi": 72,
          "name": "C5",
          "ticks": 192005,
          "time": 127.91883113281249,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093750052,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 192005,
          "time": 127.91883113281249,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1818798515625133,
          "durationTicks": 273,
          "midi": 48,
          "name": "C3",
          "ticks": 192253,
          "time": 128.08405532031247,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3404417734375045,
          "durationTicks": 511,
          "midi": 69,
          "name": "A4",
          "ticks": 192516,
          "time": 128.25927290624998,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 77,
          "name": "F5",
          "ticks": 192516,
          "time": 128.25927290624998,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.3404417734375045,
          "durationTicks": 511,
          "midi": 53,
          "name": "F3",
          "ticks": 192516,
          "time": 128.25927290624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418749997314,
          "durationTicks": 248,
          "midi": 57,
          "name": "A3",
          "ticks": 193058,
          "time": 128.620367703125,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16522418749997314,
          "durationTicks": 248,
          "midi": 65,
          "name": "F4",
          "ticks": 193058,
          "time": 128.620367703125,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.16522418749997314,
          "durationTicks": 248,
          "midi": 41,
          "name": "F2",
          "ticks": 193058,
          "time": 128.620367703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1818798515625133,
          "durationTicks": 273,
          "midi": 57,
          "name": "A3",
          "ticks": 193307,
          "time": 128.7862581171875,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.17188645312498352,
          "durationTicks": 258,
          "midi": 65,
          "name": "F4",
          "ticks": 193307,
          "time": 128.7862581171875,
          "velocity": 0.48031496062992124
        },
        {
          "duration": 0.17188645312498352,
          "durationTicks": 258,
          "midi": 41,
          "name": "F2",
          "ticks": 193307,
          "time": 128.7862581171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 56,
          "name": "G#3",
          "ticks": 193566,
          "time": 128.95881079687499,
          "velocity": 0.6220472440944882
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 65,
          "name": "F4",
          "ticks": 193566,
          "time": 128.95881079687499,
          "velocity": 0.5826771653543307
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 193566,
          "time": 128.95881079687499,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 56,
          "name": "G#3",
          "ticks": 194071,
          "time": 129.29525521093748,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 65,
          "name": "F4",
          "ticks": 194071,
          "time": 129.29525521093748,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 194071,
          "time": 129.29525521093748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1838785312500022,
          "durationTicks": 276,
          "midi": 56,
          "name": "G#3",
          "ticks": 194319,
          "time": 129.46047939843749,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 65,
          "name": "F4",
          "ticks": 194319,
          "time": 129.46047939843749,
          "velocity": 0.48031496062992124
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 41,
          "name": "F2",
          "ticks": 194319,
          "time": 129.46047939843749,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.339109320312474,
          "durationTicks": 509,
          "midi": 55,
          "name": "G3",
          "ticks": 194581,
          "time": 129.6350307578125,
          "velocity": 0.6377952755905512
        },
        {
          "duration": 0.339109320312474,
          "durationTicks": 509,
          "midi": 65,
          "name": "F4",
          "ticks": 194581,
          "time": 129.6350307578125,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.339109320312474,
          "durationTicks": 509,
          "midi": 41,
          "name": "F2",
          "ticks": 194581,
          "time": 129.6350307578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 55,
          "name": "G3",
          "ticks": 195091,
          "time": 129.9748063046875,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 65,
          "name": "F4",
          "ticks": 195091,
          "time": 129.9748063046875,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 195091,
          "time": 129.9748063046875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1805473984374828,
          "durationTicks": 271,
          "midi": 55,
          "name": "G3",
          "ticks": 195339,
          "time": 130.1400304921875,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.17055399999998144,
          "durationTicks": 256,
          "midi": 65,
          "name": "F4",
          "ticks": 195339,
          "time": 130.1400304921875,
          "velocity": 0.48031496062992124
        },
        {
          "duration": 0.17055399999998144,
          "durationTicks": 256,
          "midi": 41,
          "name": "F2",
          "ticks": 195339,
          "time": 130.1400304921875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 54,
          "name": "F#3",
          "ticks": 195596,
          "time": 130.31125071875,
          "velocity": 0.5275590551181102
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 65,
          "name": "F4",
          "ticks": 195596,
          "time": 130.31125071875,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.3157913906250087,
          "durationTicks": 474,
          "midi": 41,
          "name": "F2",
          "ticks": 195596,
          "time": 130.31125071875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.35776366406250304,
          "durationTicks": 537,
          "midi": 54,
          "name": "F#3",
          "ticks": 196101,
          "time": 130.6476951328125,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.3371106406249851,
          "durationTicks": 506,
          "midi": 65,
          "name": "F4",
          "ticks": 196101,
          "time": 130.6476951328125,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.15456456250001338,
          "durationTicks": 232,
          "midi": 43,
          "name": "G2",
          "ticks": 196101,
          "time": 130.6476951328125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16189305468751058,
          "durationTicks": 243,
          "midi": 45,
          "name": "A2",
          "ticks": 196349,
          "time": 130.8129193203125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 70,
          "name": "A#4",
          "ticks": 196612,
          "time": 130.98813690625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 46,
          "name": "A#2",
          "ticks": 196612,
          "time": 130.98813690625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 46,
          "name": "A#2",
          "ticks": 197154,
          "time": 131.34923170312499,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312501194,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 197403,
          "time": 131.51512211718747,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.9953424843749872,
          "durationTicks": 1494,
          "midi": 65,
          "name": "F4",
          "ticks": 197662,
          "time": 131.687674796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.22651703124998335,
          "durationTicks": 340,
          "midi": 62,
          "name": "D4",
          "ticks": 197662,
          "time": 131.687674796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 197662,
          "time": 131.687674796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.20519778124997856,
          "durationTicks": 308,
          "midi": 62,
          "name": "D4",
          "ticks": 198003,
          "time": 131.9148580546875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 198167,
          "time": 132.0241192109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21585740624999517,
          "durationTicks": 324,
          "midi": 60,
          "name": "C4",
          "ticks": 198332,
          "time": 132.13404659374999,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 46,
          "name": "A#2",
          "ticks": 198415,
          "time": 132.18934339843747,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.504333507812504,
          "durationTicks": 757,
          "midi": 62,
          "name": "D4",
          "ticks": 198677,
          "time": 132.3638947578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 46,
          "name": "A#2",
          "ticks": 198677,
          "time": 132.3638947578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 70,
          "name": "A#4",
          "ticks": 199187,
          "time": 132.70367030468748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 199187,
          "time": 132.70367030468748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000986,
          "durationTicks": 256,
          "midi": 62,
          "name": "D4",
          "ticks": 199435,
          "time": 132.86889449218748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17055400000000986,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 199435,
          "time": 132.86889449218748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1605606015625085,
          "durationTicks": 241,
          "midi": 70,
          "name": "A#4",
          "ticks": 199692,
          "time": 133.04011471874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 199692,
          "time": 133.04011471874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15456456249998496,
          "durationTicks": 232,
          "midi": 72,
          "name": "C5",
          "ticks": 199949,
          "time": 133.2113349453125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456249998496,
          "durationTicks": 232,
          "midi": 63,
          "name": "D#4",
          "ticks": 199949,
          "time": 133.2113349453125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456250001338,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 200197,
          "time": 133.37655913281247,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456250001338,
          "durationTicks": 232,
          "midi": 65,
          "name": "F4",
          "ticks": 200197,
          "time": 133.37655913281247,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 200197,
          "time": 133.37655913281247,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16189305468751058,
          "durationTicks": 243,
          "midi": 75,
          "name": "D#5",
          "ticks": 200445,
          "time": 133.54178332031248,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16189305468751058,
          "durationTicks": 243,
          "midi": 67,
          "name": "G4",
          "ticks": 200445,
          "time": 133.54178332031248,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.1818798515625133,
          "durationTicks": 273,
          "midi": 46,
          "name": "A#2",
          "ticks": 200445,
          "time": 133.54178332031248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3750916250000103,
          "durationTicks": 2064,
          "midi": 77,
          "name": "F5",
          "ticks": 200708,
          "time": 133.71700090624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.5263189843749956,
          "durationTicks": 790,
          "midi": 68,
          "name": "G#4",
          "ticks": 200708,
          "time": 133.71700090624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 44,
          "name": "G#2",
          "ticks": 200708,
          "time": 133.71700090624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 44,
          "name": "G#2",
          "ticks": 201250,
          "time": 134.07809570312497,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312498352,
          "durationTicks": 258,
          "midi": 70,
          "name": "A#4",
          "ticks": 201499,
          "time": 134.2439861171875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312498352,
          "durationTicks": 258,
          "midi": 44,
          "name": "G#2",
          "ticks": 201499,
          "time": 134.2439861171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16122682812499534,
          "durationTicks": 242,
          "midi": 70,
          "name": "A#4",
          "ticks": 201758,
          "time": 134.416538796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 44,
          "name": "G#2",
          "ticks": 201758,
          "time": 134.416538796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.1538983359374697,
          "durationTicks": 231,
          "midi": 72,
          "name": "C5",
          "ticks": 202016,
          "time": 134.58842525,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.15456456250001338,
          "durationTicks": 232,
          "midi": 74,
          "name": "D5",
          "ticks": 202263,
          "time": 134.7529832109375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 202263,
          "time": 134.7529832109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 75,
          "name": "D#5",
          "ticks": 202511,
          "time": 134.9182073984375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 44,
          "name": "G#2",
          "ticks": 202511,
          "time": 134.9182073984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 77,
          "name": "F5",
          "ticks": 202773,
          "time": 135.09275875781248,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 44,
          "name": "G#2",
          "ticks": 202773,
          "time": 135.09275875781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 77,
          "name": "F5",
          "ticks": 203283,
          "time": 135.4325343046875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 203283,
          "time": 135.4325343046875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999998144,
          "durationTicks": 256,
          "midi": 44,
          "name": "G#2",
          "ticks": 203531,
          "time": 135.5977584921875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21252627343747577,
          "durationTicks": 319,
          "midi": 77,
          "name": "F5",
          "ticks": 203788,
          "time": 135.76897871875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.21252627343747577,
          "durationTicks": 319,
          "midi": 68,
          "name": "G#4",
          "ticks": 203788,
          "time": 135.76897871875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 44,
          "name": "G#2",
          "ticks": 203788,
          "time": 135.76897871875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.20586400781252223,
          "durationTicks": 309,
          "midi": 78,
          "name": "F#5",
          "ticks": 204128,
          "time": 135.99549574999998,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.20586400781252223,
          "durationTicks": 309,
          "midi": 70,
          "name": "A#4",
          "ticks": 204128,
          "time": 135.99549574999998,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 44,
          "name": "G#2",
          "ticks": 204293,
          "time": 136.1054231328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.21385872656250626,
          "durationTicks": 321,
          "midi": 80,
          "name": "G#5",
          "ticks": 204458,
          "time": 136.21535051562498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.21385872656250626,
          "durationTicks": 321,
          "midi": 72,
          "name": "C5",
          "ticks": 204458,
          "time": 136.21535051562498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.18187985156248487,
          "durationTicks": 273,
          "midi": 44,
          "name": "G#2",
          "ticks": 204541,
          "time": 136.2706473203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 2.0513115859374977,
          "durationTicks": 3079,
          "midi": 73,
          "name": "C#5",
          "ticks": 204804,
          "time": 136.44586490625,
          "velocity": 0.5275590551181102
        },
        {
          "duration": 2.0513115859374977,
          "durationTicks": 3079,
          "midi": 82,
          "name": "A#5",
          "ticks": 204804,
          "time": 136.44586490625,
          "velocity": 0.6377952755905512
        },
        {
          "duration": 0.36042857031247877,
          "durationTicks": 541,
          "midi": 42,
          "name": "F#2",
          "ticks": 204804,
          "time": 136.44586490625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 42,
          "name": "F#2",
          "ticks": 205346,
          "time": 136.806959703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312501194,
          "durationTicks": 258,
          "midi": 42,
          "name": "F#2",
          "ticks": 205595,
          "time": 136.97285011718748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 42,
          "name": "F#2",
          "ticks": 205854,
          "time": 137.14540279687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 206359,
          "time": 137.48184721093747,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 42,
          "name": "F#2",
          "ticks": 206607,
          "time": 137.64707139843748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.339109320312474,
          "durationTicks": 509,
          "midi": 42,
          "name": "F#2",
          "ticks": 206869,
          "time": 137.8216227578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 207379,
          "time": 138.16139830468748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000986,
          "durationTicks": 256,
          "midi": 42,
          "name": "F#2",
          "ticks": 207627,
          "time": 138.32662249218748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546875118,
          "durationTicks": 1011,
          "midi": 76,
          "name": "E5",
          "ticks": 207884,
          "time": 138.49784271874998,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.6735550546875118,
          "durationTicks": 1011,
          "midi": 85,
          "name": "C#6",
          "ticks": 207884,
          "time": 138.49784271874998,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 42,
          "name": "F#2",
          "ticks": 207884,
          "time": 138.49784271874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 42,
          "name": "F#2",
          "ticks": 208389,
          "time": 138.83428713281248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1818798515625133,
          "durationTicks": 273,
          "midi": 42,
          "name": "F#2",
          "ticks": 208637,
          "time": 138.99951132031248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 75,
          "name": "D#5",
          "ticks": 208900,
          "time": 139.17472890624998,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 84,
          "name": "C6",
          "ticks": 208900,
          "time": 139.17472890624998,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 41,
          "name": "F2",
          "ticks": 208900,
          "time": 139.17472890624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 41,
          "name": "F2",
          "ticks": 209442,
          "time": 139.53582370312498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312498352,
          "durationTicks": 258,
          "midi": 41,
          "name": "F2",
          "ticks": 209691,
          "time": 139.7017141171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953124881,
          "durationTicks": 2029,
          "midi": 72,
          "name": "C5",
          "ticks": 209950,
          "time": 139.874266796875,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 1.3517736953124881,
          "durationTicks": 2029,
          "midi": 81,
          "name": "A5",
          "ticks": 209950,
          "time": 139.874266796875,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 209950,
          "time": 139.874266796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 210455,
          "time": 140.2107112109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 41,
          "name": "F2",
          "ticks": 210703,
          "time": 140.3759353984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 41,
          "name": "F2",
          "ticks": 210965,
          "time": 140.55048675781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 211475,
          "time": 140.8902623046875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000986,
          "durationTicks": 256,
          "midi": 41,
          "name": "F2",
          "ticks": 211723,
          "time": 141.05548649218747,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546874833,
          "durationTicks": 1011,
          "midi": 69,
          "name": "A4",
          "ticks": 211980,
          "time": 141.22670671875,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.6735550546874833,
          "durationTicks": 1011,
          "midi": 77,
          "name": "F5",
          "ticks": 211980,
          "time": 141.22670671875,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 211980,
          "time": 141.22670671875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 212485,
          "time": 141.5631511328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1818798515625133,
          "durationTicks": 273,
          "midi": 41,
          "name": "F2",
          "ticks": 212733,
          "time": 141.72837532031247,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.23651042968751312,
          "durationTicks": 355,
          "midi": 52,
          "name": "E3",
          "ticks": 212996,
          "time": 141.90359290624997,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 40,
          "name": "E2",
          "ticks": 212996,
          "time": 141.90359290624997,
          "velocity": 0.6220472440944882
        },
        {
          "duration": 0.20719646093749589,
          "durationTicks": 311,
          "midi": 58,
          "name": "A#3",
          "ticks": 213372,
          "time": 142.15409409375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 40,
          "name": "E2",
          "ticks": 213538,
          "time": 142.264687703125,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.21385872656250626,
          "durationTicks": 321,
          "midi": 61,
          "name": "C#4",
          "ticks": 213704,
          "time": 142.3752813125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312501194,
          "durationTicks": 258,
          "midi": 40,
          "name": "E2",
          "ticks": 213787,
          "time": 142.43057811718748,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.21319250000001944,
          "durationTicks": 320,
          "midi": 64,
          "name": "E4",
          "ticks": 214046,
          "time": 142.60313079687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 40,
          "name": "E2",
          "ticks": 214046,
          "time": 142.60313079687498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.20519778125000698,
          "durationTicks": 308,
          "midi": 70,
          "name": "A#4",
          "ticks": 214387,
          "time": 142.83031405468748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 40,
          "name": "E2",
          "ticks": 214551,
          "time": 142.93957521093748,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.21585740624999517,
          "durationTicks": 324,
          "midi": 73,
          "name": "C#5",
          "ticks": 214716,
          "time": 143.04950259375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 40,
          "name": "E2",
          "ticks": 214799,
          "time": 143.10479939843748,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.6755537343750007,
          "durationTicks": 1014,
          "midi": 76,
          "name": "E5",
          "ticks": 215061,
          "time": 143.2793507578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 40,
          "name": "E2",
          "ticks": 215061,
          "time": 143.2793507578125,
          "velocity": 0.6062992125984252
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 40,
          "name": "E2",
          "ticks": 215571,
          "time": 143.61912630468748,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.17055400000000986,
          "durationTicks": 256,
          "midi": 40,
          "name": "E2",
          "ticks": 215819,
          "time": 143.78435049218749,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.6735550546874833,
          "durationTicks": 1011,
          "midi": 82,
          "name": "A#5",
          "ticks": 216076,
          "time": 143.95557071874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 40,
          "name": "E2",
          "ticks": 216076,
          "time": 143.95557071874998,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 40,
          "name": "E2",
          "ticks": 216581,
          "time": 144.29201513281248,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.1818798515625133,
          "durationTicks": 273,
          "midi": 40,
          "name": "E2",
          "ticks": 216829,
          "time": 144.45723932031248,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 77,
          "name": "F5",
          "ticks": 217092,
          "time": 144.63245690624998,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 81,
          "name": "A5",
          "ticks": 217092,
          "time": 144.63245690624998,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 41,
          "name": "F2",
          "ticks": 217092,
          "time": 144.63245690624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 41,
          "name": "F2",
          "ticks": 217634,
          "time": 144.99355170312498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312498352,
          "durationTicks": 258,
          "midi": 41,
          "name": "F2",
          "ticks": 217883,
          "time": 145.1594421171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953124881,
          "durationTicks": 2029,
          "midi": 77,
          "name": "F5",
          "ticks": 218142,
          "time": 145.331994796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.22651703124998335,
          "durationTicks": 340,
          "midi": 65,
          "name": "F4",
          "ticks": 218142,
          "time": 145.331994796875,
          "velocity": 0.5039370078740157
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 218142,
          "time": 145.331994796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.21852231249999932,
          "durationTicks": 328,
          "midi": 65,
          "name": "F4",
          "ticks": 218483,
          "time": 145.5591780546875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 218647,
          "time": 145.6684392109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.22918193750001592,
          "durationTicks": 344,
          "midi": 65,
          "name": "F4",
          "ticks": 218812,
          "time": 145.77836659374998,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17388513281252926,
          "durationTicks": 261,
          "midi": 41,
          "name": "F2",
          "ticks": 218895,
          "time": 145.83366339843747,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3497750156249992,
          "durationTicks": 2026,
          "midi": 65,
          "name": "F4",
          "ticks": 219157,
          "time": 146.00821475781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 41,
          "name": "F2",
          "ticks": 219157,
          "time": 146.00821475781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 219667,
          "time": 146.34799030468747,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055399999998144,
          "durationTicks": 256,
          "midi": 41,
          "name": "F2",
          "ticks": 219915,
          "time": 146.5132144921875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546875118,
          "durationTicks": 1011,
          "midi": 77,
          "name": "F5",
          "ticks": 220172,
          "time": 146.68443471874997,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 220172,
          "time": 146.68443471874997,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 220677,
          "time": 147.02087913281247,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156248487,
          "durationTicks": 273,
          "midi": 41,
          "name": "F2",
          "ticks": 220925,
          "time": 147.1861033203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.2365104296874847,
          "durationTicks": 355,
          "midi": 52,
          "name": "E3",
          "ticks": 221188,
          "time": 147.36132090625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.36042857031247877,
          "durationTicks": 541,
          "midi": 40,
          "name": "E2",
          "ticks": 221188,
          "time": 147.36132090625,
          "velocity": 0.6220472440944882
        },
        {
          "duration": 0.20719646093749589,
          "durationTicks": 311,
          "midi": 58,
          "name": "A#3",
          "ticks": 221564,
          "time": 147.61182209375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418750002998,
          "durationTicks": 248,
          "midi": 40,
          "name": "E2",
          "ticks": 221730,
          "time": 147.72241570312497,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.21385872656247784,
          "durationTicks": 321,
          "midi": 61,
          "name": "C#4",
          "ticks": 221896,
          "time": 147.8330093125,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312501194,
          "durationTicks": 258,
          "midi": 40,
          "name": "E2",
          "ticks": 221979,
          "time": 147.88830611718748,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.21319249999999101,
          "durationTicks": 320,
          "midi": 64,
          "name": "E4",
          "ticks": 222238,
          "time": 148.06085879687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 40,
          "name": "E2",
          "ticks": 222238,
          "time": 148.06085879687498,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.20519778125000698,
          "durationTicks": 308,
          "midi": 70,
          "name": "A#4",
          "ticks": 222579,
          "time": 148.28804205468748,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 40,
          "name": "E2",
          "ticks": 222743,
          "time": 148.39730321093748,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.21585740624999517,
          "durationTicks": 324,
          "midi": 73,
          "name": "C#5",
          "ticks": 222908,
          "time": 148.50723059374997,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 40,
          "name": "E2",
          "ticks": 222991,
          "time": 148.56252739843748,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.6755537343750007,
          "durationTicks": 1014,
          "midi": 76,
          "name": "E5",
          "ticks": 223253,
          "time": 148.73707875781247,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 40,
          "name": "E2",
          "ticks": 223253,
          "time": 148.73707875781247,
          "velocity": 0.6062992125984252
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 40,
          "name": "E2",
          "ticks": 223763,
          "time": 149.0768543046875,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.17055399999998144,
          "durationTicks": 256,
          "midi": 40,
          "name": "E2",
          "ticks": 224011,
          "time": 149.2420784921875,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.6735550546875118,
          "durationTicks": 1011,
          "midi": 82,
          "name": "A#5",
          "ticks": 224268,
          "time": 149.41329871874999,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 40,
          "name": "E2",
          "ticks": 224268,
          "time": 149.41329871874999,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 40,
          "name": "E2",
          "ticks": 224773,
          "time": 149.74974313281248,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.18187985156248487,
          "durationTicks": 273,
          "midi": 40,
          "name": "E2",
          "ticks": 225021,
          "time": 149.91496732031248,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 77,
          "name": "F5",
          "ticks": 225284,
          "time": 150.09018490625,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.6988716640624943,
          "durationTicks": 1049,
          "midi": 81,
          "name": "A5",
          "ticks": 225284,
          "time": 150.09018490625,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.36042857031247877,
          "durationTicks": 541,
          "midi": 41,
          "name": "F2",
          "ticks": 225284,
          "time": 150.09018490625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 41,
          "name": "F2",
          "ticks": 225826,
          "time": 150.45127970312498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312501194,
          "durationTicks": 258,
          "midi": 41,
          "name": "F2",
          "ticks": 226075,
          "time": 150.61717011718747,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953125166,
          "durationTicks": 2029,
          "midi": 77,
          "name": "F5",
          "ticks": 226334,
          "time": 150.78972279687497,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.22651703125001177,
          "durationTicks": 340,
          "midi": 65,
          "name": "F4",
          "ticks": 226334,
          "time": 150.78972279687497,
          "velocity": 0.5039370078740157
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 226334,
          "time": 150.78972279687497,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.21852231249999932,
          "durationTicks": 328,
          "midi": 65,
          "name": "F4",
          "ticks": 226675,
          "time": 151.01690605468747,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 226839,
          "time": 151.12616721093747,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.2291819374999875,
          "durationTicks": 344,
          "midi": 65,
          "name": "F4",
          "ticks": 227004,
          "time": 151.23609459374998,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17388513281247242,
          "durationTicks": 261,
          "midi": 41,
          "name": "F2",
          "ticks": 227087,
          "time": 151.2913913984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3497750156249992,
          "durationTicks": 2026,
          "midi": 65,
          "name": "F4",
          "ticks": 227349,
          "time": 151.46594275781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 41,
          "name": "F2",
          "ticks": 227349,
          "time": 151.46594275781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 227859,
          "time": 151.8057183046875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000986,
          "durationTicks": 256,
          "midi": 41,
          "name": "F2",
          "ticks": 228107,
          "time": 151.97094249218748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546874833,
          "durationTicks": 1011,
          "midi": 74,
          "name": "D5",
          "ticks": 228364,
          "time": 152.14216271875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 228364,
          "time": 152.14216271875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 228869,
          "time": 152.4786071328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1818798515625133,
          "durationTicks": 273,
          "midi": 41,
          "name": "F2",
          "ticks": 229117,
          "time": 152.64383132031247,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 2.051311585937526,
          "durationTicks": 3079,
          "midi": 66,
          "name": "F#4",
          "ticks": 229380,
          "time": 152.81904890624998,
          "velocity": 0.5275590551181102
        },
        {
          "duration": 2.051311585937526,
          "durationTicks": 3079,
          "midi": 75,
          "name": "D#5",
          "ticks": 229380,
          "time": 152.81904890624998,
          "velocity": 0.6377952755905512
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 47,
          "name": "B2",
          "ticks": 229380,
          "time": 152.81904890624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418749997314,
          "durationTicks": 248,
          "midi": 47,
          "name": "B2",
          "ticks": 229922,
          "time": 153.180143703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312498352,
          "durationTicks": 258,
          "midi": 47,
          "name": "B2",
          "ticks": 230171,
          "time": 153.3460341171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 47,
          "name": "B2",
          "ticks": 230430,
          "time": 153.51858679687498,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 47,
          "name": "B2",
          "ticks": 230935,
          "time": 153.85503121093748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 47,
          "name": "B2",
          "ticks": 231183,
          "time": 154.02025539843748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.339109320312474,
          "durationTicks": 509,
          "midi": 47,
          "name": "B2",
          "ticks": 231445,
          "time": 154.1948067578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 47,
          "name": "B2",
          "ticks": 231955,
          "time": 154.5345823046875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000003829,
          "durationTicks": 256,
          "midi": 47,
          "name": "B2",
          "ticks": 232203,
          "time": 154.69980649218746,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546874833,
          "durationTicks": 1011,
          "midi": 71,
          "name": "B4",
          "ticks": 232460,
          "time": 154.87102671875,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.6735550546874833,
          "durationTicks": 1011,
          "midi": 78,
          "name": "F#5",
          "ticks": 232460,
          "time": 154.87102671875,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 47,
          "name": "B2",
          "ticks": 232460,
          "time": 154.87102671875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 47,
          "name": "B2",
          "ticks": 232965,
          "time": 155.2074711328125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1818798515625133,
          "durationTicks": 273,
          "midi": 47,
          "name": "B2",
          "ticks": 233213,
          "time": 155.3726953203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6988716640625228,
          "durationTicks": 1049,
          "midi": 70,
          "name": "A#4",
          "ticks": 233476,
          "time": 155.54791290624996,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.6988716640625228,
          "durationTicks": 1049,
          "midi": 77,
          "name": "F5",
          "ticks": 233476,
          "time": 155.54791290624996,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.3604285703125356,
          "durationTicks": 541,
          "midi": 46,
          "name": "A#2",
          "ticks": 233476,
          "time": 155.54791290624996,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 46,
          "name": "A#2",
          "ticks": 234018,
          "time": 155.90900770312498,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17188645312498352,
          "durationTicks": 258,
          "midi": 46,
          "name": "A#2",
          "ticks": 234267,
          "time": 156.0748981171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953124881,
          "durationTicks": 2029,
          "midi": 65,
          "name": "F4",
          "ticks": 234526,
          "time": 156.247450796875,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 1.3517736953124881,
          "durationTicks": 2029,
          "midi": 73,
          "name": "C#5",
          "ticks": 234526,
          "time": 156.247450796875,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 234526,
          "time": 156.247450796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 235031,
          "time": 156.5838952109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17388513281252926,
          "durationTicks": 261,
          "midi": 46,
          "name": "A#2",
          "ticks": 235279,
          "time": 156.74911939843747,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 46,
          "name": "A#2",
          "ticks": 235541,
          "time": 156.9236707578125,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 236051,
          "time": 157.26344630468748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.17055400000000986,
          "durationTicks": 256,
          "midi": 46,
          "name": "A#2",
          "ticks": 236299,
          "time": 157.42867049218748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546875118,
          "durationTicks": 1011,
          "midi": 61,
          "name": "C#4",
          "ticks": 236556,
          "time": 157.59989071874998,
          "velocity": 0.5354330708661418
        },
        {
          "duration": 0.6735550546875118,
          "durationTicks": 1011,
          "midi": 70,
          "name": "A#4",
          "ticks": 236556,
          "time": 157.59989071874998,
          "velocity": 0.6456692913385826
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 46,
          "name": "A#2",
          "ticks": 236556,
          "time": 157.59989071874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 46,
          "name": "A#2",
          "ticks": 237061,
          "time": 157.93633513281247,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1818798515625133,
          "durationTicks": 273,
          "midi": 46,
          "name": "A#2",
          "ticks": 237309,
          "time": 158.10155932031248,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 72,
          "name": "C5",
          "ticks": 237572,
          "time": 158.27677690624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.6988716640625228,
          "durationTicks": 1049,
          "midi": 64,
          "name": "E4",
          "ticks": 237572,
          "time": 158.27677690624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.3604285703125072,
          "durationTicks": 541,
          "midi": 48,
          "name": "C3",
          "ticks": 237572,
          "time": 158.27677690624998,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.1552307890625002,
          "durationTicks": 233,
          "midi": 72,
          "name": "C5",
          "ticks": 238114,
          "time": 158.63787170312497,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16522418750002998,
          "durationTicks": 248,
          "midi": 48,
          "name": "C3",
          "ticks": 238114,
          "time": 158.63787170312497,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.16189305468748216,
          "durationTicks": 243,
          "midi": 74,
          "name": "D5",
          "ticks": 238363,
          "time": 158.8037621171875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17188645312501194,
          "durationTicks": 258,
          "midi": 48,
          "name": "C3",
          "ticks": 238363,
          "time": 158.8037621171875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 1.3517736953124881,
          "durationTicks": 2029,
          "midi": 76,
          "name": "E5",
          "ticks": 238622,
          "time": 158.976314796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 64,
          "name": "E4",
          "ticks": 238622,
          "time": 158.976314796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 48,
          "name": "C3",
          "ticks": 238622,
          "time": 158.976314796875,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.15456456250001338,
          "durationTicks": 232,
          "midi": 64,
          "name": "E4",
          "ticks": 239127,
          "time": 159.3127592109375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 239127,
          "time": 159.3127592109375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1638917343749995,
          "durationTicks": 246,
          "midi": 65,
          "name": "F4",
          "ticks": 239375,
          "time": 159.4779833984375,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 48,
          "name": "C3",
          "ticks": 239375,
          "time": 159.4779833984375,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 67,
          "name": "G4",
          "ticks": 239637,
          "time": 159.65253475781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 48,
          "name": "C3",
          "ticks": 239637,
          "time": 159.65253475781248,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.15456456250001338,
          "durationTicks": 232,
          "midi": 67,
          "name": "G4",
          "ticks": 240147,
          "time": 159.99231030468746,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 240147,
          "time": 159.99231030468746,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1605606015624801,
          "durationTicks": 241,
          "midi": 69,
          "name": "A4",
          "ticks": 240395,
          "time": 160.1575344921875,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.17055399999998144,
          "durationTicks": 256,
          "midi": 48,
          "name": "C3",
          "ticks": 240395,
          "time": 160.1575344921875,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.6735550546875118,
          "durationTicks": 1011,
          "midi": 79,
          "name": "G5",
          "ticks": 240652,
          "time": 160.32875471874996,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3157913906250087,
          "durationTicks": 474,
          "midi": 70,
          "name": "A#4",
          "ticks": 240652,
          "time": 160.32875471874996,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 48,
          "name": "C3",
          "ticks": 240652,
          "time": 160.32875471874996,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3171238437500392,
          "durationTicks": 476,
          "midi": 72,
          "name": "C5",
          "ticks": 241157,
          "time": 160.66519913281246,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 48,
          "name": "C3",
          "ticks": 241157,
          "time": 160.66519913281246,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156248487,
          "durationTicks": 273,
          "midi": 48,
          "name": "C3",
          "ticks": 241405,
          "time": 160.8304233203125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.34044177343747606,
          "durationTicks": 511,
          "midi": 69,
          "name": "A4",
          "ticks": 241668,
          "time": 161.00564090625,
          "velocity": 0.5669291338582677
        },
        {
          "duration": 0.36042857031247877,
          "durationTicks": 541,
          "midi": 77,
          "name": "F5",
          "ticks": 241668,
          "time": 161.00564090625,
          "velocity": 0.6771653543307087
        },
        {
          "duration": 0.34044177343747606,
          "durationTicks": 511,
          "midi": 53,
          "name": "F3",
          "ticks": 241668,
          "time": 161.00564090625,
          "velocity": 0.6299212598425197
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 57,
          "name": "A3",
          "ticks": 242210,
          "time": 161.366735703125,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 65,
          "name": "F4",
          "ticks": 242210,
          "time": 161.366735703125,
          "velocity": 0.5433070866141733
        },
        {
          "duration": 0.16522418750000156,
          "durationTicks": 248,
          "midi": 41,
          "name": "F2",
          "ticks": 242210,
          "time": 161.366735703125,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18187985156248487,
          "durationTicks": 273,
          "midi": 57,
          "name": "A3",
          "ticks": 242459,
          "time": 161.53262611718748,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.17188645312501194,
          "durationTicks": 258,
          "midi": 65,
          "name": "F4",
          "ticks": 242459,
          "time": 161.53262611718748,
          "velocity": 0.48031496062992124
        },
        {
          "duration": 0.17188645312501194,
          "durationTicks": 258,
          "midi": 41,
          "name": "F2",
          "ticks": 242459,
          "time": 161.53262611718748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 56,
          "name": "G#3",
          "ticks": 242718,
          "time": 161.70517879687497,
          "velocity": 0.6220472440944882
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 65,
          "name": "F4",
          "ticks": 242718,
          "time": 161.70517879687497,
          "velocity": 0.5826771653543307
        },
        {
          "duration": 0.3357781875000114,
          "durationTicks": 504,
          "midi": 41,
          "name": "F2",
          "ticks": 242718,
          "time": 161.70517879687497,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 56,
          "name": "G#3",
          "ticks": 243223,
          "time": 162.04162321093747,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 65,
          "name": "F4",
          "ticks": 243223,
          "time": 162.04162321093747,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.16455796093748631,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 243223,
          "time": 162.04162321093747,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.1838785312500022,
          "durationTicks": 276,
          "midi": 56,
          "name": "G#3",
          "ticks": 243471,
          "time": 162.20684739843747,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 65,
          "name": "F4",
          "ticks": 243471,
          "time": 162.20684739843747,
          "velocity": 0.48031496062992124
        },
        {
          "duration": 0.17388513281250084,
          "durationTicks": 261,
          "midi": 41,
          "name": "F2",
          "ticks": 243471,
          "time": 162.20684739843747,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 55,
          "name": "G3",
          "ticks": 243733,
          "time": 162.38139875781246,
          "velocity": 0.6377952755905512
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 65,
          "name": "F4",
          "ticks": 243733,
          "time": 162.38139875781246,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.3391093203125024,
          "durationTicks": 509,
          "midi": 41,
          "name": "F2",
          "ticks": 243733,
          "time": 162.38139875781246,
          "velocity": 0.6141732283464567
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 55,
          "name": "G3",
          "ticks": 244243,
          "time": 162.72117430468748,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 65,
          "name": "F4",
          "ticks": 244243,
          "time": 162.72117430468748,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.16455796093751474,
          "durationTicks": 247,
          "midi": 41,
          "name": "F2",
          "ticks": 244243,
          "time": 162.72117430468748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.18054739843751122,
          "durationTicks": 271,
          "midi": 55,
          "name": "G3",
          "ticks": 244491,
          "time": 162.88639849218748,
          "velocity": 0.5196850393700787
        },
        {
          "duration": 0.17055399999998144,
          "durationTicks": 256,
          "midi": 65,
          "name": "F4",
          "ticks": 244491,
          "time": 162.88639849218748,
          "velocity": 0.48031496062992124
        },
        {
          "duration": 0.17055399999998144,
          "durationTicks": 256,
          "midi": 41,
          "name": "F2",
          "ticks": 244491,
          "time": 162.88639849218748,
          "velocity": 0.49606299212598426
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 54,
          "name": "F#3",
          "ticks": 244748,
          "time": 163.05761871874998,
          "velocity": 0.5275590551181102
        },
        {
          "duration": 0.335778187499983,
          "durationTicks": 504,
          "midi": 65,
          "name": "F4",
          "ticks": 244748,
          "time": 163.05761871874998,
          "velocity": 0.4881889763779528
        },
        {
          "duration": 0.3157913906250087,
          "durationTicks": 474,
          "midi": 41,
          "name": "F2",
          "ticks": 244748,
          "time": 163.05761871874998,
          "velocity": 0.5984251968503937
        },
        {
          "duration": 0.35776366406250304,
          "durationTicks": 537,
          "midi": 54,
          "name": "F#3",
          "ticks": 245253,
          "time": 163.39406313281248,
          "velocity": 0.4330708661417323
        },
        {
          "duration": 0.35776366406250304,
          "durationTicks": 537,
          "midi": 65,
          "name": "F4",
          "ticks": 245253,
          "time": 163.39406313281248,
          "velocity": 0.5118110236220472
        },
        {
          "duration": 0.15456456249998496,
          "durationTicks": 232,
          "midi": 43,
          "name": "G2",
          "ticks": 245253,
          "time": 163.39406313281248,
          "velocity": 0.5905511811023622
        },
        {
          "duration": 0.16189305468748216,
          "durationTicks": 243,
          "midi": 45,
          "name": "A2",
          "ticks": 245501,
          "time": 163.55928732031248,
          "velocity": 0.5905511811023622
        }
      ],
      "endOfTrackTicks": 245790
    }
  ]
}