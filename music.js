let song;
let fft;
let numRects = 256;

function preload() {
    song = loadSound("start.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    ellipseMode(CORNER);
    fft = new p5.FFT(0.9, numRects);
    song.play();
}

function draw() {
    background(0);

    let spectrum = fft.analyze();
    let rectWidth = 1;

    //fill(150, 50, 200);
    noFill();
    stroke(255)
    //noStroke();
    beginShape();
    for (let i = 0; i < numRects; i++) {
        let amplitude = spectrum[i];
        let rectHeight = map(amplitude, 0, 255, 0, height / 2);
        vertex(width / 2 + cos(i) * rectHeight, height / 2 + sin(i) * rectHeight);
    }
    endShape();

    for (let i = 0; i < numRects; i++) {
        push();
        let amplitude = spectrum[i];
        let rectHeight = 0 + map(amplitude, 0, 255, 0, height / 2);
        translate(width / 2, height / 2);
        rotate(i);
        fill(150, 50, 200);
        noStroke();
        ellipse(0, 0, rectWidth, rectHeight);
        pop();
    }

    rectWidth = width / numRects;
    for (let i = 0; i < numRects; i++) {
        push();
        let amplitude = spectrum[i];
        let rectHeight = 100 + map(amplitude, 0, 255, 0, height / 4);
        translate(i * rectWidth, height - rectHeight);
        fill(200, 50, 150);
        stroke("#000000");
        ellipse(0, 0, rectWidth, rectHeight);
        pop();
    }
}

function mousePressed() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}