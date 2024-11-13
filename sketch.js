let song;
let fft;
let smoothedRMS = 0;
let smoothedAvgFrequency = 0;

function preload() {
  song = loadSound("walz.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  fft = new p5.FFT();
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);

  song.play();
}

function draw() {
  background(0);

  stroke(255);
  noFill();

  let spectrum = fft.analyze();
  let rms = analyzer.getLevel();
  let sum = 0;
  for (let i = 0; i < spectrum.length; i++) {
    sum += spectrum[i];
  }
  let averageFrequency = sum / spectrum.length * 2;
  smoothedAvgFrequency = lerp(smoothedAvgFrequency, averageFrequency, 0.5)
  smoothedAvgFrequency = Math.round(averageFrequency / 5) + 1;
  smoothedRMS = lerp(smoothedRMS, rms, 0.5);

  stroke(255);
  noFill();
  push();
  translate(width / 2, height / 2);
  beginShape();

  for (let i = 0; i < 360; i += 4) {
    angle = i;
    radius = map(-smoothedRMS, 0, 1, 0, 800);
    x = (radius) * cos(angle);
    y = (radius) * sin(angle);
    vertex(x, y);

    angle = i;
    radius = -300;
    x = radius * cos(angle);
    y = radius * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
